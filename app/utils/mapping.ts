const validateFailedCode: string[] = [
	"01",
	"02",
	"03",
	"04",
	"05",
	"12",
	"13",
	"14",
	"15",
	"20",
	"25",
	"51",
	"25",
	"57",
	"58",
	"76",
	"91",
	"96",
];

const mapping: Record<string, string> = {
	"01": "The targe account does not exists...",
	"02": "Account closed",
	"03": "Invalid merchant",
	"04": "Deposit not allowed ",
	"05": "Not audited,Frozen Account",
	"06": "Incorrect numeric code of currency",
	"07": "Account number length is invalid",
	"08": "The targe account number same as from account number",
	"09": "The target account is not allwowed length",
	"10": "Invalid cross currency",
	"12": "Not Acctived Account, Account cancellation, invalid",
	"13": "Voucher loss",
	"14": "Invalid account number (no such number)",
	"15": "No such issuer",
	"20": "Non-Transaction Account (loan or savings-only account)",
	"25": "Unable to locate record",
	"51": "Amount Block",
	"57": "Transaction not permitted to cardholder",
	"58": "Block No Debit/Credit,Transaction not permitted to terminal",
	"76": "currency not supported (non-standard, extended), not allowed cross currency",
	"91": "BLOCK ACCOUNT (authority,bank)",
	"96": "Password loss",
};

const getFaildedCode = (code: string) => {
	return validateFailedCode.includes(code);
}

const getValidateFailedMessage = (code: string) => {
	return mapping[code] || "Validate failed";
};

export {validateFailedCode, getValidateFailedMessage, getFaildedCode};