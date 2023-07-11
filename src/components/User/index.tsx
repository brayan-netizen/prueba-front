import { useState } from 'react';
import Box from '@vtex/styleguide/lib/Box';
import Input from '@vtex/styleguide/lib/Input';
import Button from '@vtex/styleguide/lib/Button';
import DatePicker from '@vtex/styleguide/lib/DatePicker';
import Dropdown from '@vtex/styleguide/lib/Dropdown';

const User = () => {
	const typeUsers = [
		{ label: 'Super Admin', value: 1 },
		{ label: 'Admin', value: 2 }
	];

	const [dataSelect, setDataSelect] = useState(1);

	return (
		<>
			<div className='w-100 h-100 bg-muted-5 pa8 flex justify-center'>
				<form className='w-50'>
					<Box>
						<div className='mb5 w-100 flex justify-center'>
							<img
								src='https://offcorss.vteximg.com.br/arquivos/Logo-Offcorss-Its-Cool.gif'
								alt='Logo offcors'
							/>
						</div>
						<div className='mb5'>
							<Input placeholder='USER NAME' label='USER NAME' />
						</div>
						<div className='mb5'>
							<DatePicker
								label='Date range'
								// maxDate={addDays(new Date(), 5)}
								minDate={new Date()}
								// value={this.state.dateRangeDate}
								// onChange={date => this.setState({ dateRangeDate: date })}
								locale='es-CO'
							/>
						</div>
						<div className='mb5'>
							<Input placeholder='NAME' label='NAME' />
						</div>
						<div className='mb5'>
							<Input placeholder='LAST NAME' label='LAST NAME' />
						</div>
						<div className='mb5'>
							<Input
								type='email'
								placeholder='EMAIL'
								label='EMAIL'
							/>
						</div>
						<div className='mb5'>
							<Dropdown
								label='Disabled'
								disabled
								options={typeUsers}
								value={dataSelect}
								onChange={(_: any, v: any) => setDataSelect(v)}
							/>
						</div>
						<div className='flex justify-center mt4'>
							<Button variation='primary'>Login</Button>
						</div>
						<div className='mb5'>
							<Input type='password' label='PASSWORD' />
						</div>
					</Box>
				</form>
			</div>
		</>
	);
};

export default User;
