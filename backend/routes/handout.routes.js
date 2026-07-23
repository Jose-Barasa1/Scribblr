import express from 'express';
import HandoutLog from '../models/HandoutLog.js';
import Equipment from '../models/Equipment.js';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

// 1. Issue / Check Out Equipment
router.post('/checkout', ensureAuth, async (req, res) => {
  try {
    const { site, equipmentId, workerName, workerNationalId, quantityIssued, expectedReturnDate, notes } = req.body;

    const item = await Equipment.findById(equipmentId);
    if (!item) {
      return res.status(404).json({ error: 'Equipment not found' });
    }

    if (item.quantityAvailable < quantityIssued) {
      return res.status(400).json({ error: `Not enough stock available. Available: ${item.quantityAvailable}` });
    }

    // Create checkout log
    const log = new HandoutLog({
      site,
      equipment: equipmentId,
      workerName,
      workerNationalId,
      quantityIssued,
      issuedBy: req.user._id,
      conditionOut: item.condition,
      expectedReturnDate,
      notes,
    });

    // Deduct available stock
    item.quantityAvailable -= quantityIssued;

    await log.save();
    await item.save();

    res.status(201).json({ message: 'Equipment checked out successfully', log, remainingAvailable: item.quantityAvailable });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process check-out', details: error.message });
  }
});

// 2. Return Equipment
router.patch('/return/:logId', ensureAuth, async (req, res) => {
  try {
    const { conditionIn, notes } = req.body;

    const log = await HandoutLog.findById(req.params.logId);
    if (!log || log.status === 'Returned') {
      return res.status(400).json({ error: 'Invalid log or item already returned' });
    }

    const item = await Equipment.findById(log.equipment);

    log.returnedAt = new Date();
    log.conditionIn = conditionIn || log.conditionOut;
    log.status = 'Returned';
    if (notes) log.notes = notes;

    // Return stock to pool
    if (item) {
      item.quantityAvailable += log.quantityIssued;

      // Update condition on main inventory if damaged
      if (conditionIn === 'Needs Repair') {
        item.condition = 'Needs Repair';
        item.requisitionStatus = 'Requested';
      }
      await item.save();
    }

    await log.save();

    res.status(200).json({ message: 'Equipment returned successfully', log });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process return', details: error.message });
  }
});

// 3. Get Active Handouts for a Site
router.get('/site/:siteId/active', ensureAuth, async (req, res) => {
  try {
    const activeLogs = await HandoutLog.find({
      site: req.params.siteId,
      status: 'Checked Out',
    }).populate('equipment', 'name identifierCode color category');

    res.status(200).json(activeLogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch active handouts' });
  }
});

export default router;