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
	IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
	getSupplier,
	getSuppliers,
	createSupplier,
	updateSupplier,
	deleteSupplier,
} from '../api/supplierAPI';

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

const SupplierManagement = ({ searchQuery }) => {
	const classes = useStyles();
	const [suppliers, setSuppliers] = useState([]);
	const [selectedSupplier, setSelectedSupplier] = useState(null);
	const [formData, setFormData] = useState({
		s_id: '',
		s_name: '',
		s_phone: '',
		s_email: '',
		s_address: '',
	});

	const columns = [
		{ field: 's_id', headerName: 'Supplier ID' },
		{ field: 's_name', headerName: 'Supplier Name' },
		{ field: 's_phone', headerName: 'Phone' },
		{ field: 's_email', headerName: 'Email' },
		{ field: 's_address', headerName: 'Address' },
	];

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const fetchSuppliers = async () => {
		const fetchedSuppliers = await getSuppliers();
		setSuppliers(fetchedSuppliers);
	};

	const filteredSuppliers = suppliers.filter((supplier) => {
		return (
			supplier.s_id
				.toString()
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			supplier.s_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			supplier.s_phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
			supplier.s_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			supplier.s_address.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedSupplier) {
			await updateSupplier(selectedSupplier.s_id, formData);
		} else {
			await createSupplier(formData);
		}
		setFormData({
			s_id: '',
			s_name: '',
			s_phone: '',
			s_email: '',
			s_address: '',
		});
		setSelectedSupplier(null);
		fetchSuppliers();
	};

	const handleCancel = () => {
		setFormData({
			s_id: '',
			s_name: '',
			s_phone: '',
			s_email: '',
			s_address: '',
		});
		setSelectedSupplier(null);
	};

	const handleDelete = async (id) => {
		await deleteSupplier(id);
		fetchSuppliers();
	};

	const handleEdit = (supplier) => {
		setSelectedSupplier(supplier);
		setFormData({ ...supplier });
	};

	return (
		<Container className={classes.root}>
			<Typography variant='h4' gutterBottom className={classes.title}>
				
			</Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
				{/* Add your TextField components here */}
				<TextField
					label='Supplier ID'
					value={formData.s_id}
					onChange={(e) => setFormData({ ...formData, s_id: e.target.value })}
				/>
				<TextField
					label='Supplier Name'
					value={formData.s_name}
					onChange={(e) => setFormData({ ...formData, s_name: e.target.value })}
				/>
				<TextField
					label='Phone'
					value={formData.s_phone}
					onChange={(e) =>
						setFormData({ ...formData, s_phone: e.target.value })
					}
				/>
				<TextField
					label='Email'
					value={formData.s_email}
					onChange={(e) =>
						setFormData({ ...formData, s_email: e.target.value })
					}
				/>
				<TextField
					label='Address'
					value={formData.s_address}
					onChange={(e) =>
						setFormData({ ...formData, s_address: e.target.value })
					}
				/>
				<div className={classes.buttonGroup}>
					<Button
						variant='contained'
						color='inherit'
						type='submit'
						className={classes.addButton}
					>
						{selectedSupplier ? 'Update' : 'Add'} Supplier
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
					{filteredSuppliers.map((supplier) => (
						<TableRow key={supplier.s_id}>
							{columns.map((column) => (
								<TableCell key={column.field}>
									{supplier[column.field]}
								</TableCell>
							))}
							<TableCell>
								<IconButton edge='end' onClick={() => handleEdit(supplier)}>
									<EditIcon />
								</IconButton>
								<IconButton
									edge='end'
									onClick={() => handleDelete(supplier.s_id)}
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

export default SupplierManagement;
