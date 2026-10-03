import express from 'express';
import Worker from '../models/Worker.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

// 1. Add worker to roster
router.post('/worker/add', ensureAuth, async (req, res) => {
  try {
    const { site, fullName, nationalId, phone, trade, dailyRate } = req.body;

    const existingWorker = await Worker.findOne({ site, nationalId });
    if (existingWorker) {
      return res.status(400).json({ error: 'Worker with this ID is already registered on this site.' });
    }

    const newWorker = new Worker({
      site,
      fullName,
      nationalId,
      phone,
      trade,
      dailyRate: Number(dailyRate),
    });

    await newWorker.save();
    res.status(201).json({ message: 'Worker registered successfully', worker: newWorker });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add worker', details: error.message });
  }
});

// 2. Fetch site worker roster
router.get('/workers/site/:siteId', ensureAuth, async (req, res) => {
  try {
    const workers = await Worker.find({ site: req.params.siteId, status: 'Active' }).sort({ fullName: 1 });
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workers', details: error.message });
  }
});

// 3. Clock In / Record Daily Presence
router.post('/attendance/clock-in', ensureAuth, async (req, res) => {
  try {
    const { site, workerId, date, status, notes } = req.body;

    const existingLog = await Attendance.findOne({ site, worker: workerId, date });
    if (existingLog) {
      return res.status(400).json({ error: 'Attendance already recorded for this worker today.' });
    }

    const worker = await Worker.findById(workerId);
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    let earned = Number(worker.dailyRate);
    if (status === 'Half Day') earned = earned / 2;
    if (status === 'Absent') earned = 0;

    const attendanceLog = new Attendance({
      site,
      worker: workerId,
      date,
      status: status || 'Present',
      earnedAmount: earned,
      loggedBy: req.user._id,
      notes: notes || '',
    });

    await attendanceLog.save();
    res.status(201).json({ message: 'Attendance recorded successfully', attendance: attendanceLog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record attendance', details: error.message });
  }
});

// 4. Record Wage Payment & Validate Mandatory Reasons
router.patch('/attendance/pay/:attendanceId', ensureAuth, async (req, res) => {
  try {
    const { paidAmount, paymentMethod, mpesaTransactionId, partialPaymentReason } = req.body;

    const log = await Attendance.findById(req.params.attendanceId);
    if (!log) return res.status(404).json({ error: 'Attendance record not found' });

    const amountPaid = Number(paidAmount);

    // Mandatory reason check
    if (amountPaid < log.earnedAmount && (!partialPaymentReason || partialPaymentReason.trim() === '')) {
      return res.status(400).json({
        error: 'A mandatory explanation is required when a worker is not paid in full.',
      });
    }

    let status = 'Unpaid';
    if (amountPaid >= log.earnedAmount) {
      status = 'Paid in Full';
    } else if (amountPaid > 0) {
      status = 'Partial Payment';
    }

    log.paidAmount = amountPaid;
    log.paymentStatus = status;
    log.paymentMethod = paymentMethod || 'Cash';
    log.mpesaTransactionId = mpesaTransactionId || '';
    log.partialPaymentReason = amountPaid < log.earnedAmount ? partialPaymentReason : '';
    log.paidBy = req.user._id;

    await log.save();
    res.status(200).json({ message: 'Payment recorded successfully', log });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record payment', details: error.message });
  }
});

// 5. Daily Attendance & Payroll Audit Summary
router.get('/attendance/site/:siteId/date/:dateStr', ensureAuth, async (req, res) => {
  try {
    const logs = await Attendance.find({
      site: req.params.siteId,
      date: req.params.dateStr,
    })
      .populate('worker', 'fullName trade dailyRate nationalId phone')
      .populate('loggedBy', 'name email')
      .populate('paidBy', 'name email');

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance summary', details: error.message });
  }
});

export default router;