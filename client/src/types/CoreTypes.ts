export interface choosenProcess {
	data: {
		name: string;
		url: string;
	} | null;
}

export interface Result<T> {
	isSuccess: boolean;
	value: T;
	error: string;
}

export interface FileResult {
	Code: number;
	Message: string;
	Data: {
		FileUrl: string;
		FilePathUrl: string;
	};
}
