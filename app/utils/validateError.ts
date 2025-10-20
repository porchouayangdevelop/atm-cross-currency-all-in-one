class ValidateError extends Error {
	message: string;
	stack?: string | undefined;
	cause?: unknown;
	code?: number;
	
	constructor(message: string, code: number) {
		super(message);
		this.message = message;
		this.code = code;
	}
	getCode() {
		return this.code;
	}
	getMessage() {
		return this.message;
	}
	getError() {
		return {
			code: this.code,
			message: this.message,
		};
	}
	
	setCode(code: number) {
		this.code = code;
	}
	setMessage(message: string) {
		this.message = message;
	}
	setError(error: any) {
		this.code = error.code;
		this.message = error.message;
	}
}
export default ValidateError;
