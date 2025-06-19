import { gql } from '@apollo/client';

export const GET_ROLES = gql`
	query {
		roles {
			value: id
			label: name
		}
	}
`;
