const express = require('express');
const cors = require('cors');
const ordersController = require('./controllers/ordersController');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./config/db');

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
app.get('/orders', ordersController.listOrders);
app.get('/orders/:id', ordersController.getOrder);
app.post('/orders', ordersController.createOrder);
app.put('/orders/:id', ordersController.updateOrder);
app.delete('/orders/:id', ordersController.deleteOrder);

//Database connection
db.testConnection();

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
