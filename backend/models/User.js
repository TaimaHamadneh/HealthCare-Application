const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'finance','admin'],
    required: true
  },
  dateOfBirth: {
    type: Date,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  // fields just for doctors
  specialization: {
    type: String,
    required: function() { return this.role === 'doctor'; }
  },
  licenseNumber: {
    type: String,
    required: function() { return this.role === 'doctor'; }
  },
  
}, {
  timestamps: true
});

// Hash password
userSchema.pre('save', async function () {
  console.log("Password before hashing:", this.password);
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
  console.log("Password after hashing:", this.password);
});

// Compare password 
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);