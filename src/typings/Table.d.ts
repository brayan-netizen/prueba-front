declare module '@vtex/styleguide/lib/Table' {
	import { ComponentType, InputHTMLAttributes } from 'react';

	interface TableProps extends InputHTMLAttributes<HTMLInputElement> {
		items?: array;
		schema?: object;
		bulkActions?: shape;
		containerHeight?: number;
		density?: enum;
		disableHeader?: bool;
		dynamicRowHeight?: bool;
		emptyStateChildren?: node;
		emptyStateLabel?: string;
		filters?: shape;
		fixFirstColumn?: bool;
		fullWidth?: bool;
		lineActions?: shape[];
		loading?: bool;
		onRowClick?: func;
		onRowHover?: func;
		onSort?: func;
		pagination?: shape;
		sort?: shape;
		toolbar?: shape;
		totalizers?: union;
		updateTableKey?: string;
	}

	const Table: ComponentType<TableProps>;

	export default Table;
}
