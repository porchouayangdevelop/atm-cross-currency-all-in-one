const AllowedCCY: string[] = ["840", "764", "978", "704", "156", "418"]; //USD,THB,EUR,VND,CNY,LAK

function validateCode(code: string) {
	return (
		typeof code === "string" && code.length === 3 && AllowedCCY.includes(code)
	);
}

export default validateCode;

// const currencyCode = "840";
// const isValid = validateCode(currencyCode);
// console.log(isValid); // true

// const invalidCurrencyCode = "123";
// const isInvalid = validateCode(invalidCurrencyCode);
// console.log(isInvalid); // false

