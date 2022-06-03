import { Schema, model } from "mongoose";
import { CatalogProps } from "../interfaces";

const CatalogSchema = new Schema<CatalogProps>({
	meta: {
		sellerId: {
			type: String,
			required: true,
		},
		lastUpdated: {
			type: String,
		},
	},
	products: [{ type: String, required: true }],
});

// Default export
export default model<CatalogProps>("Catalog", CatalogSchema);
