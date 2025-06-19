import React, { useCallback, useEffect, useState } from 'react';

import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import Table from '@vtex/styleguide/lib/Table';
import Button from '@vtex/styleguide/lib/Button';
import ModalDialog from '@vtex/styleguide/lib/ModalDialog';
import Layout from '@vtex/styleguide/lib/Layout';
import PageHeader from '@vtex/styleguide/lib/PageHeader';
import PageBlock from '@vtex/styleguide/lib/PageBlock';
import { ToastConsumer } from '@vtex/styleguide/lib/ToastProvider';
import Input from '@vtex/styleguide/lib/Input';
import Select from '@vtex/styleguide/lib/EXPERIMENTAL_Select';

import {
	GET_USERS,
	MUTATION_USER_ADD,
	MUTATION_USER_DELETE
} from '../graphql/user';
import { GET_ROLES } from '../graphql/rol';

type User = {
	id: string;
	name: string;
	lastName: string;
	username: string;
	email: string;
	createDate: string;
	roles: string[];
};

const UserTable = ({ showToast }: { showToast: any }) => {
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [showAddModal, setShowAddModal] = useState(false);

	const [form, setForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		role: []
	});

	const [formErrors, setFormErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		role: ''
	});

	const [getUsers, { loading, data: { users: data } = { users: [] } }] =
		useLazyQuery(GET_USERS);

	const [userAddMutation] = useMutation(MUTATION_USER_ADD);
	const [userDeleteMutation] = useMutation(MUTATION_USER_DELETE);

	const { data: { roles } = { roles: [] } } = useQuery(GET_ROLES);

	const resetForm = () => {
		setForm({ email: '', password: '', confirmPassword: '', role: [] });
		setFormErrors({
			email: '',
			password: '',
			confirmPassword: '',
			role: ''
		});
	};

	const validateForm = useCallback(() => {
		const errors = {
			email: '',
			password: '',
			confirmPassword: '',
			role: ''
		};
		let valid = true;

		if (!form.email) {
			errors.email = 'Email is required';
			valid = false;
		} else if (!/\S+@\S+\.\S+/.test(form.email)) {
			errors.email = 'Invalid email';
			valid = false;
		}

		if (!form.password) {
			errors.password = 'Password is required';
			valid = false;
		}

		if (!form.confirmPassword) {
			errors.confirmPassword = 'You must confirm the password';
			valid = false;
		} else if (form.password !== form.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
			valid = false;
		}
		if (!(form?.role?.length > 0)) {
			errors.role = 'You must select a role';
			valid = false;
		}

		setFormErrors(errors);
		return valid;
	}, [form.confirmPassword, form.email, form.password, form.role]);

	const handleAddUser = useCallback(async () => {
		if (!validateForm()) return;

		try {
			const { data } = await userAddMutation({
				variables: {
					email: form.email,
					password: form.password,
					roleIds: form.role
				}
			});

			if (data) {
				showToast({
					message: 'User created successfully',
					duration: 3000
				});
				setShowAddModal(false);
				resetForm();
				getUsers({ fetchPolicy: 'network-only' });
			}
		} catch (error) {
			showToast({
				message: 'Error user created',
				duration: 3000,
				type: 'error'
			});
		}
	}, [
		form.email,
		form.password,
		form.role,
		getUsers,
		showToast,
		userAddMutation,
		validateForm
	]);

	const handleDelete = useCallback(async () => {
		if (!userToDelete?.id) return;

		try {
			const { data } = await userDeleteMutation({
				variables: {
					id: userToDelete.id
				}
			});

			if (data) {
				showToast({
					message: `User ${
						userToDelete?.username || userToDelete?.email
					} delete`,
					duration: 3000
				});
				setUserToDelete(null);
				getUsers({ fetchPolicy: 'network-only' });
			}
		} catch (error) {
			showToast({
				message: 'Error user created',
				duration: 3000,
				type: 'error'
			});
		}
	}, [
		getUsers,
		showToast,
		userDeleteMutation,
		userToDelete?.email,
		userToDelete?.id,
		userToDelete?.username
	]);

	const schema = {
		properties: {
			name: { title: 'Name' },
			lastName: { title: 'Last name' },
			username: { title: 'Username' },
			email: { title: 'Email' },
			createDate: { title: 'Create Date' },
			roles: {
				title: 'Roles',
				cellRenderer: ({ cellData }: any) => {
					return cellData
						?.map((item: { name?: string }) => item?.name)
						?.join(', ');
				}
			},
			actions: {
				title: 'Actions',
				cellRenderer: ({ rowData }: any) => (
					<Button
						variation='danger'
						size='small'
						onClick={() => setUserToDelete(rowData)}
					>
						Eliminar
					</Button>
				)
			}
		}
	};

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	return (
		<>
			<Layout
				fullWidth
				pageHeader={
					<div className='pa4 flex justify-between items-center'>
						<PageHeader title='Registered Users' />
						<Button
							variation='primary'
							onClick={() => setShowAddModal(true)}
						>
							Add user
						</Button>
					</div>
				}
			>
				<PageBlock variation='full'>
					<div className='mb5'>
						<Table
							items={data}
							schema={schema}
							fullWidth
							loading={loading}
						/>
					</div>
				</PageBlock>
			</Layout>

			{/* Modal de eliminar */}
			{userToDelete && (
				<ModalDialog
					centered
					confirmation={{
						onClick: handleDelete,
						label: 'Yes, delete',
						isDangerous: true
					}}
					cancelation={{
						onClick: () => setUserToDelete(null),
						label: 'Cancel'
					}}
					isOpen
					onClose={() => setUserToDelete(null)}
				>
					<p>
						Are you sure you want to delete{' '}
						<strong>{userToDelete.username}</strong>?
					</p>
				</ModalDialog>
			)}

			{/* Modal para agregar usuario */}
			{showAddModal && (
				<ModalDialog
					centered
					confirmation={{
						onClick: handleAddUser,
						label: 'Create user'
					}}
					cancelation={{
						onClick: () => {
							setShowAddModal(false);
							resetForm();
						},
						label: 'Cancel'
					}}
					isOpen
					onClose={() => {
						setShowAddModal(false);
						resetForm();
					}}
				>
					<div className='flex flex-column'>
						<div className='mv3'>
							<Input
								label='Email'
								value={form.email}
								errorMessage={formErrors.email}
								error={!!formErrors.email}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									setForm({ ...form, email: e.target.value })
								}
								placeholder='email@example.com'
							/>
						</div>
						<div className='mv3'>
							<Select
								multi={true}
								label='Rol'
								searchable={false}
								options={roles?.filter(
									(item: { label?: string }) =>
										item?.label !== 'Super Admin'
								)}
								errorMessage={formErrors.role}
								error={!!formErrors.role}
								onChange={(values: any) => {
									setForm({
										...form,
										role: values?.map(
											(item?: { value: string }) =>
												item?.value
										)
									});
								}}
							/>
						</div>
						<div className='mv3'>
							<Input
								label='Password'
								type='password'
								value={form.password}
								errorMessage={formErrors.password}
								error={!!formErrors.password}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									setForm({
										...form,
										password: e.target.value
									})
								}
								placeholder='***************'
								className='mt4'
							/>
						</div>
						<div className='mv3'>
							<Input
								label='Confirm Password'
								type='password'
								value={form.confirmPassword}
								errorMessage={formErrors.confirmPassword}
								error={!!formErrors.confirmPassword}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									setForm({
										...form,
										confirmPassword: e.target.value
									})
								}
								className='mt4'
								placeholder='***************'
							/>
						</div>
					</div>
				</ModalDialog>
			)}
		</>
	);
};

const UserList = () => (
	<ToastConsumer>
		{({ showToast }: any) => <UserTable showToast={showToast} />}
	</ToastConsumer>
);

export default UserList;
