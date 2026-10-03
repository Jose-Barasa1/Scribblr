import express from 'express';
import Equipment from '../models/Equipment.js';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

router.post('/add', ensureAuth, async (req, res) => {
  try {
    const { site, name, category, identifierCode, color, condition, quantityTotal, minStockAlertThreshold, storageLocation, notes } = req.body;

    const existingItem = await Equipment.findOne({ identifierCode });
    if (existingItem) {
      return res.status(400).json({ error: 'An item with this Barcode/ID already exists.' });
    }

    const newItem = new Equipment({
      site,
      name,
      category,
      identifierCode,
      color,
      condition,
      quantityTotal,
      quantityAvailable: quantityTotal,
      minStockAlertThreshold,
      storageLocation,
      notes,
    });

    await newItem.save();
    res.status(201).json({ message: 'Equipment registered successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add equipment', details: error.message });
  }
});

router.get('/site/:siteId', ensureAuth, async (req, res) => {
  try {
    const { category, color, condition } = req.query;
    let query = { site: req.params.siteId };

    if (category) query.category = category;
    if (color) query.color = new RegExp(color, 'i');
    if (condition) query.condition = condition;

    const items = await Equipment.find(query).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch site inventory' });
  }
});

router.get('/scan/:identifierCode', ensureAuth, async (req, res) => {
  try {
    const item = await Equipment.findOne({ identifierCode: req.params.identifierCode }).populate('site', 'name companyName');
    if (!item) {
      return res.status(404).json({ error: 'No equipment found with this barcode or code.' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Scan lookup failed' });
  }
});

router.patch('/update-condition/:id', ensureAuth, async (req, res) => {
  try {
    const { condition, notes } = req.body;
    let updateFields = { condition };

    if (notes) updateFields.notes = notes;

    if (condition === 'Needs Repair') {
      updateFields.requisitionStatus = 'Requested';
    }

    const updatedItem = await Equipment.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.status(200).json({ message: 'Item status updated', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment condition' });
  }
});

export default router;