import axios from 'axios';

const API_URL = 'http://localhost:3001/api/orders';

export const getOrder = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching order', error);
		return null;
	}
};

export const getOrders = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders', error);
        return [];
    }
};

export const createOrder = async (orderData) => {
	try {
		const response = await axios.post(API_URL, orderData);
		return response.data;
	} catch (error) {
		console.error('Error adding order', error);
	}
};

export const updateOrder = async (id, orderData) => {
	try {
		const response = await axios.put(`${API_URL}/${id}`, orderData);
		return response.data;
	} catch (error) {
		console.error('Error updating order', error);
	}
};

export const deleteOrder = async (id) => {
	try {
		await axios.delete(`${API_URL}/${id}`);
	} catch (error) {
		console.error('Error deleting order', error);
	}
};
