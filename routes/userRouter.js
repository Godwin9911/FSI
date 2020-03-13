/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/userModel');
const generateAccessToken = require('../config/token');

const userRouter = express.Router();

userRouter.route('/register')
  .post([
    check('name', 'name is required').notEmpty(),
    check('email', 'invalid email format').isEmail(),
    check('password', 'password is required').notEmpty(),

    // eslint-disable-next-line consistent-return
  ], (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // res.json(req.body);
    // eslint-disable-next-line consistent-return
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(403).json({ message: 'email already exists' });
      }
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        // eslint-disable-next-line no-shadow
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save();
          return res.status(201).json(newUser);
        });
      });
    });
  });

userRouter.route('/logout')
  .get((req, res) => {
    req.logout();
    res.send('<h1>Logged Out</h1><a href="/api/auth/google">Click me to log in using Google</a> <br> <a href="/api/auth/github">Click me to log in using Github</a>');
    // res.status(200).json({ message: 'logout successfull' });
  });

userRouter.route('/checkidentity')
  .get((req, res) => {
    res.locals.user = req.user || null;
    if (res.locals.user) return res.status(200).json(req.user);
    return res.status(404).json({ message: 'not logged In' });
  });

userRouter.route('/login/success')
  .get((req, res) => {
    const { user } = req;
    res.status(200).json({ user, ...generateAccessToken(req.user._id) });
  });


module.exports = userRouter;
