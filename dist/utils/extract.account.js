"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractAccount = extractAccount;
exports.extractCurrency = extractCurrency;
let fromAccount = "";
let targetAccount = "";
let fromCurrency = "";
let targetCurrency = "";
function extractAccount(AccNum) {
    const [from, target] = AccNum.split("|");
    fromAccount = from ?? "";
    targetAccount = target ?? "";
    return { fromAccount, targetAccount };
}
function extractCurrency(AccNum) {
    const [from, target] = AccNum.split("|");
    fromCurrency = from ?? "";
    targetCurrency = target ?? "";
    return { fromCurrency, targetCurrency };
}
//# sourceMappingURL=extract.account.js.map