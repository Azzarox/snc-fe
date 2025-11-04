export type SuccessResponse<T> = {
	status: number;
	success: true;
	message: string | null;
	data: T;
};

export type ErrorResponse = {
	status: number;
	success: false;
	message: string | null;
	data: never;
	errors?: { [key: string]: any };
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
