import React, { useState } from 'react';
import {
	Container,
	Typography,
	TextField,
	Button,
	
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	title: {
		color: 'black', // Set the text color to black
	  },
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(4),
		marginBottom: theme.spacing(10),
		width: '100%',
	},
	textField: {
		fontSize: '2rem', // Increase the font size of the text fields
	  },
}));

const UserAuthentication = ({ onLoginSuccess }) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);

	const handleLogin = async (e) => {
	  e.preventDefault();
	  try {
		const response = await fetch('http://127.0.0.1:3001/api/login', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ email, password }),
		});
  
		if (response.ok) {
		  const userData = await response.json();
		  setSelectedUser(userData);
		  console.log('Login successful!');
		  onLoginSuccess(); // Call the passed function to set isLoggedIn to true
		  navigate('/dashboard')
		} else {
		  let errorMessage = response.statusText;
		  const contentType = response.headers.get('content-type');
		  if (contentType && contentType.includes('application/json')) {
			const errorData = await response.json();
			errorMessage = errorData.message || errorMessage;
		  }
		  console.log('Login failed:', errorMessage);
		}
	  } catch (error) {
		console.error('Error during login:', error);
	  }
	};
  
	return (
	  <Container>
		<Typography variant='h4' gutterBottom className={classes.title}>
		  User Authentication
		</Typography>
		<form onSubmit={handleLogin} className={classes.form}>
		  <TextField
			label='Email'
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		  <TextField
			label='Password'
			type='password'
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
		  />
		  <Button type='submit' variant='contained' color='secondary'>
			Login
		  </Button>
		</form>
		{/* Other form and UI code */}
	  </Container>
	);
  };

export default UserAuthentication;