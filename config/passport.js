<<<<<<< HEAD
// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return done(null, false, { message: 'Usuário não encontrado' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Senha inválida' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile.id;
    let user = await User.findOne({ googleId });
    if (!user) {
      // try by email
      const email = profile.emails && profile.emails[0] && profile.emails[0].value;
      user = await User.findOne({ email });
    }
    if (!user) {
      const nome = profile.displayName || 'Usuário Google';
      const email = profile.emails && profile.emails[0] && profile.emails[0].value || '';
      user = await User.create({
        googleId,
        nome,
        email,
        password: '' // senha vazia para usuários google
      });
    } else if (!user.googleId) {
      // vincula conta existente com googleId se não tiver
      user.googleId = googleId;
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err);
  }
});
=======
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
));

// Serialização (padrão)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
