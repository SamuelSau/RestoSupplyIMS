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
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	getCustomer,
	getCustomers,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} from '../api/customerAPI';

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
	grid: {
		color: 'black',
		display: 'flex',
	},
	addButton: {
		backgroundColor: theme.palette.success.main,
		'&:hover': {
			backgroundColor: theme.palette.success.dark,
		},
    color: 'white',
	},
}));

const CustomerManagement = ({ searchQuery }) => {
	const classes = useStyles();
	const [customers, setCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [formData, setFormData] = useState({
		c_name: '',
		c_phone: '',
		c_email: '',
		c_address: '',
	});

	const columns = [
		{ field: 'c_id', headerName: 'Customer ID' },
		{ field: 'c_name', headerName: 'Customer Name' },
		{ field: 'c_phone', headerName: 'Phone' },
		{ field: 'c_email', headerName: 'Email' },
		{ field: 'c_address', headerName: 'Address' },
	];

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = async () => {
		const fetchedCustomers = await getCustomers();
		setCustomers(fetchedCustomers);
	};

  const filteredCustomers = customers.filter(customer => {
    return (
      customer.c_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.c_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.c_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.c_address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedCustomer) {
			await updateCustomer(selectedCustomer.c_id, formData);
		} else {
			await createCustomer(formData);
		}
		setFormData({ c_name: '', c_phone: '', c_email: '', c_address: '' });
		setSelectedCustomer(null);
		fetchCustomers();
	};

	const handleCancel = () => {
		setFormData({ c_name: '', c_phone: '', c_email: '', c_address: '' });
		setSelectedCustomer(null);
	};

	const handleDelete = async (id) => {
		await deleteCustomer(id);
		fetchCustomers();
	};

	const handleEdit = (customer) => {
		setSelectedCustomer(customer);
		setFormData({ ...customer });
	};

	return (
		<Container className={classes.root}>
			<Typography
				variant='h4'
				gutterBottom
				className={classes.title}
			></Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
				<TextField
					label='Customer Name'
					value={formData.c_name}
					onChange={(e) => setFormData({ ...formData, c_name: e.target.value })}
				/>
				<TextField
					label='Customer Phone'
					value={formData.c_phone}
					onChange={(e) =>
						setFormData({ ...formData, c_phone: e.target.value })
					}
				/>
				<TextField
					label='Customer Email'
					value={formData.c_email}
					onChange={(e) =>
						setFormData({ ...formData, c_email: e.target.value })
					}
				/>
				<TextField
					label='Customer Address'
					value={formData.c_address}
					onChange={(e) =>
						setFormData({ ...formData, c_address: e.target.value })
					}
				/>
				<div className={classes.buttonGroup}>
					<Button
						variant='contained'
						color='inherit'
						type='submit'
						className={classes.addButton}
					>
						{selectedCustomer ? 'Update' : 'Add'} Customer
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
					{filteredCustomers.map((customer) => (
						<TableRow key={customer.c_id}>
							{columns.map((column) => (
								<TableCell key={column.field}>
									{customer[column.field]}
								</TableCell>
							))}
							<TableCell>
								<IconButton edge='end' onClick={() => handleEdit(customer)}>
									<EditIcon />
								</IconButton>
								<IconButton
									edge='end'
									onClick={() => handleDelete(customer.c_id)}
								>
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

export default CustomerManagement;
