"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNull = validateNull;
exports.validateLetter = validateLetter;
exports.validateLength = validateLength;
exports.validateLength1 = validateLength1;
exports.validateUpperCase = validateUpperCase;
exports.validateLowerCase = validateLowerCase;
exports.validateCardType = validateCardType;
const validateError_1 = __importDefault(require("./validateError"));
const cardType = ['D', 'C'];
function validateLetter(str) {
    return /[a-zA-Z]/.test(str);
}
function validateLength(str) {
    return (typeof str === 'string' && str.length !== 16 && str.startsWith('0000'));
}
function validateLength1(str) {
    return (typeof str === 'string' && str.length !== 12 && str.length !== 16);
}
function validateNull(value, fieldName) {
    if (!value) {
        throw new validateError_1.default(`${value} - ${fieldName} is required`, 400);
    }
    return value;
}
function validateUpperCase(value, ctx) {
    if (!value) {
        throw new validateError_1.default(`${ctx} is required`, 400);
    }
    const hasUpperCase = /[A-Z]/.test(value);
    if (!hasUpperCase) {
        throw new validateError_1.default(`your ${ctx} is ${value}, must contain uppercase letter`, 400);
    }
    return value;
}
function validateLowerCase(value, ctx) {
    if (!value) {
        throw new validateError_1.default(`${ctx} is required`, 400);
    }
    const hasLowerCase = /[a-z]/.test(value);
    if (!hasLowerCase) {
        throw new validateError_1.default(`your ${ctx} is ${value},  must contain lowercase letter`, 400);
    }
    return value;
}
function validateCardType(value, ctx) {
    if (!cardType.includes(value)) {
        throw new validateError_1.default(`your ${ctx} is ${value} incorrect type, must contain card type D or C`, 400);
    }
    return value;
}
//# sourceMappingURL=validate.js.map