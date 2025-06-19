import { gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
	query GetProducts($page: Int!) {
		products(page: $page, pageSize: 5) {
			total
			totalPages
			hasNextPage
			products {
				productId
				productName
				brand
			}
		}
	}
`;
const TableProducts = () => {
	// const [page, setPage] = useState(1);
	const { loading, error, data } = useQuery(GET_PRODUCTS, {
		variables: { page: 1 }
	});

	if (loading) return <p>Cargando productos...</p>;
	if (error) return <p>Error: {error.message}</p>;

	console.log('prueba data', data);

	return <></>;
};

export default TableProducts;
