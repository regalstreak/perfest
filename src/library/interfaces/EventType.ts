export default interface EventType {
	_id: string,
	name: string,
	description: string,
	date: string,
	cost_1: number,
	cost_2?: number,
	cost_4?: number
	image: string,
	venue: string,
}