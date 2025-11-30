const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const Visit = require('../models/Visit');
const router = express.Router();

// Get doctor's visits
router.get('/visits', auth, requireRole(['doctor']), async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { doctor: req.user._id };
    
    if (status) {
      filter.status = status;
    }

    const visits = await Visit.find(filter)
      .populate('patient', 'name phone dateOfBirth')
      .sort({ visitDate: 1 });
    
    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start visit
router.put('/visits/:id/start', auth, requireRole(['doctor']), async (req, res) => {
  try {

    const activeVisit = await Visit.findOne({
      doctor: req.user._id,
      status: 'in-progress'
    });

    if (activeVisit) {
      return res.status(400).json({ message: 'You already have an active visit' });
    }

    const visit = await Visit.findOneAndUpdate(
      { 
        _id: req.params.id, 
        doctor: req.user._id,
        status: 'scheduled'
      },
      { status: 'in-progress' },
      { new: true }
    ).populate('patient', 'name phone dateOfBirth');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found or cannot be started' });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add treatments and medical info
router.put('/visits/:id/treatments', auth, requireRole(['doctor']), async (req, res) => {
  try {
    const { treatments, diagnosis, notes } = req.body;

    const totalAmount = Array.isArray(treatments)
      ? treatments.reduce((sum, t) => sum + Number(t.value || 0), 0)
      : 0;

    const visit = await Visit.findOneAndUpdate(
      {
        _id: req.params.id,
        doctor: req.user._id,
        status: 'in-progress'   
      },
      {
        $set: {
          treatments,
          diagnosis,
          notes,
          totalAmount
        }
      },
      { new: true }
    ).populate('patient', 'name phone dateOfBirth');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found or cannot be updated' });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Complete visit
router.put('/visits/:id/complete', auth, requireRole(['doctor']), async (req, res) => {
  try {
    const visit = await Visit.findOneAndUpdate(
      {
        _id: req.params.id,
        doctor: req.user._id,
        status: 'in-progress'
      },
      { status: 'completed' },
      { new: true }
    ).populate('patient', 'name phone dateOfBirth');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found or cannot be completed' });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;