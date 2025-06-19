declare module '@vtex/styleguide/lib/Button' {
	import { ComponentType, InputHTMLAttributes } from 'react';

	interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
		children?: node;
		autoComplete?: string;
		autoFocus?: bool;
		block?: bool;
		disabled?: bool;
		download?: string;
		href?: string;
		icon?: bool;
		id?: string;
		isActiveOfGroup?: bool;
		isFirstOfGroup?: bool;
		isGrouped?: bool;
		isLastOfGroup?: bool;
		isLoading?: bool;
		name?: string;
		noUpperCase?: bool;
		noWrap?: bool;
		onBlur?: func;
		onClick?: func;
		onFocus?: func;
		onMouseDown?: func;
		onMouseEnter?: func;
		onMouseLeave?: func;
		onMouseOut?: func;
		onMouseOver?: func;
		onMouseUp?: func;
		onTouchEnd?: func;
		onTouchMove?: func;
		onTouchStart?: func;
		referrerPolicy?: string;
		rel?: string;
		size?: enum;
		tabIndex?: number;
		target?: string;
		testId?: string;
		type?: string;
		value?: string;
		variation?: enum;
	}

	const Button: ComponentType<ButtonProps>;

	export default Button;
}
