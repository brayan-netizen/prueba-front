declare module '@vtex/styleguide/lib/DatePicker' {
	import { ComponentType, InputHTMLAttributes } from 'react';

	interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
		locale?: string;
		onChange?: func;
		value?: Date;
		align?: enum;
		autoFocus?: bool;
		direction?: enum;
		disabled?: bool;
		error?: bool;
		errorMessage?: string;
		excludeDates?: instanceOf[];
		excludeTimes?: instanceOf[];
		helpText?: node;
		id?: string;
		includeDates?: instanceOf[];
		includeTimes?: instanceOf[];
		label?: string;
		limitMonthNavigation?: bool;
		maxDate?: Date;
		maxTime?: Date;
		minDate?: Date;
		minTime?: Date;
		name?: string;
		onBlur?: func;
		onFocus?: func;
		placeholder?: string;
		positionFixed?: bool;
		readOnly?: bool;
		required?: bool;
		size?: enum;
		tabIndex?: string;
		timeIntervals?: number;
		useTime?: bool;
	}

	const DatePicker: ComponentType<DatePickerProps>;

	export default DatePicker;
}
