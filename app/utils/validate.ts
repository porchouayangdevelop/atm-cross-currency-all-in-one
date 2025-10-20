import ValidateError from "./validateError";

const cardType: string[] = ['D', 'C'];


function validateLetter(str: string): boolean {
	return /[a-zA-Z]/.test(str);
}

function validateLength(str: string): boolean {
	return (typeof str === 'string' && str.length !== 16 && str.startsWith('0000'));
}

function validateLength1(str: string): boolean {
	return (typeof str === 'string' && str.length !== 12 && str.length !== 16)
}

function validateNull(value: string | null | undefined, fieldName: string): string {
	if (!value) {
		throw new ValidateError(`${value} - ${fieldName} is required`, 400)
	}
	return value;
}

function validateUpperCase(value: string, ctx: string): string {
	if (!value) {
		throw new ValidateError(`${ctx} is required`, 400)
	}
	
	const hasUpperCase = /[A-Z]/.test(value);
	if (!hasUpperCase) {
		throw new ValidateError(`your ${ctx} is ${value}, must contain uppercase letter`, 400)
	}
	
	return value;
}

function validateLowerCase(value: string, ctx: string): string {
	if (!value) {
		throw new ValidateError(`${ctx} is required`, 400)
	}
	
	const hasLowerCase = /[a-z]/.test(value);
	if (!hasLowerCase) {
		throw new ValidateError(`your ${ctx} is ${value},  must contain lowercase letter`, 400)
	}
	
	return value;
}

function validateCardType(value: string, ctx: string): string {
	if (!cardType.includes(value)) {
		throw new ValidateError(`your ${ctx} is ${value} incorrect type, must contain card type D or C`, 400)
	}
	
	return value;
}

export {
	validateNull,
	validateLetter,
	validateLength,
	validateLength1,
	validateUpperCase,
	validateLowerCase,
	validateCardType,
}