const exportToCSV = (data: any[]) => {
	if (!data.length) return;

	const separator = ',';
	const keys = Object.keys(data[0]);

	const csvContent = [
		keys.join(separator), // encabezado
		...data.map((row: { [key: string]: any }) =>
			keys
				.map(
					(k) => `"${(row[k] ?? '').toString().replace(/"/g, '""')}"`
				)
				.join(separator)
		)
	].join('\n');

	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.setAttribute('href', url);
	link.setAttribute('download', 'Data_Products.csv');
	link.click();
};

export default exportToCSV;
