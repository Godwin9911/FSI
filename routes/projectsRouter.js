/* eslint-disable no-console */
/* eslint-disable radix */
const express = require('express');
const uuid = require('uuid');
const { MessagingResponse } = require('twilio').twiml;
const multerConfig = require('../config/multer');

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < await model.countDocuments().exec() /* model.length */) {
      results.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    }

    /* results.results = model.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
    */

    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

function routes(Project) {
  const projectsRouter = express.Router();
  projectsRouter.route('/')
    .get(paginatedResults(Project), (req, res) => {
      res.json(res.paginatedResults);
    });

  
  projectsRouter.route('/:id')
    .get((req, res) => {
      if (!req.params.id) {
        res.status(400).json({ message: 'missing Credentials' });
      }
      Project.findOne({ project_id: req.params.id }, (err, project) => {
        if (err) return res.send(err);
        return res.status(200).json(project);
      }).catch((err) => console.log(err));
    });

  projectsRouter.route('/search')
    .get((req, res) => {
      // const query = {};
      // console.log(req.query);

      Project.find(req.query, (err, searchResult) => {
        if (err) {
          return res.send(err);
        }
        return res.status(200).json(searchResult);
      });
    });


  // POST projects/likeProject
  // body - project_id && userId
  projectsRouter.route('/likeProject')
    .post((req, res) => {
      const { userId } = req.body;
      Project.updateOne({ project_id: req.body.project_id }, { $push: { likes: userId } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  // POST projects/dislikeProject
  // body - project_id && userId
  projectsRouter.route('/dislikeProject')
    .post((req, res) => {
      const { userId } = req.body;
      Project.updateOne({ project_id: req.body.project_id }, { $push: { dislikes: userId } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  // POST projects/addComment
  // body - project_id && comment
  projectsRouter.route('/addComment')
    .post((req, res) => {
      const { comment } = req.body;
      const insertComments = {
        commentId: uuid(),
        comment,
      };

      // eslint-disable-{next-line max-len
      Project.updateOne({ project_id: req.body.project_id }, { $push: { comments: { ...insertComments } } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  // POST projects/addCommentImage
  // body - imageToUpload
  projectsRouter.route('/uploadCommentImage')
    .post(multerConfig.saveToUploads, (req, res) => res.status(200).json('file uploaded successfully'));

  // POST projects/addCommentImage
  // body - report && project_id
  projectsRouter.route('/report')
    .post((req, res) => {
      const { report } = req.body;
      const insertReport = {
        reportId: uuid(),
        report,
      };

      // eslint-disable-next-line max-len
      Project.updateOne({ project_id: req.body.project_id }, { $push: { reports: { ...insertReport } } })
        .then((data) => res.status(200).json(data))
        .catch((err) => console.log(err));
    });

  // do when internet works
  projectsRouter.route('/sendSms')
    .post(async (req, res) => {
      const twiml = new MessagingResponse();
      // TODO is split and send report or send comment
      const string = req.body.Body.split('-');
      const id = string[0];
      const comment = string[1];
      const insertComments = {
        commentId: uuid(),
        comment,
      };

      // eslint-disable-next-line max-len
      await Project.updateOne({ project_id: id }, { $push: { comments: { ...insertComments } } })
        .then((data) => /* res.status(200).json(data) */
          console.log(data))
        .catch((err) => console.log(err));

      twiml.message('your comment has been sent!');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    });


  return projectsRouter;
}

module.exports = routes;
