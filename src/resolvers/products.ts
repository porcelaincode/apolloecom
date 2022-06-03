import { ProductProps } from "../interfaces";
import Product from "../models/Product";

require("dotenv").config();

module.exports = {
	Query: {
		async getProducts(_: any, {}) {
			try {
				const products = await Product.find().sort({ descending: 1 });

				if (products) {
					return products;
				} else {
					throw new Error("Products not found");
				}
			} catch (err: any) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async addProduct(_: any, { product }: { product: ProductProps }) {
			const _product = new Product({
				...product,
			});

			const res = await _product.save();

			return {
				...res._doc,
				id: res._id,
			};
		},
	},
};
