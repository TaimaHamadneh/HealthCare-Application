const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const Visit = require('../models/Visit');
const User = require('../models/User');
const router = express.Router();

// local date
const getDayRange = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const start = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  const end   = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

  return { start, end };
};

//  Get doctors
router.get('/doctors', auth, requireRole(['patient']), async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }).select('name specialization');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Book avisit
router.post('/visits', auth, requireRole(['patient']), async (req, res) => {
  try {
    const { doctorId, visitDate, symptoms } = req.body;

    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const existingVisit = await Visit.findOne({
      doctor: doctorId,
      visitDate: new Date(visitDate),
      status: { $in: ['scheduled', 'in-progress'] }
    });

    if (existingVisit) {
      return res.status(400).json({ message: 'Doctor is not available at this time' });
    }

    const visit = new Visit({
      patient: req.user._id,
      doctor: doctorId,
      visitDate: new Date(visitDate),
      symptoms
    });

    await visit.save();
    await visit.populate('doctor', 'name specialization');

    res.status(201).json(visit);

  } catch (error) {
    console.error("REAL ERROR:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get patient visits
router.get('/visits', auth, requireRole(['patient']), async (req, res) => {
  try {
    const visits = await Visit.find({ patient: req.user._id })
      .populate('doctor', 'name specialization')
      .sort({ visitDate: -1 });

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Available time slots
router.get('/available-slots', auth, requireRole(['patient']), async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'doctorId and date are required' });
    }

    const { start, end } = getDayRange(date);

    const visits = await Visit.find({
      doctor: doctorId,
      visitDate: { $gte: start, $lte: end },
      status: { $in: ['scheduled', 'in-progress'] }
    });

    const bookedSlots = visits.map(v => {
      return new Date(v.visitDate)
        .toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jerusalem",
          hour: "2-digit",
          minute: "2-digit"
        });
    });

    const TIME_SLOTS = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
      "15:00", "15:30", "16:00", "16:30", "17:00"
    ];

    const available = TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));

    res.json(available);

  } catch (error) {
    console.error("Error while fetching slots:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
