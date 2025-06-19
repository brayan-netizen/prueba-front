import Tooltip from '@vtex/styleguide/lib/Tooltip';
import { capitalize } from '../utils/funtions';

const ComponentText = ({ cellData }: any) => {
	const name = capitalize(cellData);

	return (
		<Tooltip label={`${name}`}>
			<span className='pointer truncate'>{name}</span>
		</Tooltip>
	);
};

export default ComponentText;
