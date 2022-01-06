const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var Schema = mongoose.Schema;
const BillSchema = new mongoose.Schema({
  patientid: { type: Schema.Types.ObjectId, ref: "PATIENT" },
  Tests: [{ type: mongoose.Schema.Types.ObjectId, ref: "TEST" }],
  samples: {
    type: Array,
  },
  results: {
    type: Array,
  },

  billid: Number,
  cost: Number,
  tax: Number,
  grandTotal: Number,
  password: String,
});

module.exports = mongoose.model("BILL", BillSchema);
