import { Schema, model } from "mongoose";
import { DeliveryAddressProps, UserProps } from "../interfaces";

const DeliverySchema = new Schema<DeliveryAddressProps>(
	{
		name: {
			type: String,
		},
		line1: {
			type: String,
		},
		line2: {
			type: String,
		},
		pincode: {
			type: String,
		},
		coordinates: {
			latitude: { type: String, required: true },
			longitude: { type: String, required: true },
		},
	},
	{ _id: true }
);

const UserSchema = new Schema<UserProps>({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	vendor: {
		type: Boolean,
		required: true,
		default: false,
	},
	meta: {
		lastLoginDate: {
			type: String,
		},
		loginTimes: {
			type: Number,
			default: 0,
		},
		registerDate: {
			type: String,
		},
	},
	password: {
		type: String,
		required: true,
		min: 5,
	},
	contact: {
		ISD: {
			type: String,
			required: true,
			min: 1,
			max: 4,
		},
		number: {
			type: String,
			required: true,
			min: 10,
			max: 12,
		},
	},
	email: {
		type: String,
		min: 6,
		max: 255,
	},
	deliveryAddresses: [DeliverySchema],
});

// Default export
export default model<UserProps>("User", UserSchema);
