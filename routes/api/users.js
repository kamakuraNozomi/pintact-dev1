const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// MongoDB keys
const keys = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users works!" }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.u_email }).then(user => {
    if (user) {
      errors.u_email = "このメールアドレスはすでに登録されています";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.u_email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        u_name: req.body.u_name,
        u_email: req.body.u_email,
        avatar,
        u_pw: req.body.u_pw
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.u_pw, salt, (err, hash) => {
          if (err) throw err;

          newUser.u_pw = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Chenck Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const u_email = req.body.u_email;
  const u_pw = req.body.u_pw;

  // Find user by email
  User.findOne({ u_email }).then(user => {
    // Check for user
    if (!user) {
      errors.u_email = "ユーザーではありません";
      return res.status(400).json(errors);
    }
    // Check Password
    bcrypt.compare(u_pw, user.u_pw).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          name: user.u_name,
          avatar: user.avatar,
          cName: user.u_cName
        }; // Create JWT Payload
        let token = jwt.sign(payload, keys.secretOrKey);
        res.json({
          success: " True! Authenticated. header",
          token: "Bearer " + token,
          payload: payload
        });
        // Sign Token
        // jwt.sign(
        //   payload,
        //   keys.SecretOrKey,
        //   { expriresIn: 3600 },
        //   (err, token) => {
        //     res.json({
        //       success: true,
        //       token: "Bearer >" + token,
        //       userName: user.userName
        //     });
        //   }
        // );
      } else {
        errors.u_pw = "パスワードが正しくありません";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      user: req.user.u_name,
      email: req.user.u_email
    });
  }
);

module.exports = router;
