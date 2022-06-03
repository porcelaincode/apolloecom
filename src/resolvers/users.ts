import {
	ContactProps,
	DeliveryAddressProps,
	RegisterProps,
	UserProps,
} from "../interfaces";
import User from "../models/User";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { UserInputError } = require("apollo-server-express");
const { validateRegisterInput, validateLoginInput } = require("../validators");

const checkAuth = require("../checkAuth");

require("dotenv").config();

function generateToken(user: UserProps) {
	return jwt.sign(
		{
			id: user.id,
			name: user.name,
			contact: user.contact,
		},
		process.env.SECRET_KEY,
		{ expiresIn: "7d" }
	);
}

function generateRefreshToken(user: UserProps) {
	return jwt.sign(
		{
			id: user.id,
		},
		process.env.REFRESH_KEY
	);
}

module.exports = {
	Query: {
		async getUser(_: any, {}, req: any) {
			const loggedUser = checkAuth(req);

			try {
				const user = await User.findById(loggedUser.id);
				if (user) {
					return user;
				} else {
					throw new Error("User not found");
				}
			} catch (err: any) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async login(
			_: any,
			{ contact, password }: { contact: ContactProps; password: string }
		) {
			console.log(`Login request recieved from ${contact.number}`);
			const { errors, valid } = validateLoginInput(contact, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await User.findOne({
				"contact.number": contact.number,
			});

			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const validLogin = await bcrypt.compare(password, user?.password);

			if (!validLogin) {
				throw new Error("Password incorrect. Try Again");
			}

			const token = generateToken(user);
			const refreshToken = generateRefreshToken(user);

			await User.updateOne(
				{ _id: user._id },
				{
					$set: {
						meta: {
							lastLoginDate: new Date().toISOString(),
							loginTimes: user._doc.meta.loginTimes + 1,
						},
					},
				}
			);

			return {
				...user._doc,
				id: user._id,
				token,
				refreshToken,
			};
		},
		async register(
			_: any,
			{ registerInput }: { registerInput: RegisterProps }
		) {
			// validate user data
			const { valid, errors } = validateRegisterInput(
				registerInput.contact,
				registerInput.password
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user_ = await User.findOne({
				"contact.number": registerInput.contact.number,
			});

			if (user_) {
				throw new UserInputError("Contact is taken", {
					errors: {
						contact: "This contact is taken",
					},
				});
			}

			// hash the password and create auth token
			const password = await bcrypt.hash(registerInput.password, 12);

			const newUser = new User({
				...registerInput,
				meta: {
					lastLoginDate: new Date().toISOString(),
					loginTimes: 1,
					registerDate: new Date().toISOString(),
				},
				password,
			});

			const res = await newUser.save();

			const token = generateToken(res);
			const refreshToken = generateRefreshToken(res);

			console.log(`User ${res._id} registered.`);

			return {
				...res._doc,
				id: res._id,
				token,
				refreshToken,
			};
		},
		async updateAddress(
			_: any,
			{
				updateAddressInput,
			}: { updateAddressInput: DeliveryAddressProps },
			req: any
		) {
			const loggedUser = checkAuth(req);

			const user_ = await User.updateOne(
				{ _id: loggedUser.id },
				{
					$push: {
						deliveryAddresses: {
							...updateAddressInput,
						},
					},
				}
			);

			return user_.modifiedCount ? true : false;
		},
	},
};
