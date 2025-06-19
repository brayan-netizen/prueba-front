import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
	query GetProducts($from: Int!, $to: Int!, $search: String) {
		products(from: $from, to: $to, search: $search) {
			items {
				productId
				productName
				brand
				link
				description
				releaseDate
				productReference
				productReferenceCode
				Color
				subItems: items {
					itemId
					name
					images {
						imageUrl
					}
				}
			}
			pagination {
				tableLength
				itemsLength
				currentItemFrom
				currentItemTo
				currentPage
			}
		}
	}
`;

export const GET_PRODUCT = gql`
	query GetProduct($productId: String!) {
		product(productId: $productId) {
			productId
			productName
			brand
			link
			description
			categories
			categoriesIds
			Color
			Silueta
			linea
			cuidados
			origen
			tipoPrenda
			subItems: items {
				itemId
				name
				images {
					imageUrl
				}
			}
		}
	}
`;
