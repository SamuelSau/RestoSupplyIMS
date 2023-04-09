const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // Find the user by email
      const user = await User.getUser(email);

      // Check if the user exists and the password is correct
      if (!user || user.u_password !== password) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.u_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getUser(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
