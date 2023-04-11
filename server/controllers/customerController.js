const Customer = require('../models/customer');

const createCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = await Customer.createCustomer(customerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error creating customer", error });
  }
};

const getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.getCustomer(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer", error });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching customers", error });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCustomerData = req.body;
    const updatedCustomer = await Customer.updateCustomer(id, updatedCustomerData);
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error updating customer", error });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.deleteCustomer(id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};
