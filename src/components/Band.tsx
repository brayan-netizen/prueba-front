import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Band = () => {
	const location = useLocation();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fade, setFade] = useState(true);

	const messages = [
		{ path: '*', text: '¡Bienvenido a la página!' },
		{
			path: '/',
			text: 'Click en la imagen del producto para ver todas las especificaciones'
		},
		{
			path: '/',
			text: 'Puedes filtrar en el buscador por nombre, productos, referencia…'
		},
		{ path: '/users', text: 'Administra usuarios desde este panel' },
		{ path: '/edit-profile', text: 'Actualiza tus datos desde este panel' },
		{ path: '*', text: 'El icono de login contiene más opciones' }
	];

	const visibleMessages = messages.filter(
		(msg) => msg.path === location.pathname || msg.path === '*'
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setCurrentIndex((prev) => (prev + 1) % visibleMessages.length);
				setFade(true);
			}, 300); // debe ser igual a la duración de animación
		}, 5000);

		return () => clearInterval(interval);
	}, [visibleMessages.length]);

	if (!visibleMessages.length) return null;

	return (
		<div className='bg-black-90 pa2 tc w-100 overflow-hidden'>
			<div
				className={`transition-text ${
					fade ? 'fade-in' : 'fade-out'
				} f6 dark-gray b tracked`}
			>
				{visibleMessages[currentIndex].text}
			</div>
		</div>
	);
};

export default Band;
