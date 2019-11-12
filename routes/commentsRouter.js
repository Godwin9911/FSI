const express = require('express');
const uuid = require('uuid');

function routes() {
  const commentsRouter = express.Router();

  commentsRouter.route('/postcomments')
    .post((req, res) => {
      const { comment, product_id } = req.body;

      const insertComments = {
        
      }

      res.json(req.body);
    });

  return commentsRouter;
}

module.exports = routes;