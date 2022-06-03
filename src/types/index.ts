// auth
const authTypedefs = require("./users");

// retail
const orderTypedefs = require("./orders");
const productTypedefs = require("./product");
const catalogTypedefs = require("./catalog");

module.exports = [
	authTypedefs,
	orderTypedefs,
	productTypedefs,
	catalogTypedefs,
];
