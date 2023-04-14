import React, { useState } from 'react';
import {
	Container,
	Typography,
	TextField,
	Button,
	Box,
	Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../images/background.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100vw',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		marginBottom: theme.spacing(4),
		height: theme.spacing(24),
		width: theme.spacing(24),
		fontSize: theme.typography.pxToRem(24),
		position: 'absolute',
		top: '22%',
		transform: 'translateY(-50%)',
		zIndex: 0,
	},
	title: {
		marginBottom: theme.spacing(2),
		color: theme.palette.primary.main,
	},
	box: {
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		borderRadius: theme.spacing(3),
		paddingTop: theme.spacing(6),
		paddingBottom: theme.spacing(6),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		marginTop: theme.spacing(10),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '25%',
		position: 'relative',
		zIndex: 999,
		[theme.breakpoints.down('sm')]: {
			width: '50%',
		},
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
	textField: {
		fontFamily: 'Roboto',
		marginBottom: theme.spacing(1),
	},
	button: {
		fontFamily: 'Roboto',
		paddingTop: theme.spacing(1.2),
		marginTop: theme.spacing(2),
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
				navigate('/dashboard');
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
		<Container maxWidth={false} disableGutters className={classes.root}>
			<Avatar className={classes.avatar}></Avatar>
			<Box className={classes.box}>
				<Typography variant='h4' className={classes.title}>
				</Typography>
				<form onSubmit={handleLogin} className={classes.form}>
					<TextField
						label='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className={classes.textField}
					/>
					<TextField
						label='Password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className={classes.textField}
					/>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						className={classes.button}
					>
						Login
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default UserAuthentication;
