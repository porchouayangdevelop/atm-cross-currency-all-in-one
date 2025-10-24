export const AllowedCCY: string[] = ["840", "764", "978", "704", "156", "418"]; //USD,THB,EUR,VND,CNY,LAK
export const allowedAccountLength: Number[] = [14, 16, 17, 18, 19, 20, 21];

export function isAllowedCurrency(code: string) {
	console.log("Validating currency code:", code);
	return (
		typeof code === "string" &&
		code.length === 3 &&
		AllowedCCY.includes(code)
	);
}

export function isDisallowedCurrency(code: string) {
	console.log(`Validating Disallow currency code:`, code);
	return (
		typeof code === 'string' &&
		code.length === 3 &&
		!AllowedCCY.includes(code)
	);
}

export function isValidSourceAccountLength(sourceAcct: string): boolean {
	console.log(`Validating source account length:`, sourceAcct);
	return (
		typeof sourceAcct === 'string' &&
		!allowedAccountLength.includes(sourceAcct.length)
	)
}

export function isInvalidSourceAccountLength(sourceAcct: string): boolean {
	console.log(`Validating invalid source account length:`, sourceAcct);
	return (
		typeof sourceAcct === 'string' &&
		allowedAccountLength.includes(sourceAcct.length)
	)
}

export function isValidAccountsMatch(source: string, target: string): boolean {
	console.log(`Validating source and target accounts match:`, source, target);
	return (
		typeof source === 'string' &&
		typeof target === 'string' &&
		source == target
	)
}

export function isValidateTargetAccountLength(targetAcct: string): boolean {
	console.log(`Validating target account length:`, targetAcct);
	return (
		typeof targetAcct === 'string' &&
		!allowedAccountLength.includes(targetAcct.length)
	)
}

export function isInvalidateTargetAccountLength(targetAcct: string): boolean {
	return (
		typeof targetAcct === 'string' &&
		allowedAccountLength.includes(targetAcct.length)
	)
}

