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
	getUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser,
} from '../api/userAPI';

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

	const columns = [
		{ field: 'u_email', headerName: 'Email' },
		{ field: 'first_name', headerName: 'First Name' },
		{ field: 'last_name', headerName: 'Last Name' },
		{ field: 'job_title', headerName: 'Job Title' },
	];

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

	const handleCancel = () => {
		setFormData({
			u_email: '',
			u_password: '',
			first_name: '',
			last_name: '',
			job_title: '',
		});
		setSelectedUser(null);
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
		<Container className={classes.root}>
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
				<div className={classes.buttonGroup}>
				<Button variant='contained' color='primary' type='submit' className={classes.addButton}>
					{selectedUser ? 'Update' : 'Add'} User
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
					{users.map((user) => (
						<TableRow key={user.u_id}>
							{columns.map((column) => (
								<TableCell key={column.field}>{user[column.field]}</TableCell>
							))}
							<TableCell>
								<IconButton edge='end' onClick={() => handleEdit(user)}>
									<EditIcon />
								</IconButton>
								<IconButton edge='end' onClick={() => handleDelete(user.u_id)}>
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

export default UserManagement;
