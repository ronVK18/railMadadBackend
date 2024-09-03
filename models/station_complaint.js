const mongoose = require('mongoose');

const station_complain = new mongoose.Schema({
  Stationname: {
    required: true,
    type: String
  },
  status:{
    type: String,
    default: "Pending"
  },
  date: {
    required: true,
    type: String,
    default: Date.now
  },
  problem_desc: {
    required: true,  
    type: String
  },
  department: {
    required: true,
    type: String,
    trim: true
  },
  media: {
   type: [String],
   required: true
  }
});

// Export the Mongoose model
module.exports = mongoose.model('station_complaint', station_complain);
