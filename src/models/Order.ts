import { Schema, model } from "mongoose";
import { OrderProps } from "../interfaces";

const OrderSchema = new Schema<OrderProps>({
	buyerId: {
		type: String,
		required: true,
	},
	sellerId: {
		type: String,
		required: true,
	},
	meta: {
		paid: {
			type: Boolean,
			required: true,
			default: false,
		},
		placedDate: {
			type: String,
		},
	},
	products: [{ type: String, required: true }],
});

// Default export
export default model<OrderProps>("Order", OrderSchema);
