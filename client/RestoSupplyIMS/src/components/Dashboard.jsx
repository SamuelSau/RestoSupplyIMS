import React from 'react';
import SupplierManagement from './SupplierManagement';
import CustomerManagement from './CustomerManagement';
import { Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	title: {
		color: 'black',
		textAlign: 'center',
		fontFamily: 'Roboto',
	},
	dashboard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(4),
	},
	dashboardContent: {
		marginTop: theme.spacing(4),
	},
}));

const Dashboard = () => {
	const classes = useStyles();

	return (
		<Container>
			<Box className={classes.dashboard}>
				<Typography variant='h3' component='h1' className={classes.title}>
					Welcome to the Restaurant Inventory Management System
				</Typography>
				<Box className={classes.dashboardContent}>
					<SupplierManagement />
					{<CustomerManagement />}
					{/*<ProductManagement />*/}
					{/*<OrderManagement />*/}
					{/*<InventoryManagement />*/}
				</Box>
			</Box>
		</Container>
	);
};

export default Dashboard;
