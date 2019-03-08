const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

// Post model
const Post = require("../../models/Post");

// Validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Post Works!!" }));

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get Fields  -- videoFields --

    if (typeof req.body.m_tag !== "undefined") {
      req.body.m_tag = req.body.m_tag.split(",");
    }

    const newPost = new Post({
      m_url: req.body.m_url,
      m_title: req.body.m_title,
      m_desc: req.body.m_desc,
      m_upDate: req.body.m_upDate,
      m_thumb: req.body.m_thumb,
      m_actorName: req.body.m_actorName,
      m_year: req.body.m_year,
      m_tag: req.body.m_tag,
      u_name: req.body.u_name,
      u_cName: req.body.u_cName,
      m_right: req.body.m_right,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
