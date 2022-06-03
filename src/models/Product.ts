import { Schema, model } from "mongoose";
import { ProductProps } from "../interfaces";

const ProductSchema = new Schema<ProductProps>({
	name: {
		type: String,
	},
	image: {
		uri: {
			type: String,
		},
	},
	price: {
		mrp: {
			type: String,
			required: true,
		},
		discount: {
			type: String,
		},
	},
});

// Default export
export default model<ProductProps>("Product", ProductSchema);
