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
  getCustomer,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../api/customerAPI';

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

const CustomerManagement = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    c_name: '',
    c_phone: '',
    c_email: '',
    c_address: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const fetchedCustomers = await getCustomers();
    setCustomers(fetchedCustomers);
  };

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

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setFormData({ ...customer });
  };

  return (
    <Container>
      <Typography variant='h4' gutterBottom className={classes.title}>
        Customer Management
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          label='Customer Name'
          value={formData.c_name}
          onChange={(e) => setFormData({ ...formData, c_name: e.target.value })}
        />
        <TextField
          label='Phone'
          value={formData.c_phone}
          onChange={(e) => setFormData({ ...formData, c_phone: e.target.value })}
        />
        <TextField
          label='Email'
          value={formData.c_email}
          onChange={(e) => setFormData({ ...formData, c_email: e.target.value })}
        />
        <TextField
          label='Address'
          value={formData.c_address}
          onChange={(e) => setFormData({ ...formData, c_address: e.target.value })}
        />
        <Button variant='contained' color='primary' type='submit'>
          {selectedCustomer ? 'Update' : 'Add'} Customer
        </Button>
      </form>
      <Typography variant='h5' gutterBottom>
        Customer List
      </Typography>
      <List>
        {customers.map((customer) => (
          <ListItem key={customer.c_id}>
            <ListItemText
              primary={customer.c_name}
              secondary={`${customer.c_phone} - ${customer.c_email} - ${customer.c_address}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge='end'
              onClick={() => handleEdit(customer)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge='end'
              onClick={() => handleDelete(customer.c_id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Container>
);};

export default CustomerManagement;
