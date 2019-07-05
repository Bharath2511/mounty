const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    phone:{type:String,required:true},
    email:{type:String,required:true}

  },
  address: {
    building:{type:String,required:true},
    street:{type:String,required:true},
    pincode:{type:String,required:true}

  },
  gender: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("users", userSchema);