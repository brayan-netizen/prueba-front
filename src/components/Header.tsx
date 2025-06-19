import login from '../assets/login.png';
import Card from '@vtex/styleguide/lib/Card';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import IconUser from './IconUser';
import Band from './Band';

const Header = () => {
	const [activeLogin, setActiveLogin] = useState(false);

	const { user, logout, isAuthenticated } = useAuth();

	return (
		<header className='w-100 flex flex-column sticky top-0 z-999 shadow-1'>
			<Band />
			<div className='w-100 flex items-center justify-between pa3 bg-white'>
				<div className='w-20'></div>
				<div className='w-60 tc'>
					<Link to='/'>
						<img
							src='https://offcorss.vtexassets.com/arquivos/header__logo-offcorss.png'
							alt='Logo'
						/>
					</Link>
				</div>
				<div className='w-20 flex justify-end items-center gap-3'>
					<div
						className='flex flex-row items-center content-icon-menu pointer pa2'
						onClick={() => setActiveLogin((s) => !s)}
					>
						<img
							src={login}
							alt='login'
							className='pointer mh5 icon-menu'
						/>

						{isAuthenticated && (
							<p className='truncate mw4 mv0'>
								Hello,
								<br />
								{user.name}!
							</p>
						)}
					</div>
					{isAuthenticated && (
						<>
							{activeLogin && (
								<div
									className='fixed flex top-0 left-0 bottom-0 right-0'
									onClick={() => setActiveLogin(false)}
								/>
							)}
							<div className='relative'>
								<div
									className={`z-9999 absolute right-0 options-login${
										activeLogin ? ' login-active' : ''
									}`}
								>
									<Card>
										<div className='flex flex-column login-col-link'>
											<div className='flex justify-center items-center icon-menu-col'>
												<IconUser
													name={`${
														user?.name ||
														user?.lastName ||
														'NA'
													}`}
												/>
											</div>
											<p className='mv0 tc mv5'>
												Hello,
												<br />
												{user.name}!
											</p>
											<p className='f4 tc'>
												What do you want to do today?
											</p>
											<Link to='/'>Home</Link>
											<Link to='/users'>List Users</Link>
											<Link to='/edit-profile'>
												Edit Profile
											</Link>
											<p
												className='black-90 underline pointer'
												onClick={logout}
											>
												Logout
											</p>
										</div>
									</Card>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
