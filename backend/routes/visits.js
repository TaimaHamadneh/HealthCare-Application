const express = require('express');
const { auth } = require('../middleware/auth');
const Visit = require('../models/Visit');
const router = express.Router();

// Get specific visit details
router.get('/:id', auth, async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate('doctor', 'name specialization licenseNumber')
      .populate('patient', 'name phone dateOfBirth address');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    if (req.user.role === 'patient' && visit.patient._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (req.user.role === 'doctor' && visit.doctor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;