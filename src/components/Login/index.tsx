import React, { useState } from 'react';
// import './App.css';
import Box from '@vtex/styleguide/lib/Box';
import Input from '@vtex/styleguide/lib/Input';
import Button from '@vtex/styleguide/lib/Button';
import bcrypt from 'bcryptjs';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	// const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleLogin = async (event: { preventDefault: () => void }) => {
		console.log('i');
		event.preventDefault();
		try {
			// const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña antes de enviarla
			// console.log(hashedPassword);
			const config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://localhost:4000/login',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					email: email,
					pwd: password
				}
			};
			const response = await axios(config);

			const token = response.data.token;
			localStorage.setItem('token', token);
			return <Navigate to='/dashboard' />;
		} catch (error) {
			console.error(error);
			setError('Error al iniciar sesión. Verifica tus credenciales.');
		}
	};

	const geToken = localStorage.getItem('token');

	if (geToken || geToken === null) return <Navigate to='/dashboard' />;
	return (
		<>
			<div className='w-100 h-100 bg-muted-5 pa8 flex justify-center'>
				<form className='w-50' onSubmit={handleLogin}>
					<Box>
						<div className='mb5 w-100 flex justify-center'>
							<img
								src='https://offcorss.vteximg.com.br/arquivos/Logo-Offcorss-Its-Cool.gif'
								alt='Logo offcors'
							/>
						</div>
						<div className='mb5'>
							<Input
								required={true}
								type='email'
								placeholder='EMAIL'
								label='EMAIL'
								onChange={(e: any) => setEmail(e.target.value)}
							/>
						</div>
						<div className='mb5'>
							<Input
								required={true}
								minLength='5'
								type='password'
								label='PASSWORD'
								onChange={(e: any) =>
									setPassword(e.target.value)
								}
							/>
						</div>
						<div className='flex justify-center mt4'>
							<Button variation='primary' type='submit'>
								Login
							</Button>
						</div>
					</Box>
				</form>
			</div>
		</>
	);
};

export default Login;
