declare module '@vtex/styleguide/lib/Dropdown' {
	import { ComponentType, InputHTMLAttributes } from 'react';

	interface DropdownProps extends InputHTMLAttributes<HTMLInputElement> {
		autoFocus?: bool;
		disabled?: bool;
		error?: bool;
		errorMessage?: node;
		form?: string;
		helpText?: node;
		id?: string;
		label?: node;
		name?: string;
		onBlur?: func;
		onChange?: func;
		onFocus?: func;
		onMouseEnter?: func;
		onMouseLeave?: func;
		options?: shape[];
		placeholder?: union;
		preventTruncate?: bool;
		required?: bool;
		selectTestId?: string;
		size?: enum;
		testId?: string;
		value?: union;
		variation?: enum;
	}

	const Dropdown: ComponentType<DropdownProps>;

	export default Dropdown;
}
