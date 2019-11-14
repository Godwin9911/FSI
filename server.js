/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const User = require('./models/userModel');
const Project = require('./models/projectModel');
// DB Config
const dbs = require('./config/keys').mongoURI;

const userRouter = require('./routes/userRouter')(User);
const projectsRouter = require('./routes/projectsRouter')(Project);

app.use(cors());
// passport Config
require('./config/passport')(passport);

mongoose.connect(dbs, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err));

// fill Database
const db = mongoose.connection;
db.once('open', async () => {
  if (await Project.countDocuments().exec() > 0) return;

  Promise.all([
    Project.create({
      project_id: '1',
      project_title: 'Construction of Hospital',
      name_of_contractor: 'Mike Oliver',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Ikwere',
      state: 'Rivers',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2017',
      amount_approved_in_2016: '230000',
      amount_approved_in_2017: '800000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '2',
      project_title: 'Construction of School',
      name_of_contractor: 'Jack Ryan',
      cartegory: 'Education',
      activity_status: 'Abandoned',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2015',
      amount_approved_in_2016: '300000',
      amount_approved_in_2017: '700000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '3',
      project_title: 'Construction of Hospital',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '4',
      project_title: 'Road Construction',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'in Progress',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Abuloma',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '5',
      project_title: 'Road Construction',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '6',
      project_title: 'Road Construction',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '7',
      project_title: 'Road Construction',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '8',
      project_title: 'Road Construction',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '9',
      project_title: 'Road Construction',
      name_of_contractor: 'John Gillingham',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2018',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
    Project.create({
      project_id: '10',
      project_title: 'Highway construction',
      name_of_contractor: 'Mike Dean',
      cartegory: 'Health',
      activity_status: 'completed',
      lga: 'Obio Akpor',
      community: 'Calabar',
      state: 'Crossriver',
      project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum dapibus ullamcorper. Etiam interdum luctus ex. Proin ut metus odio. Nulla hendrerit aliquam mauris, at scelerisque velit dignissim id.',
      start_date: '10/11/2015',
      amount_approved_in_2016: '800000',
      amount_approved_in_2017: '900000',
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
      ],
      reports: [
        {
          reportId: '31b0c8df-6c89-4daa-ad8e-b9b357981cf5',
          report: 'This is a test Report'
        }
      ]
    }),
  ]).then(() => console.log('Added new Projects'));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Express Session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/api/user', userRouter);
app.use('/api/projects', projectsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port  ${port}`);
});
