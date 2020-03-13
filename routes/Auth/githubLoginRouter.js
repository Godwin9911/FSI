const express = require('express');
const passport = require('passport');

const githubLoginRouter = express.Router();

githubLoginRouter.get('/',
  passport.authenticate('github', { scope: ['user:email'] }));

githubLoginRouter.get('/callback',
  passport.authenticate('github', { failureRedirect: '/api/auth/github/failure' }),
  (req, res) => {
    // Successful authentication, redirect.
    res.redirect('/api/user/login/success');
  });


githubLoginRouter.get('/failure', (req, res) => {
  res.status(400).json({ message: 'github login failed, please try again.' });
});

module.exports = githubLoginRouter;
