import { useState } from 'react';
import './App.css';
import UserAuthentication from './components/UserAuthentication';
import Dashboard from './components/Dashboard';

function App() {
	return (
		<div>
			<UserAuthentication />
			<Dashboard />
		</div>
	);
}

export default App;
