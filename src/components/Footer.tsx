import foto from '../assets/perfil.jpg';

const technologies = [
	{
		name: 'React',
		url: 'https://reactjs.org/',
		icon: 'https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256'
	},
	{
		name: 'TypeScript',
		url: 'https://www.typescriptlang.org/',
		icon: 'https://static-00.iconduck.com/assets.00/typescript-icon-icon-2048x2048-2rhh1z66.png'
	},
	{
		name: 'VTEX Styleguide',
		url: 'https://styleguide.vtex.com/',
		icon: 'https://yt3.googleusercontent.com/0fnmJ6X1_lfACSaN70A1oPdwemIcTKgi-UmENgJ480SKuhVAP089-RqJhUPGlC0pQkNS5aiN4A=s900-c-k-c0x00ffffff-no-rj'
	},
	{
		name: 'Tachyons',
		url: 'https://tachyons.io/',
		icon: 'https://tomich.org/images/t-with-circle.svg'
	},
	{
		name: 'GraphQL',
		url: 'https://graphql.org/',
		icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJQHGIHqi4lm-4ecGmsnJotVqo52YT1ryXvDdBmpORtY8rnKZT7NC6xj5zY6PsAJ9vdaY&usqp=CAU'
	},
	{
		name: 'Node.js',
		url: 'https://nodejs.org/',
		icon: 'https://static-00.iconduck.com/assets.00/node-js-icon-1817x2048-g8tzf91e.png'
	},
	{
		name: 'MongoDB',
		url: 'https://www.mongodb.com/',
		icon: 'https://static-00.iconduck.com/assets.00/mongodb-icon-2048x2048-cezvpn3f.png'
	},
	{
		name: 'Render',
		url: 'https://render.com/',
		icon: 'https://cdn.sanity.io/images/34ent8ly/production/ec37a3660704e1fa2b4246c9a01ab34e145194ad-824x824.png'
	},
	{
		name: 'GitHub',
		url: 'https://github.com/',
		icon: 'https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png'
	}
];

const Footer = () => {
	return (
		<footer className='bg-black-90 white pv4 ph3 ph5-ns'>
			<div className='flex flex-column flex-row-ns justify-between items-center-ns'>
				<div className='mb3 mb0-ns tc tl-ns'>
					<h3 className='f4 mb5'>Tecnologías utilizadas:</h3>
					<div className='flex flex-wrap mt5'>
						{technologies.map((tech) => (
							<a
								key={tech.name}
								href={tech.url}
								target='_blank'
								rel='noopener noreferrer'
								className='link white dim mr3 mb2 mt5 flex items-center underline'
							>
								<img
									src={tech.icon}
									alt='Icon'
									className='w2 h2 ml1 mr2'
									style={{
										objectFit: 'cover'
									}}
								/>{' '}
								{tech.name}
							</a>
						))}
					</div>
				</div>

				<a
					target='_blank'
					rel='noopener noreferrer'
					className='tc mb3 mb0-ns mt5 link underline white'
					href='https://www.linkedin.com/in/brayan-ocampo-carmona-9386531a9'
				>
					<img
						src={foto}
						alt='Mi foto'
						className='br-100 h3 w3 dib ba b--white-30'
					/>
					<p className='f6 mt2'>Brayan Ocampo Carmona</p>
					<p className='f6 mt2'>Ingeniero de sistemas</p>
				</a>

				<div className='tc tr-ns'>
					<p className='f6'>&copy; {new Date().getFullYear()}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
