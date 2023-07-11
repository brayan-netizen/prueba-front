import React, { useState, useEffect } from 'react';
import Table from '@vtex/styleguide/lib/Table';
import { useQuery, gql } from '@apollo/client';
import { loader } from 'graphql.macro';
import Input from '@vtex/styleguide/lib/Input';
import Box from '@vtex/styleguide/lib/Box';
import './style.css';
import * as XLSX from 'xlsx';

interface stateType {
	tableLength: number;
	currentPage: number;
	slicedData?: any;
	currentItemFrom: number;
	currentItemTo: number;
	searchValue: string;
	itemsLength?: any;
	emptyStateLabel: string;
	filterStatements: any[];
}
const Dashboard = () => {
	const [data, setData]: any[] = useState();
	const [initialState, setInitialState]: any[] = useState();

	const [state, setState] = useState<stateType>({
		tableLength: 5,
		currentPage: 1,
		currentItemFrom: 1,
		currentItemTo: 5,
		searchValue: '',
		emptyStateLabel: 'Nothing to show.',
		filterStatements: []
	});

	const queryProduct = loader('../../graphql/query.getProduct.gql');
	const query = gql`
		${queryProduct}
	`;

	const {
		loading,
		error,
		data: { getProductsInfoAll } = {}
	} = useQuery(query);

	useEffect(() => {
		if (error) {
			console.error(error.message);
		}

		if (getProductsInfoAll) {
			const copy = [...getProductsInfoAll];
			setData(copy);
		}
	}, [error, getProductsInfoAll]);

	useEffect(() => {
		if (data) {
			const copy = { ...state };
			copy.slicedData = data.slice(0, copy.tableLength);
			copy.itemsLength = data.length;
			setState(copy);
			const copyInitial = { ...copy };
			//realizar una copia de los datos originales para restablecer
			copyInitial.slicedData = data.slice(0, copyInitial.itemsLength);
			setInitialState(copyInitial);
		}
	}, [data]);

	if (loading) {
		return null;
	}

	if (!data || !state.slicedData) {
		return null;
	}

	const defaultSchema = {
		properties: {
			imageUrl: {
				title: 'Image',
				cellRenderer: ({ cellData: imageUrl }: any) => {
					return <img src={imageUrl} alt='Img Table' />;
				}
			},
			productId: {
				title: 'Product ID',
				width: 170
			},
			nameComplete: {
				title: 'Name',
				width: 300
			},
			productTitle: {
				title: 'Product Title',
				width: 500
			},
			brand: {
				title: 'Brand',
				width: 170
			},
			link: {
				title: 'View Page',
				cellRenderer: ({ cellData: link }: any) => {
					return (
						<a href={link} target='_blank'>
							View Page
						</a>
					);
				}
			}
		}
	};

	const handleNextClick = () => {
		const copy = { ...state };
		const newPage = copy.currentPage + 1;
		const itemTo = copy.tableLength * newPage;
		const itemFrom = copy.currentItemTo + 1;

		copy.slicedData = data.slice(itemFrom - 1, itemTo);
		copy.currentPage = newPage;
		copy.currentItemTo = itemTo;
		copy.currentItemFrom = itemFrom;
		setState(copy);
	};

	const handlePrevClick = () => {
		if (state.currentPage === 0) return;

		const copy = { ...state };
		const itemTo = copy.currentItemFrom - 1;
		const itemFrom = copy.currentItemFrom - copy.tableLength;

		copy.currentItemFrom = itemFrom;
		copy.currentPage = copy.currentPage - 1;
		copy.slicedData = data.slice(itemFrom - 1, itemTo);

		setState(copy);
	};

	const handleRowsChange = (e: any, value: string) => {
		const copy = { ...state };

		copy.tableLength = parseInt(value);
		copy.currentItemTo = parseInt(value);
		copy.slicedData = data.slice(0, copy.tableLength);

		console.log(copy);
		setState(copy);
		() => {
			// this callback garantees new sliced items respect filters and tableLength
			const { filterStatements = [] } = state;
			handleFiltersChange(filterStatements);
		};
	};

	const handleInputSearch = (e: { target: { value: any } }) => {
		const value = e && e.target && e.target.value;
		if (value.length < 4) {
			return;
		} else {
			const copy = { ...state };
			copy.slicedData = initialState.slicedData.slice(
				0,
				copy.tableLength
			);
			copy.itemsLength = initialState.itemsLength.length;
			copy.searchValue = value;
			setState(copy);
		}
		const regex = new RegExp(value, 'i');
		if (!value) {
			setState({ ...initialState });
		} else {
			const copy = { ...state };
			const filter = initialState.slicedData
				.slice()
				.filter(
					(item: any) =>
						regex.test(item.brand) ||
						regex.test(item.productTitle) ||
						regex.test(item.productId) ||
						regex.test(item.nameComplete)
				);

			copy.slicedData = filter.slice(0, copy.tableLength);
			copy.itemsLength = filter.length;
			copy.searchValue = value;
			setState(copy);
		}
	};

	const handleInputSearchChange = (e: { target: { value: any } }) => {
		const copy: any = { ...state };
		copy.searchValue = e.target.value;
		setState(copy);
		handleInputSearch(e);
	};

	const handleInputSearchClear = () => {
		const copy = { ...state };
		copy.searchValue = '';
		copy.itemsLength = initialState.slicedData.length;
		copy.slicedData = initialState.slicedData.slice(0, copy.tableLength);
		setState(copy);
	};

	const simpleInputObject = ({
		statements,
		values,
		statementIndex,
		error,
		extraParams,
		onChangeObjectCallback
	}: any) => {
		return (
			<Input
				value={values || ''}
				onChange={(e: { target: { value: any } }) =>
					onChangeObjectCallback(e.target.value)
				}
			/>
		);
	};

	const simpleInputVerbsAndLabel = () => {
		return {
			renderFilterLabel: (st: { object: any; verb: string }) => {
				if (!st || !st.object) {
					// you should treat empty object cases only for alwaysVisibleFilters
					return 'Any';
				}
				return `${
					st.verb === '='
						? 'is'
						: st.verb === '!='
						? 'is not'
						: 'contains'
				} ${st.object}`;
			},
			verbs: [
				{
					label: 'is',
					value: '=',
					object: {
						renderFn: simpleInputObject,
						extraParams: {}
					}
				},
				{
					label: 'is not',
					value: '!=',
					object: {
						renderFn: simpleInputObject,
						extraParams: {}
					}
				},
				{
					label: 'contains',
					value: 'contains',
					object: {
						renderFn: simpleInputObject,
						extraParams: {}
					}
				}
			]
		};
	};

	const handleFiltersChange = (statements: any = []) => {
		// here you should receive filter values, so you can fire mutations ou fetch filtered data from APIs
		// For the sake of example I'll filter the data manually since there is no API
		const { tableLength } = state;
		let newData = data.slice();
		statements.forEach((st: any) => {
			console.log(st);
			if (!st || !st.object) return;
			const { subject, verb, object } = st;
			switch (subject) {
				case 'nameComplete':
				case 'productTitle':
					if (verb === 'contains') {
						newData = newData.filter((item: any) =>
							item[subject].includes(object)
						);
					} else if (verb === '=') {
						newData = newData.filter(
							(item: any) => item[subject] === object
						);
					} else if (verb === '!=') {
						newData = newData.filter(
							(item: any) => item[subject] !== object
						);
					}
					break;
			}
		});
		const newDataLength = newData.length;
		const newSlicedData = newData.slice(0, tableLength);
		const copy = { ...state };

		copy.filterStatements = statements;
		copy.slicedData = newSlicedData;
		copy.itemsLength = newDataLength;
		copy.currentItemTo =
			tableLength > newDataLength ? newDataLength : tableLength;

		setState(copy);
	};

	const exportToExcel = ({ data }: any) => {
		const fechaHoraActual = new Date();
		// Datos de ejemplo

		// Crear una hoja de cálculo
		const workbook = XLSX.utils.book_new();

		// Crear una hoja de cálculo con los datos
		const worksheet = XLSX.utils.json_to_sheet(data);

		// Agregar la hoja de cálculo al libro
		XLSX.utils.book_append_sheet(
			workbook,
			worksheet,
			`data-product_${fechaHoraActual.getFullYear()}-${
				fechaHoraActual.getMonth() + 1
			}-${fechaHoraActual.getDate()}_${fechaHoraActual.getHours()}-${fechaHoraActual.getMinutes()}`
		);

		// Generar el archivo Excel
		XLSX.writeFile(workbook, 'data.xlsx');
	};

	return (
		<div className='container-dasboard w-100 h-100 bg-muted-5 pa1 flex justify-center'>
			<Box>
				<Table
					fullWidth
					schema={defaultSchema}
					items={state.slicedData}
					emptyStateLabel={state.emptyStateLabel}
					density='low'
					dynamicRowHeight={true}
					toolbar={{
						hiddenFields: ['imageUrl'],
						inputSearch: {
							value: state.searchValue,
							placeholder: 'Search stuff...',
							onChange: handleInputSearchChange,
							onClear: handleInputSearchClear,
							onSubmit: handleInputSearch
						},
						density: {
							buttonLabel: 'Line density',
							lowOptionLabel: 'Low',
							mediumOptionLabel: 'Medium',
							highOptionLabel: 'High'
						},
						download: {
							label: 'Export',
							handleCallback: () =>
								exportToExcel({ data: initialState.slicedData })
						},
						fields: {
							label: 'Toggle visible fields',
							showAllLabel: 'Show All',
							hideAllLabel: 'Hide All',
							onToggleColumn: (params: {
								toggledField: any;
								activeFields: any;
							}) => {
								console.log('pru', params);
								console.log(params.toggledField);
								console.log(params.activeFields);
							},
							onHideAllColumns: (activeFields: any) =>
								console.log(activeFields),
							onShowAllColumns: (activeFields: any) =>
								console.log(activeFields)
						}
					}}
					pagination={{
						onNextClick: handleNextClick,
						onPrevClick: handlePrevClick,
						currentItemFrom: state.currentItemFrom,
						currentItemTo: state.currentItemTo,
						onRowsChange: handleRowsChange,
						textShowRows: 'Show rows',
						textOf: 'of',
						totalItems: state.itemsLength,
						rowsOptions: [5, 10, 15, 25]
					}}
					filters={{
						alwaysVisibleFilters: ['nameComplete', 'productTitle'],
						statements: state.filterStatements,
						onChangeStatements: handleFiltersChange,
						clearAllFiltersButtonLabel: 'Clear Filters',
						collapseLeft: true,
						options: {
							productTitle: {
								label: 'Product',
								...simpleInputVerbsAndLabel()
							},
							nameComplete: {
								label: 'Name',
								...simpleInputVerbsAndLabel()
							}
						}
					}}
				/>
			</Box>
		</div>
	);
};

export default Dashboard;
