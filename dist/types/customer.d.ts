export interface CustomerInfo {
    ci_no: string;
    ci_branch: string;
    customer_title: string;
    customer_engname: string;
    customer_gender: string;
    customer_id_type: string;
    date_birth: string;
    customer_nationality_code: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    village_code: string;
    v_eng_name: string;
    city_code: string;
    d_eng_name: string;
    province_code: string;
    p_eng_name: string;
    tel_no: string;
    tel_no2: string;
    email: string;
    fax_no: string;
}
export interface AccountInfo {
    acct: string;
    acct_branchcode: string;
    prod_code: string;
    acct_type: string;
    l_acname: string;
    e_acname: string;
    ccy: string;
    ac_status: string;
}
export interface GetCimcusmByCif {
    customer: CustomerInfo;
    account: AccountInfo[];
}
//# sourceMappingURL=customer.d.ts.map