import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserAuthentication from './components/UserAuthentication';
import Dashboard from './components/Dashboard';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLoginSuccess = () => {
		setIsLoggedIn(true);
	};

	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route
						path='/'
						element={<UserAuthentication onLoginSuccess={handleLoginSuccess} />}
					/>
					<Route
						path='/dashboard'
						element={
							isLoggedIn ? (
								<Dashboard />
							) : (
								<UserAuthentication onLoginSuccess={handleLoginSuccess} />
							)
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
