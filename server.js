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
// DB Config
const dbs = require('./config/keys').mongoURI;

const userRouter = require('./routes/userRouter');
const emailLoginRouter = require('./routes/Auth/emailLoginRouter');
const googleLoginRouter = require('./routes/Auth/googleLoginRouter');
const githubLoginRouter = require('./routes/Auth/githubLoginRouter');

app.use(cors());

mongoose.connect(dbs, { useNewUrlParser: true, useUnifiedTopology: true })
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
// passport Config
require('./config/passport')(passport);

app.use(flash());

app.use('/api/user', userRouter);
app.use('/api/auth/email', emailLoginRouter);
app.use('/api/auth/google', googleLoginRouter);
app.use('/api/auth/github', githubLoginRouter);

app.get('/', (req, res) => {
  res.send('<a href="/api/user/logout">logout<a><br><a href="/api/auth/google">Click me to log in using Google</a> <br> <a href="/api/auth/github">Click me to log in using Github</a>');
});

app.get('/profile', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  });

app.listen(port, () => {
  console.log(`Running on port  ${port}`);
});
