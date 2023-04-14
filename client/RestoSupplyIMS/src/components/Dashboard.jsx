import React, { useState } from 'react';
import SupplierManagement from './SupplierManagement';
import CustomerManagement from './CustomerManagement';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import {
	Container,
	Typography,
	Box,
	AppBar,
	Tab,
	Tabs,
	TextField,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100vw',
		minHeight: '100vh',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundImage: 'linear-gradient(160deg, #202123, #343541, #40414f)',
	},
	title: {
		color: 'black',
		textAlign: 'center',
	},
	dashboard: {
		margin: theme.spacing(10),
		backgroundColor: 'rgba(255, 255, 255)',
	},
	dashboardContent: {
		marginTop: theme.spacing(2),
	},
	searchBar: {
		marginBottom: theme.spacing(1),
		borderRadius: theme.spacing(1),
	},
	formFields: {
		marginBottom: theme.spacing(1),
	},
	buttons: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginLeft: theme.spacing(2),
	},
	contentContainer: {
		backgroundColor: '#fff',
		padding: theme.spacing(2),
		borderRadius: theme.spacing(1),
	},
	appBar: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.spacing(1),
	},
	tabs: {
		display: 'flex',
		justifyContent: 'space-around',
		borderBottom: `${theme.palette.divider}`,
	},
	tab: {
		minWidth: 'auto',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	container: {
		marginTop: theme.spacing(2),
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	const [activeTab, setActiveTab] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	const getContent = () => {
		switch (activeTab) {
			case 0:
				return <CustomerManagement searchQuery={searchQuery} />;
			case 1:
				return <SupplierManagement searchQuery={searchQuery}/>;
			case 2:
				return <OrderManagement searchQuery={searchQuery}/>;
			case 3:
				return <ProductManagement searchQuery={searchQuery}/>;
			case 4:
				return <UserManagement searchQuery={searchQuery}/>;
			default:
				return null;
		}
	};

	return (
		<Container maxWidth={false} disableGutters className={classes.root}>
			<Box className={classes.dashboard}>
				<Typography
					variant='h3'
					component='h1'
					className={classes.title}
				></Typography>
				<Box className={classes.dashboardContent}>
					<Container maxWidth='xl' className={classes.contentContainer}>
						<AppBar
							position='static'
							color='default'
							className={classes.appBar}
						>
							<Tabs
								value={activeTab}
								onChange={handleTabChange}
								indicatorColor='primary'
								textColor='primary'
								variant='fullWidth'
								className={classes.tabs}
							>
								<Tab label='Customers' className={classes.tab} />
								<Tab label='Suppliers' className={classes.tab} />
								<Tab label='Orders' className={classes.tab} />
								<Tab label='Products' className={classes.tab} />
								<Tab label='Users' className={classes.tab} />
							</Tabs>
						</AppBar>
						<Container className={classes.container}>
							<TextField
								fullWidth
								className={classes.searchBar}
								label='Search'
								variant='outlined'
								onChange={(e) => setSearchQuery(e.target.value)}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton>
												<SearchIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Container>
						{getContent()}
					</Container>
				</Box>
			</Box>
		</Container>
	);
};

export default Dashboard;
