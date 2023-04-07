const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists and the password is correct
    if (!user || user.password !== password) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
  
    return done(null, user);
}))