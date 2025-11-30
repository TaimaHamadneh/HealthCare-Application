const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  treatmentName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  value: {
    type: Number,
    required: true,
    min: 0
  }
});

const visitSchema = new mongoose.Schema({
  visitId: {
    type: String,
    unique: true,
  },  
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (id) {
        const user = await mongoose.model("User").findById(id);
        return user && user.role === "patient";
      },
      message: "Assigned patient must have role 'patient'."
    }
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (id) {
        const user = await mongoose.model("User").findById(id);
        return user && user.role === "doctor";
      },
      message: "Assigned doctor must have role 'doctor'."
    }
  },
  visitDate: {
    type: Date,
    required: true,
    validate: {
      validator: v => !isNaN(v.getTime()),
      message: "Invalid visit date."
    }
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  symptoms: {
    type: String
  },
  diagnosis: {
    type: String
  },
  treatments: [treatmentSchema],
  notes: {
    type: String
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate total amount 
visitSchema.pre('save', function(next) {
  this.totalAmount = this.treatments.reduce((total, t) => total + (t.value || 0), 0);
});

// Generate visit ID
visitSchema.pre('save', async function() {
  if (this.isNew) {
    const count = await mongoose.model('Visit').countDocuments();
    const number = (count + 1).toString().padStart(4, '0');
    this.visitId = `HC-VIS-${number}`;
  }
});

module.exports = mongoose.model('Visit', visitSchema);