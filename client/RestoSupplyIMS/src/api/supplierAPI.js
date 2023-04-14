import axios from 'axios';

const API_URL = 'http://localhost:3001/api/suppliers';

export const getSupplier = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching suppliers', error);
		return [];
	}
};

export const getSuppliers = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching suppliers', error);
		return [];
	}
};

export const createSupplier = async (supplierData) => {
	try {
		const response = await axios.post(API_URL, supplierData);
		return response.data;
	} catch (error) {
		console.error('Error adding supplier', error);
	}
};

export const updateSupplier = async (id, supplierData) => {
	try {
		const response = await axios.put(`${API_URL}/${id}`, supplierData);
		return response.data;
	} catch (error) {
		console.error('Error updating supplier', error);
	}
};

export const deleteSupplier = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting supplier', error);
	}
};
