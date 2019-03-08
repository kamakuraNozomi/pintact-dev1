//user
//handle
//location
//skills
//bio
//experirnce title, year
//photo
//social twitter, instagram, facebook, youtube, website
//date

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 20
  },
  location: {
    type: String
  },
  skills: {
    type: [String]
  },
  bio: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      year: {
        type: Number
      }
    }
  ],
  photo: {
    type: String
  },
  social: [
    {
      twitter: {
        type: String
      },
      instagram: {
        type: String
      },
      facebook: {
        type: String
      },
      website: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Profile = mongoose.model("profile", ProfileSchema);
