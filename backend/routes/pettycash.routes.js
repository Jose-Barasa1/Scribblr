import express from 'express';
import PettyCash from '../models/PettyCash.js';
import upload from '../middleware/upload.js';
import mongoose from 'mongoose';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

// 1. Log Float Top-Up or Expense (Handles optional receipt file upload)
router.post('/log-transaction', ensureAuth, upload.single('receipt'), async (req, res) => {
  try {
    const { site, transactionType, category, amount, description, mpesaRef, date } = req.body;

    // Use Cloudinary file URL if uploaded, fallback to body string or empty
    const receiptUrl = req.file ? req.file.path : (req.body.receiptUrl || '');

    const transaction = new PettyCash({
      site,
      transactionType,
      category,
      amount: Number(amount),
      description,
      receiptUrl,
      mpesaRef: mpesaRef || '',
      issuedBy: req.user._id,
      date,
    });

    await transaction.save();
    res.status(201).json({ message: 'Petty cash transaction recorded successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record petty cash transaction', details: error.message });
  }
});

// 2. Fetch All Transactions for a Site with Live Float Balance
router.get('/site/:siteId', ensureAuth, async (req, res) => {
  try {
    const siteObjectId = new mongoose.Types.ObjectId(req.params.siteId);

    const history = await PettyCash.find({ site: siteObjectId })
      .sort({ createdAt: -1 })
      .populate('issuedBy', 'name email');

    // Aggregate Total Float Received vs Total Expenses Spent
    const summary = await PettyCash.aggregate([
      { $match: { site: siteObjectId } },
      {
        $group: {
          _id: '$transactionType',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    let totalFloat = 0;
    let totalExpenses = 0;

    summary.forEach((item) => {
      if (item._id === 'Float Top-Up') totalFloat = item.totalAmount;
      if (item._id === 'Expense Out') totalExpenses = item.totalAmount;
    });

    const currentBalance = totalFloat - totalExpenses;

    res.status(200).json({
      currentBalance,
      totalFloatReceived: totalFloat,
      totalExpensesPaid: totalExpenses,
      transactions: history,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch petty cash records', details: error.message });
  }
});

export default router;