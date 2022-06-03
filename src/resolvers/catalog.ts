import Catalog from "../models/Catalog";
import Product from "../models/Product";

const { asyncForEach } = require("../utils");
const checkAuth = require("../checkAuth");

require("dotenv").config();

module.exports = {
	Query: {
		async getCatalog(_: any, { sellerId }: { sellerId: string }) {
			try {
				const catalog = await Catalog.findOne({
					"meta.sellerId": sellerId,
				});

				var products: any[] = [];

				if (catalog) {
					await asyncForEach(
						catalog._doc.products,
						async (product: string) => {
							var prod = await Product.findById(product);
							products.push(prod);
						}
					);
					return { ...catalog._doc, products };
				} else {
					throw new Error("Catalog not found");
				}
			} catch (err: any) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createCatalog(
			_: any,
			{ products }: { products: any[string] },
			req: any
		) {
			const loggedUser = checkAuth(req);

			var catalog,
				res = null;

			if (products.length === 0) {
				throw new Error("Products not mentioned");
			}

			catalog = await Catalog.findOne({
				"meta.sellerId": loggedUser.id,
			});

			if (catalog) {
				var newproducts = [
					...new Set([...products, ...catalog._doc.products]),
				];

				await Catalog.updateOne(
					{
						"meta.sellerId": loggedUser.id,
					},
					{
						$set: {
							products: newproducts,
						},
					}
				);

				return {
					...catalog._doc,
					id: catalog._id,
					products: newproducts,
				};
			} else {
				catalog = new Catalog({
					meta: {
						sellerId: loggedUser.id,
						lastUpdated: new Date().toISOString(),
					},
					products,
				});

				res = await catalog.save();

				const prods: any[] = [];
				await asyncForEach(products, async (product: string) => {
					var p = await Product.findById(product);
					prods.push(p);
				});

				return {
					...res._doc,
					id: res._id,
					products: prods,
				};
			}
		},
	},
};
