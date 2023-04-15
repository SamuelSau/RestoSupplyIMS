const Supplier = require('../models/supplier');

const createSupplier = async (req, res) => {
	try {
		const supplierData = req.body;
		const newSupplier = await Supplier.createSupplier(supplierData);
		res.status(201).json(newSupplier);
	} catch (error) {
		res.status(500).json({ message: 'Error creating supplier', error });
	}
};

const getAllSuppliers = async (req, res) => {
	try {
		const suppliers = await Supplier.getAllSuppliers();
		res.status(200).json(suppliers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching suppliers', error });
	}
};

const getSupplier = async (req, res) => {
	try {
		const id = req.params.id;
		const supplier = await Supplier.getSupplier(id);
		res.status(200).json(supplier);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching supplier', error });
	}
};

const updateSupplier = async (req, res) => {
	try {
		const id = req.params.id;
		const updatedSupplierData = req.body;
		const updatedSupplier = await Supplier.updateSupplier(
			id,
			updatedSupplierData
		);
		res.status(200).json(updatedSupplier);
	} catch (error) {
		res.status(500).json({ message: 'Error updating supplier', error });
	}
};

const deleteSupplier = async (req, res) => {
	try {
		const id = req.params.id;
		await Supplier.deleteSupplier(id);
		res.status(200).json({ message: 'Supplier deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error deleting supplier', error });
	}
};

module.exports = {
	createSupplier,
	getSupplier,
	getAllSuppliers,
	updateSupplier,
	deleteSupplier,
};
