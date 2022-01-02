const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const EmployeeSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: [true, 'Please add a  valid name']
    },
    lastname: {
        type: String,
        required: [true, 'Please add a  valid name']
      },
      dob: {
        type: Date,
        default: Date.now
      },
      mobilenumber: {
        type: String,
        required: [true, 'Please add a  valid Mobile Number']
      },
      telephone: {
        type: String,
        required: [true, 'Please add a  valid name']
      },
      address: {
        type: String,
        required: [true, 'Please add a  valid name']
      },
      cnic: {
        type: String,
        unique: true,
        required: [true, 'Please add a  valid User name']
      },
      username: {
        type: String,
        unique: true,
        required: [true, 'Please add a  valid name']
      },
      password: {
        type: String,
        required: [true, 'Please add a  valid name']
      },
      
      status: {
        type: Boolean,
        default: true
      },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
   
  });
  EmployeeSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
module.exports = mongoose.model('EMPLOYEE', EmployeeSchema);