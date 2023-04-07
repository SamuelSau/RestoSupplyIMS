const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./config/db');
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// Import your routes and use them here

//Database connection
db.testConnection();

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
