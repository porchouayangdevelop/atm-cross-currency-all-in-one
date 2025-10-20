// Transfer
let fromAccount: string = "";
let targetAccount: string = "";

// deposit
let fromCurrency: string = "";
let targetCurrency: string = "";

function extractAccount(AccNum: string) {
	const [from, target] = AccNum.split("|");
	fromAccount = from ?? "";
	targetAccount = target ?? "";
	return { fromAccount, targetAccount };
}

function extractCurrency(AccNum: string) {
	const [from, target] = AccNum.split("|");
	fromCurrency = from ?? "";
	targetCurrency = target ?? "";
	return { fromCurrency, targetCurrency };
}

export { extractAccount, extractCurrency };
