declare class ValidateError extends Error {
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    code?: number;
    constructor(message: string, code: number);
    getCode(): number | undefined;
    getMessage(): string;
    getError(): {
        code: number | undefined;
        message: string;
    };
    setCode(code: number): void;
    setMessage(message: string): void;
    setError(error: any): void;
}
export default ValidateError;
//# sourceMappingURL=validateError.d.ts.map