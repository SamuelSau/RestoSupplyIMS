import React, { useState, useEffect } from 'react';
import userAPI from '../api/userAPI';
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
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: theme.spacing(2),
		marginBottom: theme.spacing(4),
	},
}));

const UserManagement = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [users, setUsers] = useState([]);
	const [password, setPassword] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [formData, setFormData] = useState({
		u_email: '',
		u_password: '',
		first_name: '',
		last_name: '',
		job_title: '',
	});
	const [createFormData, setCreateFormData] = useState({
		u_email: '',
		u_password: '',
		first_name: '',
		last_name: '',
		job_title: '',
	});

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const fetchedUsers = await userAPI.getUsers();
		setUsers(fetchedUsers);
	};

	const handleEdit = (user) => {
		setSelectedUser(user);
		setFormData({
			u_email: user.u_email,
			u_password: user.u_password,
			first_name: user.first_name,
			last_name: user.last_name,
			job_title: user.job_title,
		});
	};

	const handleEditSubmit = (e) => {
		e.preventDefault();
		handleUpdateUser(selectedUser);
	};

	const handleCreateUser = async (newUserData) => {
		try {
			const newUser = await userAPI.createUser(newUserData);
			console.log('User created:', newUser);
		} catch (error) {
			console.error('Error creating user:', error);
		}
	};

	const handleCreateSubmit = (e) => {
		e.preventDefault();
		handleCreateUser(createFormData);
		// Reset form data if necessary
		setCreateFormData({
			u_email: '',
			u_password: '',
			first_name: '',
			last_name: '',
			job_title: '',
		});
	};

	const handleGetUser = async (user) => {
		const userId = user.u_id;
		try {
			const fetchedUser = await userAPI.getUser(userId);
			console.log('Fetched user:', fetchedUser);
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	const handleUpdateUser = async (user) => {
		const userId = user.u_id;

		// Example user data for updating an existing user
		const updatedUserData = {
			first_name: 'Updated',
			last_name: 'User',
			job_title: '1',
		};

		try {
			const updatedUser = await userAPI.updateUser(userId, updatedUserData);
			console.log('User updated:', updatedUser);
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	const handleDeleteUser = async (user) => {
		const userId = user.u_id;
		try {
			await userAPI.deleteUser(userId);
			console.log('User deleted');
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	};

	return (
        <Container>
			<form onSubmit={handleCreateSubmit} className={classes.form}>
				<TextField
					label='Email'
					value={createFormData.u_email}
					onChange={(e) =>
						setCreateFormData({ ...createFormData, u_email: e.target.value })
					}
					required
				/>
				<TextField
					label='Password'
					type='password'
					value={createFormData.u_password}
					onChange={(e) =>
						setCreateFormData({ ...createFormData, u_password: e.target.value })
					}
					required
				/>
				<TextField
					label='First Name'
					value={createFormData.first_name}
					onChange={(e) =>
						setCreateFormData({ ...createFormData, first_name: e.target.value })
					}
					required
				/>
				<TextField
					label='Last Name'
					value={createFormData.last_name}
					onChange={(e) =>
						setCreateFormData({ ...createFormData, last_name: e.target.value })
					}
				/>
				<TextField
					label='Job Title'
					value={createFormData.job_title}
					onChange={(e) =>
						setCreateFormData({ ...createFormData, job_title: e.target.value })
					}
					required
				/>
				<Button type='submit' variant='contained' color='primary'>
					Add User
				</Button>
			</form>
			<form onSubmit={handleEditSubmit} className={classes.form}>
				<TextField
					label='Email'
					value={formData.u_email}
					onChange={(e) =>
						setFormData({ ...formData, u_email: e.target.value })
					}
				/>
				<TextField
					label='Password'
					type='password'
					value={formData.u_password}
					onChange={(e) =>
						setFormData({ ...formData, u_password: e.target.value })
					}
				/>
				<TextField
					label='First Name'
					value={formData.first_name}
					onChange={(e) =>
						setFormData({ ...formData, first_name: e.target.value })
					}
				/>
				<TextField
					label='Last Name'
					value={formData.last_name}
					onChange={(e) =>
						setFormData({ ...formData, last_name: e.target.value })
					}
				/>
				<TextField
					label='Job Title'
					value={formData.job_title}
					onChange={(e) =>
						setFormData({ ...formData, job_title: e.target.value })
					}
				/>
				<Button type='submit' variant='contained' color='primary'>
					Update User
				</Button>
			</form>
			<Typography variant='h5' gutterBottom>
				User List
			</Typography>
			<List>
				{users.map((user) => (
					<ListItem key={user.u_id}>
						<ListItemText
							primary={`${user.first_name} ${user.last_name}`}
							secondary={`${user.u_email} - ${user.job_title}`}
						/>
						<ListItemSecondaryAction>
							<IconButton edge='end' onClick={() => handleEdit(user)}>
								<EditIcon />
							</IconButton>
							<IconButton
								edge='end'
								onClick={() => handleDeleteUser(user.u_id)}
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

export default UserManagement;
