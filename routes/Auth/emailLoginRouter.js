/* eslint-disable no-underscore-dangle */
const express = require('express');
const passport = require('passport');
const generateAccessToken = require('../../config/token');

const emailLoginRouter = express.Router();

emailLoginRouter.route('/login')
  .post(passport.authenticate('local', {
    failureRedirect: 'login',
    failureFlash: true
  }),
  (req, res, next) => {
    const { user } = req;
    res.status(200).json({ user, ...generateAccessToken(req.user._id) });
    next();
  })
  .get((req, res) => {
    const message = req.flash('error');
    res.status(401).json({ message });
  });

module.exports = emailLoginRouter;
