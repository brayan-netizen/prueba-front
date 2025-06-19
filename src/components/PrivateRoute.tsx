import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../auth/auth';

const PrivateRoute: React.FC<RouteProps> = ({
	component: Component,
	...rest
}) => {
	if (!Component) return null;

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
};

export default PrivateRoute;
