// export const PERMISSION_LOOKUP_BALANCE = "PERMISSION_LOOKUP_BALANCE";
// export const PERMISSION_LOOKUP_STATEMENT = "PERMISSION_LOOKUP_STATEMENT";
// export const PERMISSION_LOOKUP_PERMISSION = "PERMISSION_LOOKUP_PERMISSION";
// export const PERMISSION_APPROVE_TRANSACTION = "PERMISSION_APPROVE_TRANSACTION";

// export const PERMISSION_GROUP_USER = "PERMISSION_GROUP_USER";
// export const PERMISSION_CREATE_USER = "PERMISSION_CREATE_USER";
// export const PERMISSION_UPDATE_USER = "PERMISSION_UPDATE_USER";
// export const PERMISSION_DELETE_USER = "PERMISSION_DELETE_USER";
// export const PERMISSION_VIEW_USER = "PERMISSION_VIEW_USER";
// export const PERMISSION_APPROVE_USER = "PERMISSION_APPROVE_USER";

// export const PERMISSION_GROUP_ROLE = "PERMISSION_GROUP_ROLE";
// export const PERMISSION_CREATE_ROLE = "PERMISSION_CREATE_ROLE";
// export const PERMISSION_UPDATE_ROLE = "PERMISSION_UPDATE_ROLE";
// export const PERMISSION_DELETE_ROLE = "PERMISSION_DELETE_ROLE";
// export const PERMISSION_VIEW_ROLE = "PERMISSION_VIEW_ROLE";
// export const PERMISSION_APPROVE_ROLE = "PERMISSION_APPROVE_ROLE";

// export const PERMISSION_ROLE_USER = "PERMISSION_ROLE_USER";

// export const PERMISSION_GROUP_ORDER = "PERMISSION_GROUP_ORDER";
// export const PERMISSION_CREATE_ORDER = "PERMISSION_CREATE_ORDER";
// export const PERMISSION_UPDATE_ORDER = "PERMISSION_UPDATE_ORDER";
// export const PERMISSION_DELETE_ORDER = "PERMISSION_DELETE_ORDER";
// export const PERMISSION_VIEW_ORDER = "PERMISSION_VIEW_ORDER";
// export const PERMISSION_APPROVE_ORDER = "PERMISSION_APPROVE_ORDER";

// export const PERMISSION_GROUP_IMPORT = "PERMISSION_GROUP_IMPORT";
// export const PERMISSION_CREATE_IMPORT = "PERMISSION_CREATE_IMPORT";
// export const PERMISSION_UPDATE_IMPORT = "PERMISSION_UPDATE_IMPORT";
// export const PERMISSION_DELETE_IMPORT = "PERMISSION_DELETE_IMPORT";
// export const PERMISSION_VIEW_IMPORT = "PERMISSION_VIEW_IMPORT";
// export const PERMISSION_APPROVE_IMPORT = "PERMISSION_APPROVE_IMPORT";

// export const PERMISSION_GROUP_DEPOSIT = "PERMISSION_GROUP_DEPOSIT";
// export const PERMISSION_CREATE_DEPOSIT = "PERMISSION_CREATE_DEPOSIT";
// export const PERMISSION_UPDATE_DEPOSIT = "PERMISSION_UPDATE_DEPOSIT";
// export const PERMISSION_DELETE_DEPOSIT = "PERMISSION_DELETE_DEPOSIT";
// export const PERMISSION_VIEW_DEPOSIT = "PERMISSION_VIEW_DEPOSIT";
// export const PERMISSION_APPROVE_DEPOSIT = "PERMISSION_APPROVE_DEPOSIT";

// export const PERMISSION_GROUP_WITHDRAW = "PERMISSION_GROUP_WITHDRAW";
// export const PERMISSION_CREATE_WITHDRAW = "PERMISSION_CREATE_WITHDRAW";
// export const PERMISSION_UPDATE_WITHDRAW = "PERMISSION_UPDATE_WITHDRAW";
// export const PERMISSION_DELETE_WITHDRAW = "PERMISSION_DELETE_WITHDRAW";
// export const PERMISSION_VIEW_WITHDRAW = "PERMISSION_VIEW_WITHDRAW";
// export const PERMISSION_APPROVE_WITHDRAW = "PERMISSION_APPROVE_WITHDRAW";

export const PERMISSION_LOOKUP_BALANCE = 1000;
export const PERMISSION_LOOKUP_STATEMENT = 1001;
export const PERMISSION_LOOKUP_PERMISSION = 1002;
export const PERMISSION_APPROVE_TRANSACTION = 1003;

export const PERMISSION_GROUP_USER = "PERMISSION_GROUP_USER";
export const PERMISSION_VIEW_USER = 1004;
export const PERMISSION_UPDATE_USER = 1005;
export const PERMISSION_DELETE_USER = 1006;
export const PERMISSION_CREATE_USER = 1007;
export const PERMISSION_APPROVE_USER = 1008;
export const PERMISSION_REJECT_USER = 1009;

export const PERMISSION_GROUP_ROLE = "PERMISSION_GROUP_ROLE";
export const PERMISSION_VIEW_ROLE = 1010;
export const PERMISSION_UPDATE_ROLE = 1011;
export const PERMISSION_DELETE_ROLE = 1012;
export const PERMISSION_CREATE_ROLE = 1013;
export const PERMISSION_APPROVE_ROLE = 1014;
export const PERMISSION_REJECT_ROLE = 1015;

export const USER_AUTHORIZATION = 1017;
export const PERMISSION_ROLE_USER = 1017;

export const PERMISSION_GROUP_ORDER = "PERMISSION_GROUP_ORDER";
export const PERMISSION_UPDATE_ORDER = 1018;
export const PERMISSION_DELETE_ORDER = 1019;
export const PERMISSION_CREATE_ORDER = 1020;
export const PERMISSION_APPROVE_ORDER = 1021;
export const PERMISSION_REJECT_ORDER = 1022;
export const PERMISSION_VIEW_ORDER = 1023;

export const PERMISSION_GROUP_IMPORT = "PERMISSION_GROUP_IMPORT";
export const PERMISSION_VIEW_IMPORT = 1024;
export const PERMISSION_UPDATE_IMPORT = 1025;
export const PERMISSION_DELETE_IMPORT = 1026;
export const PERMISSION_CREATE_IMPORT = 1027;
export const PERMISSION_APPROVE_IMPORT = 1028;
export const PERMISSION_REJECT_IMPORT = 1029;

export const PERMISSION_GROUP_DEPOSIT = "PERMISSION_GROUP_DEPOSIT";
export const PERMISSION_VIEW_DEPOSIT = 1030;
export const PERMISSION_UPDATE_DEPOSIT = 1031;
export const PERMISSION_DELETE_DEPOSIT = 1032;
export const PERMISSION_CREATE_DEPOSIT = 1033;
export const PERMISSION_APPROVE_DEPOSIT = 1034;
export const PERMISSION_REJECT_DEPOSIT = 1035;

export const PERMISSION_GROUP_WITHDRAW = "PERMISSION_GROUP_WITHDRAW";
export const PERMISSION_VIEW_WITHDRAW = 1036;
export const PERMISSION_UPDATE_WITHDRAW = 1037;
export const PERMISSION_DELETE_WITHDRAW = 1038;
export const PERMISSION_CREATE_WITHDRAW = 1039;
export const PERMISSION_APPROVE_WITHDRAW = 1040;
export const PERMISSION_REJECT_WITHDRAW = 1041;
export const LOOKUP_TRANSACTIONS = 1042;

export const FUND_ADMIN_IMPORT = 1045;
export const FUND_ADMIN_APPROVE = 1046;
export const FUND_ADMIN_DETAIL = 1047;

export const mapPremissionApproveReject = {
    1008: 1009,
    1014: 1015,
    1022: 1023,
    1028: 1029,
    1034: 1035,
    1040: 1041,
};

export const mapRoleToDetail = {
    PERMISSION_GROUP_USER: [1004, 1005, 1006, 1007, 1008, 1009],
    PERMISSION_GROUP_ROLE: [1010, 1011, 1012, 1013, 1014, 1015],
    PERMISSION_GROUP_ORDER: [1018, 1019, 1020, 1021, 1022, 1023],
    PERMISSION_GROUP_IMPORT: [1024, 1025, 1026, 1027, 1028, 1029],
    PERMISSION_GROUP_DEPOSIT: [1030, 1031, 1032, 1033, 1034, 1035],
    PERMISSION_GROUP_WITHDRAW: [1036, 1037, 1038, 1039, 1040, 1041],
};
