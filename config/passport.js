/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;
opts.issuer = process.env.ISSUER;
opts.audience = process.env.AUDIENCE;

// Load User Model
const User = require('../models/userModel');

module.exports = (passport) => {
  async function saveOrCreateNewUser(profile, theProvider, done) {
    const userEmail = profile.email || profile._json.email;

    let user = await User.findOne({ email: userEmail });

    if (user) {
      // update provider
      await User.updateOne({ email: userEmail }, {
        $addToSet: {
          provider: [{
            provider_id: profile.id,
            provider_type: theProvider
          }]
        }
      });
    } else {
      // create new
      user = new User();
      user.name = profile.displayName;
      user.email = userEmail;
      user.provider = [{
        provider_id: profile.id,
        provider_type: theProvider
      }];
      user.picture = profile.picture || profile._json.avatar_url;
      await user.save();
    }
    return done(null, user);
  }

  passport.use(
    new JwtStrategy(opts, ((jwt_payload, done) => {
      User.findById(jwt_payload.sub, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      // or you could create a new account
      });
    }))
  );

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ email }).then((user) => {
        if (!user) return done(null, false, { message: 'That email is not registered' });
        // Match password
        return bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) return done(null, user);
          return done(null, false, { message: 'Incorrrect password' });
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true
    },
    ((request, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      saveOrCreateNewUser(profile, 'google', done);
    }))
  );

  /* passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACk
  },
  ((token, tokenSecret, profile, done) => {
    saveOrCreateNewUser(profile, done);
  })));
  */

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  ((accessToken, refreshToken, profile, done) => {
    // console.log(profile);
    saveOrCreateNewUser(profile, 'github', done);
  })));


  passport.serializeUser((user, done) => {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
