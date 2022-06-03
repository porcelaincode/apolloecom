const gql = require("graphql-tag");

module.exports = gql`
	type Product {
		id: ID!
		name: String!
		price: PriceType
		image: ImageType
	}
	type PriceType {
		mrp: String!
		sale: String
	}
	type ImageType {
		uri: String!
	}
	input ProductInput {
		name: String!
		price: PriceInput
		image: ImageInput
	}
	input PriceInput {
		mrp: String!
		sale: String
	}
	input ImageInput {
		uri: String!
	}
	type Query {
		getProducts: [Product]!
	}
	type Mutation {
		addProduct(product: ProductInput): Product!
	}
`;

export {};
