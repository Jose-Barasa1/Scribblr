import express from 'express';
import Material from '../models/Material.js';
import MaterialLog from '../models/MaterialLog.js';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

// 1. Create a new material type for a site
router.post('/add-item', ensureAuth, async (req, res) => {
  try {
    const { site, itemName, unit, minimumThreshold } = req.body;

    const existingMaterial = await Material.findOne({ site, itemName });
    if (existingMaterial) {
      return res.status(400).json({ error: 'This material item already exists for this site.' });
    }

    const newMaterial = new Material({
      site,
      itemName,
      unit,
      minimumThreshold: Number(minimumThreshold) || 10,
    });

    await newMaterial.save();
    res.status(201).json({ message: 'Material added to site stock list', material: newMaterial });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create material item', details: error.message });
  }
});

// 2. Fetch current inventory levels for a site
router.get('/stock/site/:siteId', ensureAuth, async (req, res) => {
  try {
    const materials = await Material.find({ site: req.params.siteId }).sort({ itemName: 1 });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory stock', details: error.message });
  }
});

// 3. Log Material Entry (Delivery In or Usage Out) & Update Stock Automatically
router.post('/log-transaction', ensureAuth, async (req, res) => {
  try {
    const { site, materialId, type, quantity, supplier, deliveryNoteNumber, unitCost, purposeOrLocation, date } = req.body;

    const material = await Material.findById(materialId);
    if (!material) return res.status(404).json({ error: 'Material item not found' });

    const qty = Number(quantity);

    // If usage out, check if there is enough stock
    if (type === 'Usage Out' && material.currentStock < qty) {
      return res.status(400).json({
        error: `Insufficient stock! Current available stock: ${material.currentStock} ${material.unit}`,
      });
    }

    // Save transaction log
    const log = new MaterialLog({
      site,
      material: materialId,
      type,
      quantity: qty,
      supplier: supplier || '',
      deliveryNoteNumber: deliveryNoteNumber || '',
      unitCost: Number(unitCost) || 0,
      purposeOrLocation: purposeOrLocation || '',
      loggedBy: req.user._id,
      date,
    });

    await log.save();

    // Dynamically adjust material stock balance
    if (type === 'Delivery In') {
      material.currentStock += qty;
    } else if (type === 'Usage Out') {
      material.currentStock -= qty;
    }

    await material.save();

    res.status(201).json({ message: 'Material transaction recorded successfully', log, updatedStock: material });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record material transaction', details: error.message });
  }
});

export default router;