import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUser, getToken, clearSession } from './auth';

interface AuthContextType {
	user: any;
	token: string | null;
	isAuthenticated: boolean;
	logout: () => void;
	setSessionData: (token: string, user: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = getToken();
		const storedUser = getUser();
		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(storedUser);
		}
	}, []);

	const logout = () => {
		clearSession();
		setUser(null);
		setToken(null);
		window?.location?.reload();
	};

	const setSessionData = (token: string, user: any) => {
		setToken(token);
		setUser(user);
	};

	const isAuthenticated = !!token;

	return (
		<AuthContext.Provider
			value={{ user, token, isAuthenticated, logout, setSessionData }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
