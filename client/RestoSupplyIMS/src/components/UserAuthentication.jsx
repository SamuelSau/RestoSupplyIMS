import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import '../styles/UserAuthentication.css';

const UserAuthentication = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
				// Handle successful login (e.g., redirect to a different page, store user data, etc.)
				console.log('Login successful!');
			} else {
        let errorMessage = response.statusText;
        // Check if the response has a JSON content type
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          // Extract the error message from the server response
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
		<div>
			<div className='login'>
				<Typography variant='h4' gutterBottom>
					Login
				</Typography>
			</div>
			<form onSubmit={handleLogin}>
				<TextField
					label='Email'
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					margin='normal'
					required
				/>
				<TextField
					label='Password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					margin='normal'
					required
				/>
				<Button type='submit' variant='contained' color='secondary'>
					Login
				</Button>
			</form>
		</div>
	);
};

export default UserAuthentication;
