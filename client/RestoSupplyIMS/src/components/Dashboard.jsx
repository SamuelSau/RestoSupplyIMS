import React from 'react';
import SupplierManagement from './SupplierManagement';
//import ProductManagement from './ProductManagement';
//import OrderManagement from './OrderManagement';
//import CustomerManagement from './CustomerManagement';

const Dashboard = () => {
	return (
		<div className='dashboard'>
			<h1>Welcome to the Restaurant Inventory Management System</h1>
			<div className='dashboard-content'>
				<SupplierManagement />
				{/*<ProductManagement />*/}
				{/*<OrderManagement />*/}
				{/*<InventoryManagement />*/}
				{/*<CustomerManagement />*/}
			</div>
		</div>
	);
};

export default Dashboard;
