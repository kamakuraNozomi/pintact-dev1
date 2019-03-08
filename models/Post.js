const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  m_url: {
    type: String,
    required: true
  },
  m_title: {
    type: String
  },
  m_desc: {
    type: String
  },
  m_upDate: {
    type: Date,
    defualt: Date.now
  },
  m_thumb: {
    type: String
  },
  m_actorName: {
    type: [String]
  },
  m_year: {
    type: String
  },
  m_tag: {
    type: [String]
  },
  m_right: {
    type: Number,
    default: 1
  }
});
module.exports = Post = mongoose.model("post", PostSchema);
