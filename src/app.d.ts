declare global {
	namespace App {
		interface Error {
			message: string;
			stack?: any;
		}
	}
}

export {};
