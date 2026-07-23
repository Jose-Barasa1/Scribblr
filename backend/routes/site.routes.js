import express from 'express';
import Site from '../models/Site.js';

const router = express.Router();

const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized access' });
};

router.post('/create', ensureAuth, async (req, res) => {
  try {
    const { name, location, companyName, sitePin } = req.body;

    const newSite = new Site({
      name,
      location,
      companyName,
      sitePin,
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'Admin' }],
    });

    await newSite.save();
    res.status(201).json({ message: 'Site created successfully', site: newSite });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create site' });
  }
});

router.get('/my-sites', ensureAuth, async (req, res) => {
  try {
    const sites = await Site.find({
      $or: [{ owner: req.user._id }, { 'members.user': req.user._id }],
    });
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

export default router;