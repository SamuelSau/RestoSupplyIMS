import axios from 'axios';

const API_URL = 'http://localhost:3001/api/customers';

export const getCustomer = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error('Error fetching customers', error);
		return [];
	}
};

export const getCustomers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers', error);
        return [];
    }
};


export const createCustomer = async (customerData) => {
	try {
		const response = await axios.post(API_URL, customerData);
		return response.data;
	} catch (error) {
		console.error('Error adding customer', error);
	}
};

export const updateCustomer = async (id, customerData) => {
	try {
		const response = await axios.put(`${API_URL}/${id}`, customerData);
		return response.data;
	} catch (error) {
		console.error('Error updating customer', error);
	}
};

export const deleteCustomer = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting customer', error);
	}
};
