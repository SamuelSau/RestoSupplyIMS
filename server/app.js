const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const auth = require('./middlewares/auth'); 
const sessionSecret = process.env.SESSION_SECRET;

const loginRoute = require('./routes/loginRoute');
const ordersRouter = require('./routes/orderRoute');
const userRoutes = require('./routes/userRoute');

// Set up the session middleware
app.use(session({
  secret: sessionSecret, 
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and the session
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});

// Routes
app.use('/orders', ordersRouter);
app.use('/api', loginRoute);
app.use('/api/users', userRoutes);

//Database connection
db.testConnection();

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
