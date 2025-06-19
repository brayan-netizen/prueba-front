import { ComponentType, InputHTMLAttributes } from 'react';

interface IconProps extends InputHTMLAttributes<HTMLInputElement> {
	id?: String;
	size?: Number;
	isActive?: Boolean;
	activeClassName?: String;
	mutedClassName?: String;
}

declare module '@vtex/styleguide/lib/icon/ArrowDown' {
	const ArrowDown: ComponentType<IconProps>;
	export default ArrowDown;
}

declare module '@vtex/styleguide/lib/icon/ArrowUp' {
	const ArrowUp: ComponentType<IconProps>;
	export default ArrowUp;
}
