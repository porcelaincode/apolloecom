import { ContactProps } from "./interfaces";

const validateRegisterInput = (contact: ContactProps, password: string) => {
	const errors: any = {};

	if (password.trim() === "") {
		errors.password = "Password must not be empty";
	}
	if (contact.number.trim().length === 0) {
		errors.email = "Contact must not be empty";
	} else {
		const regEx =
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
		if (!contact.number.match(regEx)) {
			errors.number = "Contact must have a valid format";
		}
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

const validateLoginInput = (contact: ContactProps, password: string) => {
	const errors: any = {};

	if (password.trim() === "") {
		errors.password = "Password must not be empty";
	}
	if (contact.number.trim() === "") {
		errors.contact.number = "Contact must not be empty";
	} else if (contact.number.length !== 10) {
		errors.contact.number = "Contact must be valid.";
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

const validateOrderInput = (products: any[string], sellerId: string) => {
	const errors: any = {};
	if (products.length === 0) {
		errors.products = "SellerId must not be empty";
	}
	if (sellerId.trim() === "") {
		errors.sellerId = "SellerId must not be empty";
	}
	return {
		errors,
		valid: Object.keys(errors).length < 1,
	};
};

const camelCase = (str: string) => {
	return str
		.replace(/\s(.)/g, function (a) {
			return a.toUpperCase();
		})
		.replace(/\s/g, "")
		.replace(/^(.)/, function (b) {
			return b.toLowerCase();
		});
};

module.exports = {
	validateRegisterInput,
	validateLoginInput,
	validateOrderInput,
	camelCase,
};
