const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const RoleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a  valid Title']
      },
    
      permission : {
      
        type: Array
      }
        , 
      subitms : {
       
        type: Array
      }
      
}
)


module.exports = mongoose.model('ROLES', RoleSchema);
