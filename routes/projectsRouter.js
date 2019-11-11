/* eslint-disable radix */
const express = require('express');

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
    amount_approved_in_2017: '400000'
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
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
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

    results.results = model.slice(startIndex, endIndex);

    res.paginatedResults = results;
    next();
  };
}
function routes() {
  const projectsRouter = express.Router();
  projectsRouter.route('/')
    .get(paginatedResults(projects), (req, res) => {
      res.json(res.paginatedResults);
    });

  return projectsRouter;
}

module.exports = routes;
