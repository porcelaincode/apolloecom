// auth
const authResolvers = require("./users");

// orders
const orderResolvers = require("./orders");
const productResolvers = require("./products");

const catalogResolvers = require("./catalog");

module.exports = {
	Query: {
		...authResolvers.Query,
		...orderResolvers.Query,
		...productResolvers.Query,
		...catalogResolvers.Query,
	},
	Mutation: {
		...authResolvers.Mutation,
		...orderResolvers.Mutation,
		...productResolvers.Mutation,
		...catalogResolvers.Mutation,
	},
};
