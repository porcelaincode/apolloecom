import { OrderProps } from "../interfaces";
import Order from "../models/Order";
import Product from "../models/Product";
import User from "../models/User";

const { asyncForEach } = require("../utils");

const { validateOrderInput } = require("../validators");
const checkAuth = require("../checkAuth");

require("dotenv").config();

module.exports = {
	Query: {
		async getOrders(_: any, {}, req: any) {
			const loggedUser = checkAuth(req);

			try {
				const orders = await Order.find({
					"meta.sellerId": loggedUser.id,
				});
				if (orders) {
					var data: any[] = [];

					// loop over orders
					await asyncForEach(orders, async (order: OrderProps) => {
						var products: any[] = [];

						// loop over products in order
						await asyncForEach(
							order._doc.products,
							async (product: string) => {
								var prod = await Product.findById(product);
								prod && products.push(prod);
							}
						);

						data.push({
							...order._doc,
							products,
						});
					});

					return data;
				} else {
					throw new Error("Orders not found");
				}
			} catch (err: any) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createOrder(
			_: any,
			{ products, sellerId }: { products: any[string]; sellerId: string },
			req: any
		) {
			const loggedUser = checkAuth(req);

			const { valid } = validateOrderInput(products, sellerId);
			if (!valid) {
				throw new Error("Order input error.");
			}

			// check for seller placing order
			const seller = await User.findById(loggedUser.id);
			if (seller?.vendor) {
				throw new Error("Seller cant register order.");
			}

			const order = new Order({
				sellerId,
				buyerId: loggedUser.id,
				meta: {
					placedDate: new Date().toISOString(),
				},
				products,
			});

			const res = await order.save();

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
		},
	},
};
