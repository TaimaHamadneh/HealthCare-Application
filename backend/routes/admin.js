const express = require('express');
const User = require('../models/User');
const Visit = require('../models/Visit');
const { auth, requireRole } = require('../middleware/auth');
const router = express.Router();

// Admin dashboard stats
router.get('/stats', auth, requireRole(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalFinance = await User.countDocuments({ role: 'finance' });

    const totalVisits = await Visit.countDocuments();
    const totalRevenue = await Visit.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const activeVisits = await Visit.countDocuments({ status: 'in-progress' });
    const pendingPayments = await Visit.aggregate([
      { $match: { isPaid: false } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.json({
      totalUsers,
      totalPatients,
      totalDoctors,
      totalFinance,
      totalVisits,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingPayments: pendingPayments[0]?.total || 0,
      activeVisits,
      
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all users for admin
router.get('/users', auth, requireRole(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '' } = req.query;
    
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (role && role !== 'all') {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filter);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: "Error loading users", error: error.message });
  }
});

// Delete user
router.delete('/users/:id', auth, requireRole(['admin']), async (req, res) => {
  try {

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot delete your own account" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});


module.exports = router;