const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  u_name: {
    type: String
  },
  u_email: {
    type: String
  },
  u_pw: {
    type: String
  },
  u_cName: {
    type: String
  },
  u_avatar: {
    type: String
  },
  u_date: {
    type: Date,
    default: Date.now
  },
  u_pin_movie: {
    type: [String]
  },
  u_pin_company: {
    type: [String]
  },
  u_pin_company_alarm: {
    type: [String]
  },
  u_upload_movie: {
    type: [String]
  }
});

module.exports = User = mongoose.model("users", UserSchema);
