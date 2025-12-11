export const validateFailedCode: string[] = [
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
  "12": "Not Actived Account, Account cancellation, invalid",
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

const mappingAccountStatus: Record<string, string> = {
  // "1": "Not audited (no payment but no payment)",
  // "2": "not activated",
  // "3": "long time hanging",
  // "5": "Password loss",
  // "6": "Password lock",
  // "7": "Voucher port",
  // "8": "Report loss",
  "9": "BLOCK NO DEBIT", // withdrawal block
  // "10": "Account cancellation (only paid but not received)",
  "12": "BLOCK NO CREDIT", // deposit block
  // "13": "To be inspected annually",
  // "14": "Unannual inspection (no payment but no payment)",
  "16": "BLOCK ACCOUNT (the bank)", // deposit-withdrawal block
  "17": "BLOCK ACCOUNT(authority)", // deposit-withdrawal block
  // "25": "AMOUNT BLOCKED",
  // "42": "Interbank Agreement",
  // "43": "Unit Agreement",
  // "44": "Unit Smart Communication",
  // "46": "Industry regular",
  // "47": "Public account",
  // "49": "Group account? ?",
  // "59": "Off-site account opening? ? DDZUOPAC(DEVWFH)",
  // "63": "Electronic account? ? DDZUOPAC(DEVWFH)",
  // "70": "Characteristic interest rate ",
  "71": "FROZEN ACCOUNT(Can't do anything )", //deposit-withdrawal block
  // "94": "Transfer from permanent household to permanent household (0115202)",
  // "95": "Exemption from immovable account fee (0115202)",
  // "96": "Set up a fixed account online (0115202)",
  // "4": "Dormant Account ",
  "00": "All normal",
};

export const getFaildedCode = (code: string) =>
  validateFailedCode.includes(code);

export const getValidateFailedMessage = (code: string) =>
  mapping[code] || "Validate failed";

export const getValidateAccountMapping = (source: string) => {
 return  mappingAccountStatus[source];
}