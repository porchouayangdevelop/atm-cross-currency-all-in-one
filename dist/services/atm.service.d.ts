declare const service: {
    SMS4ATM_UAT: {
        SMS4ATM_UATSoap: {
            ExchangeRate: (_args: any, callback: any) => Promise<void>;
            Interest_Rate: (_args: any, callback: any) => Promise<void>;
            QueryAccName: (args: any) => Promise<string | {
                QueryAccNameResult: any;
            } | undefined>;
        };
    };
};
export default service;
//# sourceMappingURL=atm.service.d.ts.map