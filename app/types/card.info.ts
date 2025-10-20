export interface AccountList {
	branchCode: string;
	acctType: string;
	eName: string;
	lName: string;
	prodCode: string;
	ccy: string;
	ac_status: string;
}


export interface CardInfo {
	ci_no: string;
	ci_branchcode: string;
	customerTitle: string;
	customerEngName: string;
	customerGender: string;
	customerIdType: string;
	dateBirth: string;
	customerNationalityCode: string;
	tellNo: string;
	tellNo2: string;
	email: string;
	faxNo: string;
	address2: string;
	villageCode: string;
	villageEngName: string;
	cityCode: string;
	cityEngName: string;
	provinceCode: string;
	provinceName: string;
	acctList: Array<AccountList>;
}