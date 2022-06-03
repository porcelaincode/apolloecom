const gql = require("graphql-tag");

module.exports = gql`
	type Catalog {
		meta: CatalogMetaType!
		products: [Product]
	}
	type CatalogMetaType {
		sellerId: String!
		lastUpdated: String!
	}
	type Query {
		getCatalog(sellerId: String!): Catalog!
	}
	type Mutation {
		createCatalog(products: [String]): Catalog!
	}
`;

export {};
