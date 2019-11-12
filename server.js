const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 5000;
const User = require('./models/userModel');
const Project = require('./models/projectModel');

const commentsRouter = require('./routes/commentsRouter')();
const userRouter = require('./routes/userRouter')(User);
const projectsRouter = require('./routes/projectsRouter')(/* Project */);


// passport Config
require('./config/passport')(passport);

mongoose.connect('mongodb://localhost/nddc', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err));

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
app.use('/api/comments', commentsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.listen(port, () => {
  console.log(`Running on port  ${port}`);
});

