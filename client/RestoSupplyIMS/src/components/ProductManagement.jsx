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
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productAPI';

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

const ProductManagement = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    p_name: '',
    p_description: '',
    p_price: '',
  });

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

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({ ...product });
  };

  return (
    <Container>
      <Typography variant='h4' gutterBottom className={classes.title}>
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label='Product Name'
          value={formData.p_name}
          onChange={(e) => setFormData({ ...formData, p_name: e.target.value })}
        />
        <TextField
          label='Description'
          value={formData.p_description}
          onChange={(e) => setFormData({ ...formData, p_description: e.target.value })}
        />
        <TextField
          label='Price'
          value={formData.p_price}
          onChange={(e) => setFormData({ ...formData, p_price: e.target.value })}
        />
        <Button variant='contained' color='primary' type='submit'>
          {selectedProduct ? 'Update' : 'Add'} Product
        </Button>
      </form>
      <Typography variant='h5' gutterBottom>
        Product List
      </Typography>
      <List>
        {products.map((product) => (
          <ListItem key={product.p_id}>
            <ListItemText
              primary={product.p_name}
              secondary={`${product.p_name} -- $${product.p_price}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge='end' onClick={() => handleEdit(product)}>
                <EditIcon />
              </IconButton>
              <IconButton edge='end' onClick={() => handleDelete(product.p_id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProductManagement;