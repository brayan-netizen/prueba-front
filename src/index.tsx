import ReactDOM from 'react-dom';
import 'vtex-tachyons';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { setContext } from '@apollo/client/link/context';
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache
} from '@apollo/client';
import { getToken } from './auth/auth';

const rootElement = document.getElementById('root');

// URL de tu servidor GraphQL
const httpLink = createHttpLink({
	uri: process.env.REACT_APP_API_GRAPHQL
});

// authLink para incluir el token en headers
const authLink = setContext((_, { headers }) => {
	const token = getToken();
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : ''
		}
	};
});

// Cliente Apollo completo
export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
