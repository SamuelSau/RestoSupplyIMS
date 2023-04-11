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
	getSuppliers,
	addSupplier,
	updateSupplier,
	deleteSupplier,
} from '../api/supplierAPI';

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

const SupplierManagement = () => {
	const classes = useStyles();
	const [suppliers, setSuppliers] = useState([]);
	const [selectedSupplier, setSelectedSupplier] = useState(null);
	const [formData, setFormData] = useState({
		s_name: '',
		s_phone: '',
		s_email: '',
		s_address: '',
	});

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const fetchSuppliers = async () => {
		const fetchedSuppliers = await getSuppliers();
		setSuppliers(fetchedSuppliers);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedSupplier) {
			await updateSupplier(selectedSupplier.s_id, formData);
		} else {
			await addSupplier(formData);
		}
		setFormData({ s_name: '', s_phone: '', s_email: '', s_address: '' });
		setSelectedSupplier(null);
		fetchSuppliers();
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
		<Container>
			<Typography variant='h4' gutterBottom className={classes.title}>
				Supplier Management
			</Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
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
				<Button variant='contained' color='primary' type='submit'>
					{selectedSupplier ? 'Update' : 'Add'} Supplier
				</Button>
			</form>
			<Typography variant='h5' gutterBottom>
				Supplier List
			</Typography>
			<List>
				{suppliers.map((supplier) => (
					<ListItem key={supplier.s_id}>
						<ListItemText
							primary={supplier.s_name}
							secondary={`${supplier.s_phone} - ${supplier.s_email} - ${supplier.s_address}`}
						/>
						<ListItemSecondaryAction>
							<IconButton edge='end' onClick={() => handleEdit(supplier)}>
								<EditIcon />
							</IconButton>
							<IconButton
								edge='end'
								onClick={() => handleDelete(supplier.s_id)}
							>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
		</Container>
	);
};

export default SupplierManagement;