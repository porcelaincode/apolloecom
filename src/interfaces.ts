export interface DocumentResult<T> {
	_doc: T;
	_id: any;
	_nModified: number;
}

export interface ContactProps {
	ISD: string;
	number: string;
}

export interface CoordinateProps {
	longitude: string;
	latitude: string;
}

export interface MetaProps {
	lastLoginDate: string;
	loginTimes: number;
	registerDate: string;
}

export interface UserProps extends DocumentResult<UserProps> {
	id: string;
	name: string;
	contact: ContactProps;
	vendor: boolean;
	email: string;
	password: string;
	meta: MetaProps;
	deliveryAddresses: [DeliveryAddressProps];
}

export interface DeliveryAddressProps {
	name: string;
	line1: string;
	line2: string;
	coordinates: CoordinateProps;
	pincode: string;
}

export interface RegisterProps {
	name: string;
	contact: ContactProps;
	password: string;
	coordinates: CoordinateProps;
	business: boolean;
	categories: [string];
}

export interface UpdateAddressProps {
	line1: string;
	line2: string;
	coordinates: CoordinateProps;
	pincode: string;
	name: string;
}

export interface EditProfileProps {
	name: string;
	contact: ContactProps;
}

export interface ProductProps extends DocumentResult<ProductProps> {
	name: string;
	image: {
		uri: string;
	};
	price: {
		mrp: string;
		sale?: string;
	};
}

export interface CatalogProps extends DocumentResult<CatalogProps> {
	meta: {
		sellerId: string;
		lastUpdated: string;
	};
	products: [ProductProps];
}

export interface OrderProps extends DocumentResult<OrderProps> {
	sellerId: string;
	buyerId: string;
	meta: {
		paid: boolean;
		placedDate: string;
	};
	deliveryAddress: DeliveryAddressProps;
	products: [ProductProps];
}
