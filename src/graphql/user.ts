import { gql } from '@apollo/client';

export const GET_USERS = gql`
	query {
		users {
			id
			username
			email
			name
			lastName
			createDate
			roles {
				id
				name
			}
		}
	}
`;

export const GET_USER_ID = gql`
	query GetUserByID($id: ID!) {
		user(id: $id) {
			id
			username
			email
			name
			lastName
			createDate
			roles {
				id
				name
			}
		}
	}
`;

export const MUTATION_USER_ADD = gql`
	mutation RegisterUser(
		$email: String!
		$password: String!
		$roleIds: [ID!]!
	) {
		registerUser(email: $email, password: $password, roleIds: $roleIds)
	}
`;

export const MUTATION_USER_UPDATE = gql`
	mutation UpdateUser(
		$id: ID!
		$name: String!
		$lastName: String!
		$email: String
		$password: String
	) {
		updateUser(
			email: $email
			password: $password
			id: $id
			name: $name
			lastName: $lastName
		) {
			id
		}
	}
`;

export const MUTATION_USER_DELETE = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id)
	}
`;
