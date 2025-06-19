import React, { ReactNode } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TableProducts from './components/TableProducts';
import Header from './components/Header';
import './index.css';
import Login from './components/Login';

import { ToastProvider } from '@vtex/styleguide/lib/ToastProvider';
import UserList from './components/UsersList';
import EditUser from './components/EditUser';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './auth/AuthProvider';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const Base = ({ children }: { children?: ReactNode }) => (
	<>
		<Header />
		{children}
	</>
);

export const App: React.FC = () => {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<PrivateRoute
						exact
						path='/'
						component={() => (
							<Base>
								<TableProducts />
							</Base>
						)}
					/>
					<PrivateRoute
						exact
						path='/users'
						component={() => (
							<Base>
								<UserList />
							</Base>
						)}
					/>
					<PrivateRoute
						exact
						path='/edit-profile'
						component={() => (
							<Base>
								<EditUser />
							</Base>
						)}
					/>
					<Route
						exact
						path='/login'
						component={() => (
							<ToastProvider>
								<Login />
							</ToastProvider>
						)}
					/>
					<Route component={() => <NotFound />} />
				</Switch>
			</Router>
			<Footer />
		</AuthProvider>
	);
};

export default App;
