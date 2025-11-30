process.env.TZ = 'Asia/Jerusalem';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', // front url
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());


app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/doctors', require('./routes/doctors.js'));
app.use('/api/finance', require('./routes/finance.js'));
app.use('/api/visits', require('./routes/visits.js'));
app.use('/api/patients', require('./routes/patients.js'));
app.use('/api/admin', require('./routes/admin.js'));



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare-app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});