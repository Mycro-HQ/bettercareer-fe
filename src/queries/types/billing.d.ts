export interface PlansData {
	id: string;
	currency: string;
	lookup_key: string;
	amount: number;
	product: {
		id: string;
		name: string;
		description: string | null;
	};
}

export interface BillingSessionResponse {
	message: string;
	data: {
		url: string;
	};
}
