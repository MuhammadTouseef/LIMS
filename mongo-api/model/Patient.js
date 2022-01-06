const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

const PatientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please add a  valid name"],
  },
  lastName: {
    type: String,
    required: [true, "Please add a  valid name"],
  },
  dob: {
    type: Date,
    default: Date.now,
  },
  contact: {
    type: String,
    required: [true, "Please add a  valid Mobile Number"],
  },

  cnic: {
    type: String,
    unique: true,
    required: [true, "Please add a  valid User name"],
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
  gender: {
    type: String,
    required: [true, "Please add a  valid Gender"],
  },

  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
});

module.exports = mongoose.model("PATIENT", PatientSchema);
