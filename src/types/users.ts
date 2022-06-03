const gql = require("graphql-tag");

module.exports = gql`
	type User {
		id: ID!
		name: String!
		vendor: Boolean
		meta: MetaType
		contact: ContactType
		email: String!
		password: String!
		deliveryAddresses: [UserAddress]
		token: String!
		refreshToken: String!
	}
	type UserAddress {
		name: String!
		line1: String!
		line2: String
		coordinates: Coordinates
		pincode: String!
	}
	type Coordinates {
		latitude: String!
		longitude: String!
	}
	type ContactType {
		ISD: String
		number: String
	}
	type MetaType {
		lastLoginDate: String!
		loginTimes: Int!
		registerDate: String!
	}
	input UpdateAddress {
		name: String!
		line1: String!
		line2: String
		coordinates: CoordinateInput
		pincode: String!
	}
	input CoordinateInput {
		latitude: String!
		longitude: String!
	}
	input RegisterInput {
		name: String!
		vendor: Boolean!
		contact: ContactInput!
		password: String!
	}
	input ContactInput {
		ISD: String
		number: String
	}
	type Query {
		getUser: User!
		getSellers: [User]
	}
	type Mutation {
		register(registerInput: RegisterInput): User!
		login(contact: ContactInput!, password: String!): User!
		updateAddress(updateAddressInput: UpdateAddress): Boolean!
	}
`;

export {};
