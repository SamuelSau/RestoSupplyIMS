import React, { useState, useEffect } from 'react';
import {
	Container,
	Typography,
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton
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
	root: {
		color: 'black',
	},
	title: {
		color: 'black',
		textAlign: 'center',
		fontFamily: 'Roboto',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	buttonGroup: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: theme.spacing(2),
	},
	addButton: {
		backgroundColor: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.dark,
		},
		color: 'white',
	},
}));

const OrderManagement = ({ searchQuery }) => {
	const classes = useStyles();
	const [orders, setOrders] = useState([]);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [formData, setFormData] = useState({
		o_id: '',
		o_cust_id: '',
		o_product_id: '',
		o_date: '',
		o_ship_date: '',
		o_price: '',
	});

	const columns = [
		{ field: 'o_id', headerName: 'Order ID' },
		{ field: 'o_cust_id', headerName: 'Customer ID' },
		{field: 'o_date', headerName: 'Order Date'},
		{ field: 'o_product_id', headerName: 'Product ID' },
		{field: 'o_ship_date', headerName: 'Ship Date'},
		{ field: 'o_price', headerName: 'Order Price' },
	];

	useEffect(() => {
		fetchOrders();
	}, []);

	const fetchOrders = async () => {
		const fetchedOrders = await getOrders();
		setOrders(fetchedOrders);
	};

	const filteredOrders = orders.filter((order) => {
		return (
			order.o_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.o_product_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.o_cust_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.o_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.o_ship_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.o_price.toString().toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedOrder) {
			await updateOrder(selectedOrder.o_id, formData);
		} else {
			await createOrder(formData);
		}
		setFormData({ o_id: '', o_product_id: '', o_cust_id: '', o_date: '', o_ship_date: '', o_price: '' });
		setSelectedOrder(null);
		fetchOrders();
	};

	const handleCancel = () => {
		setFormData({ o_id: '', o_product_id: '', o_cust_id: '', o_date: '', o_ship_date: '', o_price: '' });
		setSelectedOrder(null);
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
		<Container className={classes.root}>
			<Typography variant='h4' gutterBottom className={classes.title}>
			</Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
			<TextField
					label='Order ID'
					value={formData.o_id}
					onChange={(e) =>
						setFormData({ ...formData, o_id: e.target.value })
					}
				/>
				<TextField
					label='Customer ID'
					value={formData.o_cust_id}
					onChange={(e) =>
						setFormData({ ...formData, o_cust_id: e.target.value })
					}
				/>
				<TextField
					label='Product Date'
					type='date'
					value={formData.o_product_id}
					InputLabelProps={{ shrink: true }}
					onChange={(e) =>
						setFormData({ ...formData, o_product_id: e.target.value })
					}
				/>
				<TextField
					label='Order Date'
					value={formData.o_date}
					onChange={(e) =>
						setFormData({ ...formData, o_date: e.target.value })
					}
				/>
				<TextField
					label='Ship Date'
					value={formData.o_ship_date}
					onChange={(e) =>
						setFormData({ ...formData, o_ship_date: e.target.value })
					}
				/>
				<TextField
				label='Price Date'
				value={formData.o_price}
				onChange={(e) =>
					setFormData({ ...formData, o_price: e.target.value })
				}
			/>
				<div className={classes.buttonGroup}>
					<Button
						variant='contained'
						color='inherit'
						type='submit'
						className={classes.addButton}
					>
						{selectedOrder ? 'Update' : 'Add'} Order
					</Button>
					<Button variant='contained' color='secondary' onClick={handleCancel}>
						Cancel
					</Button>
				</div>
			</form>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell key={column.field}>{column.headerName}</TableCell>
						))}
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredOrders.map((order) => (
						<TableRow key={order.o_id}>
							{columns.map((column) => (
								<TableCell key={column.field}>{order[column.field]}</TableCell>
							))}
							<TableCell>
								<IconButton edge='end' onClick={() => handleEdit(order)}>
									<EditIcon />
								</IconButton>
								<IconButton edge='end' onClick={() => handleDelete(order.o_id)}>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Container>
	);
};

export default OrderManagement;