import React, { useState, useEffect } from 'react';
import {
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} from '../api/userAPI';
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

const useStyles = makeStyles((theme) => ({
	title:{
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

const UserManagement = () => {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [formData, setFormData] = useState({
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
		const fetchedUsers = await getUsers();
		setUsers(fetchedUsers);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (selectedUser) {
			await updateUser(selectedUser.u_id, formData);
		} else {
			await createUser(formData);
		}
		setFormData({
			u_email: '',
			u_password: '',
			first_name: '',
			last_name: '',
			job_title: '',
		});
		setSelectedUser(null);
		fetchUsers();
	};

	const handleDelete = async (id) => {
		await deleteUser(id);
		fetchUsers();
	};

	const handleEdit = (user) => {
		setSelectedUser(user);
		setFormData({ ...user });
	};

	return (
		<Container>
			<Typography variant='h4' gutterBottom className={classes.title}>
			</Typography>
			<form onSubmit={handleSubmit} className={classes.form}>
				<TextField
					label='Email'
					value={formData.u_email}
					onChange={(e) =>
						setFormData({ ...formData, u_email: e.target.value })
					}
				/>
				<TextField
					label='Password'
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
				<Button variant='contained' color='primary' type='submit'>
					{selectedUser ? 'Update' : 'Add'} User
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
							<IconButton edge='end' onClick={() => handleDelete(user.u_id)}>
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
