const gql = require("graphql-tag");

module.exports = gql`
	type Order {
		buyerId: String!
		sellerId: String!
		meta: OrderMetaType
		products: [Product]
	}
	type OrderMetaType {
		paid: Boolean!
		placedDate: String!
	}
	type Query {
		getOrders: [Order]!
	}
	type Mutation {
		createOrder(products: [String]!, sellerId: String!): Order!
	}
`;

export {};
