import React, { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';

import Input from '@vtex/styleguide/lib/Input';
import Button from '@vtex/styleguide/lib/Button';
import { ToastConsumer } from '@vtex/styleguide/lib/ToastProvider';

import { LOGIN_MUTATION } from '../graphql/login';
import { setSession } from '../auth/auth';

const LoginForm = ({ showToast = () => {} }: { showToast: any }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({ email: '', password: '' });

	const [loginMutation] = useMutation(LOGIN_MUTATION);

	const validate = useCallback(() => {
		let valid = true;
		const newErrors = { email: '', password: '' };

		if (!email) {
			newErrors.email = 'El correo es obligatorio';
			valid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newErrors.email = 'Correo no válido';
			valid = false;
		}

		if (!password) {
			newErrors.password = 'La contraseña es obligatoria';
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	}, [email, password]);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!validate()) return;

			try {
				const { data } = await loginMutation({
					variables: { email, password }
				});

				const { token, user } = data.login;

				setSession(token, user);
				showToast({
					message: 'Inicio de sesión exitoso',
					duration: 3000
				});
				window.location.href = '/';
			} catch (err) {
				showToast({
					message: 'Error en login',
					duration: 3000,
					type: 'error'
				});
			}
		},
		[email, loginMutation, password, showToast, validate]
	);

	return (
		<div className='vh-100 flex items-center justify-center bg-light-gray'>
			<form
				onSubmit={handleSubmit}
				className='bg-white pa4 br3 shadow-1 w-100 mw6'
			>
				<h2 className='f3 tc mb4'>Iniciar sesión</h2>
				<div className='pv5 mv5 w-100 flex flex-column items-center'>
					<img
						src='https://offcorss.vtexassets.com/arquivos/header__logo-offcorss.png'
						alt='Logo'
						className='w5'
					/>
				</div>
				<div className='mb3'>
					<Input
						label='Correo electrónico'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						errorMessage={errors.email}
						error={!!errors.email}
						placeholder='ejemplo@correo.com'
					/>
				</div>

				<div className='mb4'>
					<Input
						label='Contraseña'
						type='password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						errorMessage={errors.password}
						error={!!errors.password}
						placeholder='••••••••'
					/>
				</div>

				<div className='w-100 mv5 pv5 button-login'>
					<Button type='submit' variation='primary' block>
						Iniciar sesión
					</Button>
				</div>
			</form>
		</div>
	);
};

const Login = () => (
	<ToastConsumer>
		{({ showToast }: any) => <LoginForm showToast={showToast} />}
	</ToastConsumer>
);

export default Login;
