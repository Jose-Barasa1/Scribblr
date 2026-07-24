import express from 'express';
import DailyLog from '../models/DailyLog.js';
import Attendance from '../models/Attendance.js';
import HandoutLog from '../models/HandoutLog.js';
import mongoose from 'mongoose';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

// 1. Create or Update Daily Log
router.post('/daily/save', ensureAuth, async (req, res) => {
  try {
    const { site, date, weatherCondition, workDelayHours, delayReason, achievements, toolboxTalkTopic, incidentsOrSafetyIssues } = req.body;

    const log = await DailyLog.findOneAndUpdate(
      { site, date },
      {
        site,
        date,
        weatherCondition,
        workDelayHours: Number(workDelayHours) || 0,
        delayReason: delayReason || '',
        achievements,
        toolboxTalkTopic: toolboxTalkTopic || 'General Site Safety & PPE Protocol',
        incidentsOrSafetyIssues: incidentsOrSafetyIssues || 'None reported',
        loggedBy: req.user._id,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: 'Daily log saved successfully', log });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save daily log', details: error.message });
  }
});

// 2. Generate Automated Weekly Site Report (Aggregates Progress, Payments, Delays & Safety)
router.get('/weekly/site/:siteId', ensureAuth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // Expects YYYY-MM-DD format

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Please provide both startDate and endDate parameters (YYYY-MM-DD).' });
    }

    const siteObjectId = new mongoose.Types.ObjectId(req.params.siteId);

    // A. Fetch all daily logs for the week
    const dailyLogs = await DailyLog.find({
      site: siteObjectId,
      date: { $gte: startDate, $lte: endDate },
    }).populate('loggedBy', 'name email');

    // B. Aggregate Attendance & Payments for the week
    const payrollAggregation = await Attendance.aggregate([
      {
        $match: {
          site: siteObjectId,
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnedWages: { $sum: '$earnedAmount' },
          totalPaidWages: { $sum: '$paidAmount' },
          totalWorkerDaysLogged: { $sum: 1 },
        },
      },
    ]);

    // C. Fetch Equipment Handout Activity for the week
    const handoutLogs = await HandoutLog.find({
      site: siteObjectId,
      issuedAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate + 'T23:59:59.999Z'),
      },
    }).populate('equipment', 'name category');

    // D. Compile summary calculations
    const totalDelayHours = dailyLogs.reduce((acc, curr) => acc + (curr.workDelayHours || 0), 0);
    const payrollSummary = payrollAggregation[0] || { totalEarnedWages: 0, totalPaidWages: 0, totalWorkerDaysLogged: 0 };

    res.status(200).json({
      reportPeriod: { startDate, endDate },
      dailyProgressLogs: dailyLogs,
      summary: {
        totalDelayHours,
        totalWorkerDaysLogged: payrollSummary.totalWorkerDaysLogged,
        totalEarnedWages: payrollSummary.totalEarnedWages,
        totalPaidWages: payrollSummary.totalPaidWages,
        outstandingWageBalance: payrollSummary.totalEarnedWages - payrollSummary.totalPaidWages,
      },
      equipmentActivityCount: handoutLogs.length,
      equipmentLogs: handoutLogs,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate weekly site report', details: error.message });
  }
});

export default router;