import { useEffect, useState } from 'react';

const funcBackg = () => {
	const letrasHex = '0123456789ABCDEF';
	let color = '#';

	for (let i = 0; i < 6; i++) {
		color += letrasHex[Math.floor(Math.random() * 16)];
	}

	return color;
};

const funcColorText = (bg: string) => {
	const r = parseInt(bg.slice(1, 3), 16);
	const g = parseInt(bg.slice(3, 5), 16);
	const b = parseInt(bg.slice(5, 7), 16);
	const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	return luminancia > 0.5 ? '#000000' : '#ffffff';
};

const IconUser = ({ name }: { name: string }) => {
	const [backg, setBackg] = useState<string>('#000');
	const [color, setcolor] = useState<string>('#fff');

	useEffect(() => {
		const backg = funcBackg();
		setBackg(backg);
		setcolor(funcColorText(backg));
	}, []);

	return (
		<span
			className='icon-user b'
			style={{
				color: color,
				backgroundColor: backg
			}}
		>
			{name?.slice(0, 2).toUpperCase()}
		</span>
	);
};

export default IconUser;
