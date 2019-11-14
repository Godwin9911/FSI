/* eslint-disable no-console */
const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Project = require('../models/projectModel');

function routes(User) {
  const userRouter = express.Router();

  userRouter.route('/register')
    .post((req, res) => {
      // res.json(req.body);
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

  userRouter.route('/login')
    .post(passport.authenticate('local', {
      failureRedirect: 'login',
      failureFlash: true
    }),
    (req, res, next) => {
      res.status(200).json(req.user);
      next();
    })
    .get((req, res) => {
      const message = req.flash('error');
      res.status(401).json({ message });
    });

  userRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.status(200).json({ message: 'logout successfull' });
    });

  userRouter.route('/checkidentity')
    .get((req, res) => {
      res.locals.user = req.user || null;
      if (res.locals.user) return res.status(200).json(req.user);
      return res.status(404).json({ message: 'not logged In' });
    });

  userRouter.route('/getSavedProject')
    .get((req, res) => {
      // res.locals.user = req.user || null;
      // Project.find({ project_id: { $in: req.user.saved_projects } })
      Project.find({ project_id: { $in: [4, 6, 2,] } })
        .then((projectData) => {
          if (!projectData) {
            return res.status(200).json({ message: 'you have no saved projects' });
          }
          return res.status(200).json(projectData);
        })
        .catch((err) => res.send(err));
      // res.json(req.user);
    });

  // send the project_id and user_id
  userRouter.route('/saveProject')
    .post((req, res) => {
      // res.send(req.body);
      User.updateOne({ _id: req.body.user_id }, { $push: { saved_projects: req.body.project_id } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  userRouter.route('/deleteSaved')
    .delete((req, res) => {
      User.updateOne({ _id: req.body.user_id }, { $pull: { saved_projects: req.body.project_id } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  return userRouter;
}

module.exports = routes;
