const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const TestSchema = new mongoose.Schema({
    testname: {
      type: String,
      required: [true, 'Please add a  valid name']
    },
    sample: {
        type: String,
        required: [true, 'Please add a  valid name']
      },
      time: {
        type: String,
        required: [true, 'Please add a  valid name']
      },
      cost: {
        type: Number,
        required: [true, 'Please add a  valid name']
      },
      testdata : {    
        _id : true,      
          type: Array
      }
    
   
  });

module.exports = mongoose.model('TEST', TestSchema);