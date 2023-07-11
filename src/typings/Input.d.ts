declare module '@vtex/styleguide/lib/Input' {
	import { ComponentType, InputHTMLAttributes } from 'react';

	interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
		accept?: string;
		autoComplete?: string;
		autoCorrect?: string;
		autoFocus?: bool;
		autoSave?: string;
		dataAttributes?: object;
		defaultValue?: string;
		disabled?: bool;
		error?: bool;
		errorMessage?: string;
		groupBottom?: bool;
		helpText?: node;
		id?: string;
		inputMode?: string;
		label?: union;
		list?: string;
		max?: string;
		maxLength?: union;
		min?: string;
		minLength?: string;
		multiple?: bool;
		name?: string;
		onBlur?: func;
		onChange?: func;
		onFocus?: func;
		onKeyDown?: func;
		onKeyPress?: func;
		onKeyUp?: func;
		onMouseEnter?: func;
		onMouseLeave?: func;
		pattern?: string;
		placeholder?: string;
		prefix?: node;
		readOnly?: bool;
		required?: bool;
		size?: enum;
		spellCheck?: string;
		src?: string;
		step?: string;
		suffix?: node;
		suffixIcon?: element;
		tabIndex?: string;
		testId?: string;
		token?: bool;
		type?: string;
		value?: union;
	}

	const Input: ComponentType<InputProps>;

	export default Input;
}
