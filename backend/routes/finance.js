const express = require('express');
const mongoose = require('mongoose');
const { auth, requireRole } = require('../middleware/auth');
const Visit = require('../models/Visit');
const User = require('../models/User');
const router = express.Router();

// Search visits with multi filters
router.get('/visits', auth, requireRole(['finance']), async (req, res) => {
  try {
    const { doctorName, patientName, visitId, status } = req.query;

    let filter = {};

    // Filter#1
    if (doctorName) {
      const doctors = await User.find({
        role: "doctor",
        name: { $regex: doctorName, $options: "i" }
      }).select("_id");

      filter.doctor = { $in: doctors.map(d => d._id) };
    }

    // Filter#2
    if (patientName) {
      const patients = await User.find({
        role: "patient",
        name: { $regex: patientName, $options: "i" }
      }).select("_id");

      filter.patient = { $in: patients.map(p => p._id) };
    }

    // Filter#3
    if (visitId) {
      filter.visitId = { $regex: visitId, $options: 'i' };
    }

    // Filter#4
    if (status) {
      filter.status = status;
    }

    const visits = await Visit.find(filter)
      .populate("doctor", "name specialization")
      .populate("patient", "name phone")
      .sort({ createdAt: -1 });

    res.json(visits);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Mark visit => paid
router.put('/visits/:id/pay', auth, requireRole(['finance']), async (req, res) => {
  try {
    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      { isPaid: true },
      { new: true }
    )
    .populate('doctor', 'name specialization')
    .populate('patient', 'name phone');

    if (!visit) {
      return res.status(404).json({ message: 'Visit not found' });
    }

    res.json(visit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;