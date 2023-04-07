const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
// Import your routes and use them here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
