export const FORMAT_SYSTEM_DATE = "YYYY-MM-DD";
export const FORMAT_SYSTEM_DATE_V2 = "HH:mm:ss DD-MM-YYYY";
export const ACCESS_TOKEN_KEY = "acmckk-81293-mvkvlpe-91921";
export const ACCESS_LIST_AFMASTS = "tjqkav-58948-mvdslpe-91781";
export const USER_DATA_KEY = "user-data-key";
export const ACTIVE_CODE = "active-code";
export const PERMISSIONS_KEY = "permissions-key";
export const TEMP_TOKEN_KEY = "gsadf-81293-mvkvdspe-9131";

export const ROWS_PER_PAGE_DEFAULT = 10;

/**
 * Error Code
 */

export const SUCCESS_CODE = 200;
export const UNAUTHORIZED_CODE = 401;
export const MAJOR_CODE = 422;
export const EXCEPTION_CODE = 417;
export const NOTFOUND_CODE = 400;
export const DUPLICATE_TRANSACTION = "75";
export const EXPIRE_CODE = "31";
export const WRONG_OTP = "10";
export const OUTOFTIME = "17";
export const PACKAGE_ERROR = "80";
export const INTERNAL_SERVER_ERROR = 500;

export const MAP_FIELD_PARAMS = {
    page: "pagenumber",
    currentPage: "pagenumber",
    rowsPerPage: "pagesize",
    depositoryAccountNumber: "afacctno",
    stockCode: "symbol",
    status: "td_status",
    voucherNumber: "tranid",
    transactionDate: "txdate",
    transactionType: "tltxcd",
    serialNumber: "otcseri",
    thqCode: "caid",
    roleType: "grouptype",
    roleName: "groupname",
    orderNo: "orderno",
    statementType: "odtype",
    companyCode: "firmid",
    registerDate: "rpdate",
    thqType: "catype",
    statementStatus: "status",
    userId: "userid",
    groupId: "groupid",
    tranId: "tranid",
    transactionId: "tranid",
    orderByTime: "orderby",
    orderbyTime: "orderby",
    createdBy: "create_by",
};

export const MAP_FIELD_BODY = {
    transactionDate: "Txdate",
    depositoryAccountNumber: "Afacctno",
    stockCode: "Symbol",
    otcId: "RefTranId",
    otcSeri: "Series",
    stockQuantity: "Qtty",
    stockQuantityRestricted: "Restrictedqtty",
    stockValue: "Amount",
    note: "Td_Txdesc",
    serialNumber: "Series",
    status: "Td_Status",
    stockType: "Txtype",
    costPrice: "Costprice",
    releaseCode: "IssuedCode",
    receiver: "Recipient",
    bookNumber: "OwnershipCertificate",
    receiveWay: "DirectSubmission_Origin",
    receiverWithdraw: "Recipient_Origin",
    numberCitizenIdentification: "Passport_Origin",
    phone: "PhoneNumber_Origin",
    address: "RecipientAddress",
    // "createdBy":"create_by"
};

export const GROUP_FUNCTION = {
    BALANCE_LOOKING: "1000",
    ORDER_BOOK_LOOKING: "1001",
    RIGHTS_SEARCH: "1002",
    BROWSE_TRANSACTIONS_ONLY: "1003",
    USER_MANAGEMENT_VIEW: "1004",
    USER_MANAGEMENT_MIX: "1005",
    USER_MANAGEMENT_DELETE: "1006",
    USER_MANAGEMENT_ADD: "1007",
    USER_MANAGEMENT_APPROVE: "1008",
    USER_MANAGEMENT_REJECT: "1009",
    GROUP_MANAGEMENT_VIEW: "1010",
    GROUP_MANAGEMENT_MIX: "1011",
    GROUP_MANAGEMENT_DELETE: "1012",
    GROUP_MANAGEMENT_ADD: "1013",
    GROUP_MANAGEMENT_APPROVE: "1014",
    GROUP_MANAGEMENT_REJECT: "1015",
    USER_AUTHORIZATION: "1017",
    TRANSACTIONS_FOR_BUYING_MIX: "1018",
    TRANSACTIONS_FOR_BUYING_DELETE: "1019",
    TRANSACTIONS_FOR_BUYING_ADD: "1020",
    TRANSACTIONS_FOR_BUYING_APPROVE: "1021",
    TRANSACTIONS_FOR_BUYING_REJECT: "1022",
    TRANSACTIONS_FOR_BUYING_VIEW: "1023",
    IMPORT_TRANSACTION_VIEW: "1024",
    IMPORT_TRANSACTION_MIX: "1025",
    IMPORT_TRANSACTION_DELETE: "1026",
    IMPORT_TRANSACTION_ADD: "1027",
    IMPORT_TRANSACTION_APPROVE: "1028",
    IMPORT_TRANSACTION_REJECT: "1029",
    TRANSACTION_REQUIRED_DEPOSIT_VIEW: "1030",
    TRANSACTION_REQUIRED_DEPOSIT_MIX: "1031",
    TRANSACTION_REQUIRED_DEPOSIT_DELETE: "1032",
    TRANSACTION_REQUIRED_DEPOSIT_ADD: "1033",
    TRANSACTION_REQUIRED_DEPOSIT_APPROVE: "1034",
    TRANSACTION_REQUIRED_DEPOSIT_REJECT: "1035",
    TRANSACTION_REQUIRED_WITHDRAWAL_VIEW: "1036",
    TRANSACTION_REQUIRED_WITHDRAWAL_MIX: "1037",
    TRANSACTION_REQUIRED_WITHDRAWAL_DELETE: "1038",
    TRANSACTION_REQUIRED_WITHDRAWAL_ADD: "1039",
    TRANSACTION_REQUIRED_WITHDRAWAL_APPROVE: "1040",
    TRANSACTION_REQUIRED_WITHDRAWAL_REJECT: "1041",
    LOOKUP_TRANSACTIONS: "1042",
    FUND_ADMIN_IMPORT: "1045",
    FUND_ADMIN_APPROVE: "1046",
    FUND_ADMIN_DETAIL: "1047",
};
