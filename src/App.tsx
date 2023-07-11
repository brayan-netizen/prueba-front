import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import User from './components/User';
import Dashboard from './components/Dashboard';
import { Navigate } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const App: React.FC = () => {
	const client = new ApolloClient({
		uri: 'http://localhost:4000/graphql',
		cache: new InMemoryCache()
	});

	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route path='/' element={<Navigate to='/login' />} />
					<Route path='/login' element={<Login />} />
					<Route path='/user' element={<User />} />
					<Route path='/dashboard' element={<Dashboard />} />
					{/* <Route element={NotFound} /> */}
				</Routes>
			</Router>
		</ApolloProvider>
	);
};

export default App;
