export interface ExchangeRateRequest {
}
export interface ExchangeRateResponse {
    ExchangeRateResult?: string;
}
export interface InterestRateRequest {
}
export interface InterestRateResponse {
    Interest_RateResult?: string;
}
export interface QueryAccNameRequest {
    ATMID?: string;
    AccNum?: string;
}
export interface QueryAccNameResponse {
    QueryAccNameResult?: string;
}
export interface DepositItems {
    acct: string;
    ci: string;
    name: string;
    ccy: string;
    transaction_type: string;
    is_allowed: string;
    from_ccy: string;
    to_ccy: string;
    status_message: string;
    currency?: string;
    from_account?: string;
    target_account?: string;
    from_currency?: string;
    target_currency?: string;
}
//# sourceMappingURL=account.inq.d.ts.map