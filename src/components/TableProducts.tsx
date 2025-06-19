import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useApolloClient, useLazyQuery } from '@apollo/client';

import Link from '@vtex/styleguide/lib/Link';
import Layout from '@vtex/styleguide/lib/Layout';
import PageHeader from '@vtex/styleguide/lib/PageHeader';
import PageBlock from '@vtex/styleguide/lib/PageBlock';
import Table from '@vtex/styleguide/lib/Table';
import Modal from '@vtex/styleguide/lib/Modal';
import Checkbox from '@vtex/styleguide/lib/Checkbox';

import ComponentText from './ComponentText';
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products';
import exportToCSV from '../utils/exportToCSV';
import LogoAnimated from '../icons/LogoAnimated';
import print from '../assets/print.png';

interface FilterKeys {
	search: string;
	from: number;
	perPage: number;
}

const select: {
	[key: string]: {
		label: string;
	};
} = {
	productId: {
		label: 'Product Id'
	},
	productName: {
		label: 'Product Name'
	},
	brand: {
		label: 'Brand'
	},
	description: {
		label: 'Description'
	},
	releaseDate: {
		label: 'Release Date'
	},
	productReference: {
		label: 'Product Reference'
	},
	productReferenceCode: {
		label: 'Product Reference Code'
	},
	Color: {
		label: 'Color'
	}
};

const statusSelectorObject = ({
	onChangeObjectCallback,
	values: val
}: {
	onChangeObjectCallback: (v: any) => void;
	values: {
		[key: string]: boolean;
	};
}) => {
	const values = val || {};

	const dataStatus = Object.keys(select).map((key) => ({
		value: key,
		text: select[key].label
	}));

	return (
		<div className='overflow-auto' style={{ maxHeight: '12rem' }}>
			{dataStatus?.map(
				(
					{ value, text }: { value: string; text: string },
					index: number
				) => {
					return (
						<div
							className='mb3'
							key={`class-statment-object-${value}-${index}`}
						>
							<Checkbox
								checked={values ? values[value] : false}
								label={`${text}`}
								name='default-checkbox-group'
								onChange={(event: any) => {
									event.persist();
									const newValue = {
										...values,
										[`${event?.target?.value}`]:
											!values[`${event?.target?.value}`]
									};

									onChangeObjectCallback(newValue);
								}}
								value={value}
							/>
						</div>
					);
				}
			)}
		</div>
	);
};

const renderLabelCSV = (st: any, lgt?: number, filter?: string) => {
	if (!st || (st && !st.object)) {
		return '--';
	}

	const storeFilter = st.object;
	const keys = storeFilter ? Object.keys(storeFilter) : [];
	const isAllTrue = keys.length >= (lgt ?? 0);
	const isAllFalse = keys.length === 0;
	const trueKeys = keys.filter((key) => storeFilter[key]);
	let trueKeysLabel = '';

	switch (filter) {
		case 'status':
			trueKeys.forEach((key, index) => {
				trueKeysLabel += `${select[key]?.label}${
					index === trueKeys.length - 1 ? '' : ', '
				}`;
			});
			break;

		default:
			trueKeys.forEach((key, index) => {
				trueKeysLabel += `${key?.replace(/\s/g, '')}${
					index === trueKeys.length - 1 ? '' : ', '
				}`;
			});
			break;
	}

	return `${isAllTrue ? 'All' : isAllFalse ? '--' : `${trueKeysLabel}`}`;
};

const TableProducts = () => {
	const [productId, setProductId] = useState<string>();

	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	const [filterStatements, setFilterStatements] = useState<any[]>([
		{
			subject: 'csv',
			verb: 'csv',
			object: {
				productId: true,
				productName: true,
				brand: true,
				description: true,
				releaseDate: true,
				productReference: true,
				productReferenceCode: true,
				Color: true
			},
			error: null
		}
	]);

	const [queryFilter, setQueryFilter] = useState<FilterKeys>({
		from: 1,
		search: '',
		perPage: 10
	});

	const client = useApolloClient();
	const [getData, { loading, data }] = useLazyQuery(GET_PRODUCTS);
	const [
		getProduct,
		{ loading: loadingProduct, data: { product } = { product: {} } }
	] = useLazyQuery(GET_PRODUCT);

	const printRef = useRef<HTMLDivElement>(null);

	const defaultSchema = useMemo(() => {
		return {
			properties: {
				img: {
					title: 'Image',
					width: 100,
					cellRenderer: ({ cellData }: any) => (
						<img
							width={'auto'}
							src={cellData?.imageUrl}
							alt={`${cellData?.itemId}-${cellData?.name}`}
							className='h-100 pointer'
							onClick={() => setProductId(cellData?.productId)}
						/>
					)
				},
				productId: {
					title: 'Product ID',
					...(isMobile ? { width: 250 } : {}),
					cellRenderer: ({ cellData }: any) => (
						<ComponentText cellData={cellData} />
					)
				},
				brand: {
					title: 'Brand',
					...(isMobile ? { width: 250 } : {}),
					cellRenderer: ({ cellData }: any) => (
						<ComponentText cellData={cellData} />
					)
				},
				productName: {
					title: 'Product Name',
					...(isMobile ? { width: 250 } : {}),
					cellRenderer: ({ cellData }: any) => (
						<ComponentText cellData={cellData} />
					)
				},
				itemIds: {
					title: "Item ID'S",
					...(isMobile ? { width: 250 } : {}),
					cellRenderer: ({ cellData }: any) => (
						<ComponentText cellData={cellData} />
					)
				},
				...(!isMobile
					? {
							releaseDate: {
								title: 'Release Date',
								cellRenderer: ({ cellData }: any) => {
									const date = new Date(cellData);
									return date.toLocaleDateString();
								}
							}
					  }
					: {}),
				link: {
					title: ' ',
					...(isMobile ? { width: 180 } : {}),
					cellRenderer: ({ cellData }: any) => (
						<Link
							className={'unde'}
							href={`${cellData?.replace('.myvtex', '')}`}
							target='_blank'
						>
							View Store
						</Link>
					)
				}
				// status: {
				// 	title: 'Estado',
				// 	...(isMobile ? { width: 175 } : {}),
				// 	cellRenderer: ({ cellData }: any) => {
				// 		const colors = statusColor[cellData]
				// 		return (
				// 			<Tag bgColor={colors?.bg} color={colors?.color}>
				// 				<span className="nowrap">{colors?.label}</span>
				// 			</Tag>
				// 		)
				// 	},
				// },
			}
		};
	}, [isMobile]);

	const {
		// currentPage,
		tableLength,
		slicedData,
		currentItemTo,
		currentItemFrom
	}: any = useMemo(() => {
		const dataMap = data?.products?.items?.map(
			({ subItems, ...rest }: any) => {
				const { images, ...restImg } = subItems?.[0] ?? {};
				return {
					...rest,
					itemIds: subItems
						?.map(({ itemId = '' }) => itemId)
						?.join(', '),
					img: {
						...(restImg ?? {}),
						...(images?.[0] ?? {}),
						...(rest?.productId
							? { productId: rest?.productId }
							: {})
					}
				};
			}
		);
		return {
			slicedData: dataMap ?? [],
			...(data?.products?.pagination ?? {
				tableLength: 0,
				itemsLength: 0,
				currentItemFrom: 0,
				currentItemTo: 0,
				currentPage: 0
			})
		};
	}, [data?.products?.items, data?.products?.pagination]);

	const fetchAndExport = useCallback(async () => {
		try {
			const visibleKeys = filterStatements?.find(
				({ subject = '' }) => subject === 'csv'
			)?.object;

			if (!Object.values(visibleKeys).includes(true)) return;

			const { data } = await client.query({
				query: GET_PRODUCTS,
				variables: {
					from: queryFilter?.from,
					to: queryFilter?.from + 49,
					...(queryFilter?.search?.length > 3
						? { search: queryFilter?.search }
						: {})
				}
			});

			const productos =
				data?.products?.items?.map((item: { [x: string]: any }) => {
					const filteredItem: Record<string, any> = {};
					for (const key in visibleKeys) {
						if (visibleKeys[key]) {
							filteredItem[key] = item[key];
						}
					}
					return filteredItem;
				}) ?? [];

			exportToCSV(productos);
		} catch (err) {
			console.error('Error al exportar productos:', err);
		}
	}, [client, filterStatements, queryFilter?.from, queryFilter?.search]);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const { from = 0, perPage = 0, search } = queryFilter;

		getData({
			variables: {
				from,
				to: from + perPage - 1,
				...(search && search?.length > 3 ? { search } : {})
			}
		});
	}, [getData, queryFilter]);

	useEffect(() => {
		if (!productId) return;

		getProduct({
			variables: {
				productId
			}
		});
	}, [getData, getProduct, productId, queryFilter]);

	const handlePrint = useCallback(() => {
		if (printRef.current) {
			const content = printRef.current.innerHTML;
			const printWindow = window.open('', '', 'width=800,height=600');

			if (printWindow) {
				printWindow.document.write(`
			  <html>
				<head>
				  <title>Impresión</title>
				  <style>
					body {
					  font-family: Arial, sans-serif;
					  padding: 20px;
					}
				  </style>
				</head>
				<body>${content}</body>
			  </html>
			`);
				printWindow.document.close();
				printWindow.focus();
				setTimeout(() => {
					printWindow.print();
					printWindow.close();
				}, 500);
			}
		}
	}, []);

	return (
		<>
			<Layout fullWidth pageHeader={<PageHeader title='Products page' />}>
				<PageBlock variation='full'>
					<div className='mb5'>
						<Table
							fullWidth
							// highlightOnHover
							density={'low'}
							schema={defaultSchema}
							items={slicedData}
							toolbar={{
								inputSearch: {
									value: queryFilter?.search,
									placeholder: 'Search...',
									onChange: (e: {
										target: { value: any };
									}) => {
										const value = e?.target?.value;
										if (!value) return;

										setQueryFilter((old) => ({
											...old,
											from: 1,
											search: value
										}));
									},
									onClear: () => {
										setQueryFilter((old) => ({
											...old,
											from: 1,
											search: ''
										}));
									}
								},
								density: {
									buttonLabel: 'Line density',
									lowOptionLabel: 'Low',
									mediumOptionLabel: 'Medium',
									highOptionLabel: 'High'
								},
								download: {
									label: 'Export',
									handleCallback: fetchAndExport
								}
							}}
							pagination={{
								textOf: 'of',
								rowsOptions: [5, 10, 15, 25],
								textShowRows: 'Show rows',
								totalItems: tableLength,
								selectedOption: tableLength,
								currentItemTo: currentItemTo,
								currentItemFrom: currentItemFrom,
								onNextClick: () => {
									setQueryFilter((copy) => ({
										...copy,
										from: copy?.from + copy?.perPage
									}));
								},
								onPrevClick: () => {
									setQueryFilter((copy) => {
										const from = copy?.from - copy?.perPage;
										return {
											...copy,
											from: from >= 0 ? from : 0
										};
									});
								},
								onRowsChange: (_e: any, value: string) =>
									setQueryFilter((copy: any) => {
										return {
											...copy,
											perPage: parseInt(value)
										};
									})
							}}
							filters={{
								alwaysVisibleFilters: ['csv'],
								statements: filterStatements,
								onChangeStatements: (statements = []) =>
									setFilterStatements(statements),
								clearAllFiltersButtonLabel: 'Clear filters',
								options: {
									csv: {
										label: 'Rows CSV',
										renderFilterLabel: (st: any) =>
											renderLabelCSV(
												st,
												Object.keys(select).length,
												'status'
											),
										verbs: [
											{
												label: '',
												value: 'csv',
												object: {
													renderFn:
														statusSelectorObject
												}
											}
										]
									}
								}
							}}
							loading={loading}
						/>
					</div>
				</PageBlock>
			</Layout>
			<Modal
				isOpen={!!productId}
				onClose={() => setProductId(undefined)}
				title={
					<div className='flex flex-row justify-between'>
						{product?.productName}
						<img
							width={'20px'}
							src={print}
							alt='print'
							className='pointer mr7 h-fit'
							onClick={() => handlePrint()}
							style={{ height: 'fit-content' }}
						/>
					</div>
				}
				aria-describedby='modal-description'
			>
				{loadingProduct ? (
					<div className='w-100 flex items-center justify-center mv7 pv7'>
						<LogoAnimated />
					</div>
				) : (
					<div
						ref={printRef}
						className='flex flex-column flex-row-ns'
						id='modal-description'
					>
						<div className='w-100 w-50-ns'>
							<img
								src={
									product?.subItems?.[0]?.images[0]?.imageUrl
								}
								alt=''
								className={`w-auto h-100`}
								style={{
									objectFit: 'cover'
								}}
							/>
						</div>
						<div
							className='w-100 w-50-ns mv4 pv6-ns pl6-ns'
							style={{
								overflowY: 'auto',
								maxHeight: '70vh'
							}}
						>
							{product?.productId && (
								<p>Product ID: {product?.productId}</p>
							)}
							{product?.brand && <p>Brand: {product?.brand}</p>}
							{product?.categories?.[0] && (
								<p>
									Categories:{' '}
									{product?.categories[0]
										?.replace(/^\/|\/$/g, '')
										.replace(/\//g, ' - ')}
								</p>
							)}
							{product?.Color?.length > 0 && (
								<p>
									Colors:{' '}
									{product?.Color?.map(
										(item = '', i: number) =>
											i !== 0 ? ',' + item : item
									)}
								</p>
							)}
							{product?.linea?.length > 0 && (
								<p>
									Line:{' '}
									{product?.linea?.map(
										(item = '', i: number) =>
											i !== 0 ? ',' + item : item
									)}
								</p>
							)}
							{product?.tipoPrenda?.length > 0 && (
								<p>
									Type:{' '}
									{product?.tipoPrenda?.map(
										(item = '', i: number) =>
											i !== 0 ? ',' + item : item
									)}
								</p>
							)}
							{product?.description && (
								<>
									<p className='b'>Description: </p>
									<ul>
										{product?.description
											?.split(/•\s*/g)
											?.map(
												(item: any) =>
													item && <li>{item}</li>
											)}
									</ul>
								</>
							)}
							{product?.cuidados?.length > 0 && (
								<>
									<p className='b'>Care:</p>
									<ul>
										{product?.cuidados?.map((item = '') => (
											<li>{item}</li>
										))}
									</ul>
								</>
							)}
							{product?.cuidados?.length > 0 && (
								<>
									<p className='b'>Origin:</p>
									<ul>
										{product?.origen?.map((item = '') => (
											<li>{item}</li>
										))}
									</ul>
								</>
							)}
						</div>
					</div>
				)}
			</Modal>
		</>
	);
};

export default TableProducts;
