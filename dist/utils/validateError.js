"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidateError extends Error {
    message;
    stack;
    cause;
    code;
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    getMessage() {
        return this.message;
    }
    getError() {
        return {
            code: this.code,
            message: this.message,
        };
    }
    setCode(code) {
        this.code = code;
    }
    setMessage(message) {
        this.message = message;
    }
    setError(error) {
        this.code = error.code;
        this.message = error.message;
    }
}
exports.default = ValidateError;
//# sourceMappingURL=validateError.js.map