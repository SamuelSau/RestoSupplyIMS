import React, { useState, useEffect } from 'react';
import {
	Container,
	Typography,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	getOrder,
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
} from '../api/orderAPI';

const useStyles = makeStyles((theme) => ({
	title: {
		color: 'black',
		textAlign: 'center',
		fontFamily: 'Roboto',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
}));

const OrderManagement = () => {
	const classes = useStyles();
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [formData, setFormData] = useState({
		customer_id: '',
		order_date: '',
		total_amount: '',
	});

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		const fetchedOrders = await getOrders();
		setOrders(fetchedOrders);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedOrder) {
			await updateOrder(selectedOrder.id, formData);
		} else {
			await createOrder(formData);
		}
		setFormData({}); // Reset form data
		setSelectedOrder(null);
		fetchOrders();
	};

	const handleDelete = async (id) => {
		await deleteOrder(id);
		fetchOrders();
	};

	const handleEdit = (order) => {
		setSelectedOrder(order);
		setFormData({ ...order });
	};

	return (
		<Container>
			<Typography variant='h4' gutterBottom className={classes.title}>
				Order Management
			</Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
				<TextField
					label='Customer ID'
					value={formData.customer_id}
					onChange={(e) =>
						setFormData({ ...formData, customer_id: e.target.value })
					}
				/>
				<TextField
					label='Order Date'
					type='date'
					value={formData.order_date}
					InputLabelProps={{ shrink: true }}
					onChange={(e) =>
						setFormData({ ...formData, order_date: e.target.value })
					}
				/>
				<TextField
					label='Total Amount'
					value={formData.total_amount}
					onChange={(e) =>
						setFormData({ ...formData, total_amount: e.target.value })
					}
				/>
				<Button variant='contained' color='primary' type='submit'>
					{selectedOrder ? 'Update' : 'Add'} Order
				</Button>
			</form>
			<Typography variant='h5' gutterBottom>
				Order List
			</Typography>
			<List>
				{orders.map((order) => (
					<ListItem key={order.id}>
						<ListItemText
							primary={
								<Typography style={{ color: 'black' }}>
									{`Order #${order.o_id} Ship date ${order.o_ship_date}, Price ${order.o_price}`}
								</Typography>
							}
						/>
						<ListItemSecondaryAction>
							<IconButton edge='end' onClick={() => handleEdit(order)}>
								<EditIcon />
							</IconButton>
							<IconButton edge='end' onClick={() => handleDelete(order.id)}>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Container>
	);
};

export default OrderManagement;
