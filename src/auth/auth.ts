import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
	exp: number;
	[key: string]: any;
}

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || '';

const USER_KEY = process.env.REACT_APP_USER_KEY || '';

export const setSession = (token: string, user: any) => {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getToken = (): string | null => {
	return localStorage.getItem(TOKEN_KEY);
};

export const getUser = (): any => {
	const user = localStorage.getItem(USER_KEY);
	return user ? JSON.parse(user) : null;
};

export const clearSession = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
	const token = getToken();
	if (!token) return false;

	try {
		const decoded: TokenPayload = jwtDecode(token);
		const now = Date.now() / 1000;
		return decoded.exp > now;
	} catch {
		return false;
	}
};
