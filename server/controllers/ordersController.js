const Order = require('../models/order');

const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = await Order.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.getOrder(orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrderData = req.body;
    const updatedOrder = await Order.updateOrder(orderId, updatedOrderData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.deleteOrder(orderId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
