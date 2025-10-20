// ExchangeRate
export interface ExchangeRateRequest {}
export interface ExchangeRateResponse {
	ExchangeRateResult?: string;
}

// Interest Rate
export interface InterestRateRequest {}
export interface InterestRateResponse {
	Interest_RateResult?: string;
}

// QueryAccName
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
