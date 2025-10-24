"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedAccountLength = exports.AllowedCCY = void 0;
exports.isAllowedCurrency = isAllowedCurrency;
exports.isDisallowedCurrency = isDisallowedCurrency;
exports.isValidSourceAccountLength = isValidSourceAccountLength;
exports.isInvalidSourceAccountLength = isInvalidSourceAccountLength;
exports.isValidAccountsMatch = isValidAccountsMatch;
exports.isValidateTargetAccountLength = isValidateTargetAccountLength;
exports.isInvalidateTargetAccountLength = isInvalidateTargetAccountLength;
exports.AllowedCCY = ["840", "764", "978", "704", "156", "418"];
exports.allowedAccountLength = [14, 16, 17, 18, 19, 20, 21];
function isAllowedCurrency(code) {
    console.log("Validating currency code:", code);
    return (typeof code === "string" &&
        code.length === 3 &&
        exports.AllowedCCY.includes(code));
}
function isDisallowedCurrency(code) {
    console.log(`Validating Disallow currency code:`, code);
    return (typeof code === 'string' &&
        code.length === 3 &&
        !exports.AllowedCCY.includes(code));
}
function isValidSourceAccountLength(sourceAcct) {
    console.log(`Validating source account length:`, sourceAcct);
    return (typeof sourceAcct === 'string' &&
        !exports.allowedAccountLength.includes(sourceAcct.length));
}
function isInvalidSourceAccountLength(sourceAcct) {
    console.log(`Validating invalid source account length:`, sourceAcct);
    return (typeof sourceAcct === 'string' &&
        exports.allowedAccountLength.includes(sourceAcct.length));
}
function isValidAccountsMatch(source, target) {
    console.log(`Validating source and target accounts match:`, source, target);
    return (typeof source === 'string' &&
        typeof target === 'string' &&
        source == target);
}
function isValidateTargetAccountLength(targetAcct) {
    console.log(`Validating target account length:`, targetAcct);
    return (typeof targetAcct === 'string' &&
        !exports.allowedAccountLength.includes(targetAcct.length));
}
function isInvalidateTargetAccountLength(targetAcct) {
    return (typeof targetAcct === 'string' &&
        exports.allowedAccountLength.includes(targetAcct.length));
}
//# sourceMappingURL=validate.currency.js.map