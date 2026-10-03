import express from 'express';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// 1. Daraja API OAuth Token Middleware
const getMpesaToken = async (req, res, next) => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return res.status(500).json({ error: 'M-Pesa credentials not configured in environment variables.' });
    }

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    // Sandbox / Production URL check
    const url = process.env.MPESA_ENV === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    const response = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
    });

    const data = await response.json();
    req.mpesaToken = data.access_token;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with M-Pesa Daraja API', details: error.message });
  }
};

// 2. Initiate B2C Wage Disbursement
router.post('/disburse-wage', getMpesaToken, async (req, res) => {
  try {
    const { attendanceId, phoneNumber, amount } = req.body;

    const attendanceLog = await Attendance.findById(attendanceId);
    if (!attendanceLog) return res.status(404).json({ error: 'Attendance record not found.' });

    // Format phone number to 254XXXXXXXXX
    let formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    }

    const b2cUrl = process.env.MPESA_ENV === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/b2c/v1/paymentrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest';

    const payload = {
      InitiatorName: process.env.MPESA_B2C_INITIATOR,
      SecurityCredential: process.env.MPESA_B2C_SECURITY_CREDENTIAL,
      CommandID: 'BusinessPayment', // SalaryPayment or BusinessPayment
      Amount: amount,
      PartyA: process.env.MPESA_SHORTCODE,
      PartyB: formattedPhone,
      Remarks: 'Casual Worker Wage Payment',
      QueueTimeOutURL: `${process.env.SERVER_URL}/api/mpesa/b2c-timeout`,
      ResultURL: `${process.env.SERVER_URL}/api/mpesa/b2c-callback`,
      Occasion: 'Wage Payment',
    };

    const response = await fetch(b2cUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${req.mpesaToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.ResponseCode === '0') {
      res.status(200).json({
        message: 'M-Pesa payment initiated successfully',
        conversationId: data.ConversationID,
        originatorConversationId: data.OriginatorConversationID,
      });
    } else {
      res.status(400).json({ error: 'M-Pesa disbursement request failed', details: data });
    }
  } catch (error) {
    res.status(500).json({ error: 'M-Pesa payout execution error', details: error.message });
  }
});

// 3. Webhook Callback from Safaricom (Updates Payment Status Automatically)
router.post('/b2c-callback', async (req, res) => {
  try {
    const { Result } = req.body.Result ? req.body : { Result: req.body };

    if (!Result) return res.status(400).send('Invalid webhook body');

    const resultCode = Result.ResultCode;
    const conversationId = Result.ConversationID;

    if (resultCode === 0) {
      // Payment Successful - Extract Transaction Parameters
      const params = Result.ResultParameters.ResultParameter;
      let mpesaTxnId = '';
      let amountPaid = 0;

      params.forEach((item) => {
        if (item.Key === 'TransactionReceipt') mpesaTxnId = item.Value;
        if (item.Key === 'TransactionAmount') amountPaid = Number(item.Value);
      });

      // Find pending attendance record and update
      const attendance = await Attendance.findOne({ paymentStatus: 'Unpaid', earnedAmount: { $gte: amountPaid } });

      if (attendance) {
        attendance.paidAmount = amountPaid;
        attendance.paymentStatus = amountPaid >= attendance.earnedAmount ? 'Paid in Full' : 'Partial Payment';
        attendance.paymentMethod = 'M-Pesa';
        attendance.mpesaTransactionId = mpesaTxnId;
        await attendance.save();
      }
    }

    res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing error', details: error.message });
  }
});

// 4. Timeout Callback Route
router.post('/b2c-timeout', (req, res) => {
  console.error('M-Pesa B2C Transaction Timed Out:', req.body);
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

export default router;