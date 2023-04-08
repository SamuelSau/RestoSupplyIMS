const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await User.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await User.updateUser(id, updatedUserData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
