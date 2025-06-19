import { useHistory } from 'react-router-dom';

const NotFound = () => {
	const history = useHistory();

	const goHome = () => {
		history.push('/');
	};

	return (
		<div className='vh-100 flex flex-column items-center justify-center bg-light-gray pa4 tc'>
			<h1 className='f2 dark-red mb3'>404 - Page Not Found</h1>
			<p className='mb4'>
				Sorry, the page you are looking for doesn't exist.
			</p>
			<button
				onClick={goHome}
				className='pointer dim bg-black-90 white pv2 ph3 br2 bn'
			>
				Go Home
			</button>
		</div>
	);
};

export default NotFound;
