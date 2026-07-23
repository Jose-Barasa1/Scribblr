import express from 'express';
import VaultItem from '../models/VaultItem.js';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized access' });
};

// 1. Add / Upload an item to the Vault
router.post('/add', ensureAuth, async (req, res) => {
  try {
    const { site, title, category, fileUrl, fileType, isRestricted, notes } = req.body;

    const newItem = new VaultItem({
      site,
      title,
      category,
      fileUrl,
      fileType,
      uploadedBy: req.user._id,
      isRestricted: isRestricted || false,
      allowedUsers: [req.user._id],
      notes,
    });

    await newItem.save();
    res.status(201).json({ message: 'Vault item added successfully', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add vault item', details: error.message });
  }
});

// 2. Fetch Vault Items for a Site
router.get('/site/:siteId', ensureAuth, async (req, res) => {
  try {
    const items = await VaultItem.find({
      site: req.params.siteId,
      $or: [
        { isRestricted: false },
        { uploadedBy: req.user._id },
        { allowedUsers: req.user._id },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vault items' });
  }
});

// 3. Request View Access for Restricted Item
router.post('/request-access/:id', ensureAuth, async (req, res) => {
  try {
    const item = await VaultItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const existingRequest = item.accessRequests.find(
      (r) => r.user.toString() === req.user._id.toString() && r.status === 'Pending'
    );

    if (existingRequest) {
      return res.status(400).json({ error: 'Access request already pending' });
    }

    item.accessRequests.push({ user: req.user._id });
    await item.save();

    res.status(200).json({ message: 'Access request sent to Contractor/Manager' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to request access' });
  }
});

// 4. Approve or Deny Access Request
router.patch('/handle-access-request/:id', ensureAuth, async (req, res) => {
  try {
    const { targetUserId, action } = req.body;

    const item = await VaultItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const request = item.accessRequests.find(
      (r) => r.user.toString() === targetUserId && r.status === 'Pending'
    );

    if (!request) return res.status(404).json({ error: 'Pending request not found' });

    request.status = action;

    if (action === 'Approved') {
      if (!item.allowedUsers.includes(targetUserId)) {
        item.allowedUsers.push(targetUserId);
      }
    }

    await item.save();
    res.status(200).json({ message: `Access request ${action.toLowerCase()}`, item });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update access request' });
  }
});

export default router;