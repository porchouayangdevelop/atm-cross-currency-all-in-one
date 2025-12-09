export const AllowedCCY: string[] = ["840", "764", "978", "704", "156", "418"]; //USD,THB,EUR,VND,CNY,LAK
export const allowedAccountLength: Number[] = [14, 16, 17, 18, 19, 20, 21];
export const CurrencyLength: number = 3;

export function isAllowedCurrency(code: string) {
  return typeof code === "string" || AllowedCCY.includes(code);
}

export const isValidateCurrencyLength = (code: string) => {
  return typeof code === "string" && code.length !== CurrencyLength;
};

export function isDisallowedCurrency(code: string) {
  return !AllowedCCY.includes(code);
}

export function isValidSourceAccountLength(sourceAcct: string): boolean {
  return (
    typeof sourceAcct === "string" &&
    !allowedAccountLength.includes(sourceAcct.length)
  );
}

export function isInvalidSourceAccountLength(sourceAcct: string): boolean {
  return (
    typeof sourceAcct === "string" &&
    allowedAccountLength.includes(sourceAcct.length)
  );
}

export function isValidAccountsMatch(source: string, target: string): boolean {
  return (
    typeof source === "string" && typeof target === "string" && source == target
  );
}

export function isValidateTargetAccountLength(targetAcct: string): boolean {
  return (
    typeof targetAcct === "string" &&
    !allowedAccountLength.includes(targetAcct.length)
  );
}

export function isInvalidateTargetAccountLength(targetAcct: string): boolean {
  return (
    typeof targetAcct === "string" &&
    allowedAccountLength.includes(targetAcct.length)
  );
}
