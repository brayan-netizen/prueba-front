import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Input from '@vtex/styleguide/lib/Input';
import Button from '@vtex/styleguide/lib/Button';
import Layout from '@vtex/styleguide/lib/Layout';
import PageHeader from '@vtex/styleguide/lib/PageHeader';
import PageBlock from '@vtex/styleguide/lib/PageBlock';
import { ToastConsumer } from '@vtex/styleguide/lib/ToastProvider';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';

import { useAuth } from '../auth/AuthProvider';
import { GET_USER_ID, MUTATION_USER_UPDATE } from '../graphql/user';
import { useLazyQuery, useMutation } from '@apollo/client';

interface IUser {
	name?: string;
	lastName?: string;
	email?: string;
	newPassword?: string;
	confirmPassword?: string;
}

const UserProfileEdit = ({
	showToast,
	userId
}: {
	showToast: any;
	userId?: string;
}) => {
	const [form, setForm] = useState<IUser>();

	const [errors, setErrors] = useState({
		name: '',
		lastName: '',
		email: '',
		newPassword: '',
		confirmPassword: ''
	});

	const [userUpdateMutation] = useMutation(MUTATION_USER_UPDATE);
	const [getUserById, { data: { user } = { user: {} } }] =
		useLazyQuery(GET_USER_ID);

	const data = useMemo(() => {
		return {
			...user,
			...form
		};
	}, [form, user]);

	const roles = useMemo(
		() =>
			user?.roles?.map(
				({ id, name }: { id?: string; name?: string }) => ({
					label: name,
					velue: id
				})
			),
		[user?.roles]
	);

	const validate = useCallback(async () => {
		const newErrors = {
			name: '',
			lastName: '',
			email: '',
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		};

		let valid = true;

		const valData: any =
			Object.fromEntries(
				Object.entries(data || {}).filter(([_, value]) => {
					return !(typeof value === 'string' && value.length === 0);
				})
			) || {};

		if (!valData?.name?.trim()) {
			newErrors.name = 'First name is required';
			valid = false;
		}

		if (!valData?.lastName?.trim()) {
			newErrors.lastName = 'Last name is required';
			valid = false;
		}

		if (!valData?.email?.trim()) {
			newErrors.email = 'Email is required';
			valid = false;
		} else if (!/\S+@\S+\.\S+/.test(valData?.email || '')) {
			newErrors.email = 'Invalid email address';
			valid = false;
		}

		const wantsToChangePassword =
			valData?.newPassword || valData?.confirmPassword;

		if (wantsToChangePassword) {
			if (!valData?.newPassword || valData?.newPassword?.length < 6) {
				newErrors.newPassword =
					'New password must be at least 6 characters';
				valid = false;
			}

			if (valData?.newPassword !== valData?.confirmPassword) {
				newErrors.confirmPassword = 'Passwords do not match';
				valid = false;
			}
		}

		setErrors(newErrors);
		return valid;
	}, [data]);

	const handleSubmit = useCallback(async () => {
		if (!validate() || !userId || !(Object.keys(form || {}).length > 0))
			return;

		try {
			const valData: any =
				Object.fromEntries(
					Object.entries(data || {}).filter(([_, value]) => {
						return !(
							typeof value === 'string' && value.length === 0
						);
					})
				) || {};

			const { data: resp } = await userUpdateMutation({
				variables: {
					id: userId,
					email: valData?.email,
					password: valData?.newPassword,
					name: valData?.name,
					lastName: valData?.lastName
				}
			});

			if (resp) {
				setForm(undefined);
				if (userId) {
					getUserById({
						fetchPolicy: 'network-only',
						variables: { id: userId }
					});
				}
				showToast({
					message: 'Profile updated successfully',
					duration: 3000
				});
			}
		} catch (error) {
			showToast({
				message: 'Profile updated error',
				duration: 3000
			});
		}
	}, [
		data,
		form,
		getUserById,
		showToast,
		userId,
		userUpdateMutation,
		validate
	]);

	useEffect(() => {
		if (userId) {
			getUserById({
				variables: { id: userId }
			});
		}
	}, [getUserById, userId]);

	console.log(data);

	return (
		<Layout fullWidth pageHeader={<PageHeader title='Edit Profile' />}>
			<PageBlock variation='full'>
				<div className='mb4'>
					<Input label='Username' value={data?.username} disabled />
				</div>

				<div className='mb4'>
					<Input
						label='Created At'
						value={data?.createDate}
						disabled
					/>
				</div>

				<div className='mb4'>
					<Select
						multi={true}
						label='Rol'
						value={roles}
						searchable={false}
						disabled={true}
						options={roles}
					/>
				</div>

				<div className='mb4'>
					<Input
						label='First Name'
						value={form?.name || data?.name}
						error={!!errors.name}
						errorMessage={errors.name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setForm({ ...form, name: e.target.value })
						}
					/>
				</div>

				<div className='mb4'>
					<Input
						label='Last Name'
						value={data?.lastName}
						error={!!errors.lastName}
						errorMessage={errors.lastName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setForm({ ...form, lastName: e.target.value })
						}
					/>
				</div>

				<div className='mb4'>
					<Input
						label='Email'
						value={data?.email}
						error={!!errors.email}
						errorMessage={errors.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setForm({ ...form, email: e.target.value })
						}
					/>
				</div>

				<h2 className='f5 mt6 mb3'>Change Password (optional)</h2>

				<div className='mb4'>
					<Input
						label='New Password'
						type='password'
						value={data?.newPassword}
						error={!!errors.newPassword}
						errorMessage={errors.newPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setForm({ ...form, newPassword: e.target.value })
						}
					/>
				</div>

				<div className='mb5'>
					<Input
						label='Confirm New Password'
						type='password'
						value={data?.confirmPassword}
						error={!!errors.confirmPassword}
						errorMessage={errors.confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setForm({
								...form,
								confirmPassword: e.target.value
							})
						}
					/>
				</div>

				<Button variation='primary' onClick={handleSubmit}>
					Save Changes
				</Button>
			</PageBlock>
		</Layout>
	);
};

const EditUser = () => {
	const { user } = useAuth();

	return (
		<ToastConsumer>
			{({ showToast }: any) => (
				<UserProfileEdit showToast={showToast} userId={user?.id} />
			)}
		</ToastConsumer>
	);
};

export default EditUser;
