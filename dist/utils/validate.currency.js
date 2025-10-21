"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AllowedCCY = ["840", "764", "978", "704", "156", "418"];
function validateCode(code) {
    return (typeof code === "string" && code.length === 3 && AllowedCCY.includes(code));
}
exports.default = validateCode;
//# sourceMappingURL=validate.currency.js.map