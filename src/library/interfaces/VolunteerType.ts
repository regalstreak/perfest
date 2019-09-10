export interface VolunteerType {
	_id: string;
	name: string;
	contact: {
		email: string;
		phone: string;
	}
	college: {
		name: string;
		department: string;
		year: string;
	}
	events: string[];
	sold: {
		ticket: string[];
		amountCollected: number;
	}
}