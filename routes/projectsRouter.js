/* eslint-disable no-console */
/* eslint-disable radix */
const express = require('express');
const uuid = require('uuid');
const {MessagingResponse} = require('twilio').twiml;
const multerConfig = require('../config/multer');

const projects = [
  {
    project_id: '1',
    name_of_contractor: 'Mike Oliver',
    cartegory: 'Health',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Ikwere',
    state: 'Rivers',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2019',
    amount_approved_in_2016: '200000',
    amount_approved_in_2017: '400000',
    likes: [
      '5dc95cc745633f3e7862f947',
      '5dc95cc745633f3e7862f947',
      '5dc95cc74jfjnjf7862f947',
      '5dc95cc74jfjnjf7862f947',
      '5dc95cc74jfjnjf7862f947',
      '5dc95cc74jfjnjf7862f947',
      '5dc95cc74jfjnjf7862f947'
    ],
    dislikes: [
      '5dc95cc74jfjnjf7862f947',
      '5dc95cc74jfjnjf7862f947'
    ],
    comments: [
      {
        commentId: 'fbeac5af-6619-4f65-9528-3d492011dd4a',
        comment: 'The Project was awesome'
      },
      {
        commentId: 'ac85eb63-7611-486c-bdc1-40fa31f85046',
        comment: 'An awesome completed project'
      }
    ]
  },
  {
    project_id: '2',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Abia',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '3',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Abia',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '4',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Aba',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '5',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Calabar',
    state: 'Cross River',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '6',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Delta',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '7',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Edo',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '8',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Imo',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '9',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Ondo',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  },
  {
    project_id: '10',
    name_of_contractor: 'Ann Oliver',
    cartegory: 'Education',
    activity_status: 'completed',
    lga: 'Obio Akpor',
    community: 'Abuloma',
    state: 'Rivers',
    project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
    start_date: '10/11/2018',
    amount_approved_in_2016: '600000',
    amount_approved_in_2017: '300000'
  }

];

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
    .post( async (req, res) => {
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
