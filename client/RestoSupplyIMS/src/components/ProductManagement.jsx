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
	getProduct,
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../api/productAPI';

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

const ProductManagement = ({ searchQuery }) => {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [formData, setFormData] = useState({
		p_id: '',
		p_name: '',
		p_supp_id: '',
		p_price: '',
		p_quantity: '',
	});

	const columns = [
		{ field: 'p_id', headerName: 'Price ID' },
		{ field: 'p_name', headerName: 'Price Name' },
		{ field: 'p_supp_id', headerName: 'Price Supplier ID' },
		{ field: 'p_price', headerName: 'Price Price' },
		{ field: 'p_quantity', headerName: 'Product Quantity' },
	];

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const fetchedProducts = await getProducts();
		setProducts(fetchedProducts);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedProduct) {
			await updateProduct(selectedProduct.p_id, formData);
		} else {
			await createProduct(formData);
		}
		setFormData({ p_name: '', p_description: '', p_price: '' });
		setSelectedProduct(null);
		fetchProducts();
	};

	const filteredProducts = products.filter((product) => {
		return (
			product.p_id
				.toString()
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			product.p_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.p_supp_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.p_price.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.p_quantity.toString().toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	const handleDelete = async (id) => {
		await deleteProduct(id);
		fetchProducts();
	};

	const handleCancel = () => {
		setFormData({
			p_id: '',
			p_name: '',
			p_supp_id: '',
			p_price: '',
			p_quantity: '',
		});
		setSelectedUser(null);
	};

	const handleEdit = (product) => {
		setSelectedProduct(product);
		setFormData({ ...product });
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
					label='Product ID'
					value={formData.p_id}
					onChange={(e) => setFormData({ ...formData, p_name: e.target.value })}
				/>
				<TextField
					label='Product Name'
					value={formData.p_name}
					onChange={(e) => setFormData({ ...formData, p_name: e.target.value })}
				/>
				<TextField
					label='Product Supplier ID'
					value={formData.p_supp_id}
					onChange={(e) =>
						setFormData({ ...formData, p_supp_id: e.target.value })
					}
				/>
				<TextField
					label='Product Price'
					value={formData.p_price}
					onChange={(e) =>
						setFormData({ ...formData, p_price: e.target.value })
					}
				/>
				<TextField
					label='Product Quantity'
					value={formData.p_quantity}
					onChange={(e) =>
						setFormData({ ...formData, p_quantity: e.target.value })
					}
				/>
				<div className={classes.buttonGroup}>
					<Button
						variant='contained'
						color='inherit'
						type='submit'
						className={classes.addButton}
					>
						{selectedProduct ? 'Update' : 'Add'} Product
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
					{filteredProducts.map((product) => (
						<TableRow key={product.p_id}>
							{columns.map((column) => (
								<TableCell key={column.field}>
									{product[column.field]}
								</TableCell>
							))}
							<TableCell>
								<IconButton edge='end' onClick={() => handleEdit(product)}>
									<EditIcon />
								</IconButton>
								<IconButton
									edge='end'
									onClick={() => handleDelete(product.p_id)}
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

export default ProductManagement;
