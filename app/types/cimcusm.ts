export interface Cimcusm {
	accountCurrencyCode: string;
	accountName: string;
	acct: string;
	acctType: string;
	address1: string;
	address2: string;
	birthOfDate: string;
	branch: string;
	brn: string;
	cif: string;
	countAcct: string;
	customerGender: string;
	customerIDType: string;
	customerName: string;
	customerTitle: string;
	email: string;
	faxNo: string;
	handPhone: string;
	nationalityCode: string;
	status: string;
	tellNo: string;
	tellNo2: string;
}

export interface GetCimcusmByCifRequest {
	cif: string;
	type: "D" | "C";
}

export interface GetCimcusmByCifResponse {
	cimcusm: Cimcusm[];
}