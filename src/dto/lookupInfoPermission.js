import { formatDate } from "src/common/utils/helper";

export const lookupInfoPermissionDto = (dataRes) => {
    return {
        id: dataRes.CAID,
        thqCode: dataRes.CAID,
        THQType: dataRes.CATYPE,
        THQTypeVi: dataRes.VN_CATYPE,
        THQTypeEn: dataRes.EN_CATYPE,
        stockCode: dataRes.SYMBOL,
        registerDate: formatDate(
            dataRes.REPORTDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        roFromDate: formatDate(
            dataRes.ROFROMDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        roToDate: formatDate(
            dataRes.ROTODATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        THQDate: formatDate(
            dataRes.ACTIONDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        ratioExchangeStockToPermission: dataRes.RIGHTRATE,
        ratioExchangePermissionToMoney: dataRes.RTOCRATE,
        ratioExchangePermissionToStock: dataRes.RTOSRATE,
        purchaseNewPrice: dataRes.ROPARVALUE,
        ratioBonds: dataRes.INTRATE,
        retail: dataRes.RETAIL,
        retailVi: dataRes.VN_TRANSFER,
        retailEn: dataRes.EN_TRANSFER,
        transfer: dataRes.TRANSFER,
        transferVi: dataRes.VN_RETAIL,
        transferEn: dataRes.EN_RETAIL,
        KHQTransactionFrom: dataRes.TRFFROMDATE_TEXT,
        // formatDate(
        //     dataRes.TRFFROMDATE_TEXT,
        //     "DD/MM/YYYY",
        //     "YYYY-MM-DD'T'HH:mm:ss"
        // ),
        transferFromDate: dataRes.TRFFROMDATE_TEXT,
        //  formatDate(
        //     dataRes.TRFFROMDATE_TEXT,
        //     "DD/MM/YYYY",
        //     "YYYY-MM-DD'T'HH:mm:ss"
        // ),
        transferToDate: dataRes.TRFTODATE_TEXT,
        //  formatDate(
        //     dataRes.TRFTODATE_TEXT,
        //     "DD/MM/YYYY",
        //     "YYYY-MM-DD'T'HH:mm:ss"
        // ),
        KHQTransactionTo: dataRes.TRFTODATE_TEXT,
        //  formatDate(
        //     dataRes.TRFTODATE_TEXT,
        //     "DD/MM/YYYY",
        //     "YYYY-MM-DD'T'HH:mm:ss"
        // ),
        expiredDate: dataRes.REGDUEDATE_TEXT,
        //  formatDate(
        //     dataRes.REGDUEDATE_TEXT,
        //     "DD/MM/YYYY",
        //     "YYYY-MM-DD'T'HH:mm:ss"
        // ),
        taxCollect: dataRes.TAXCOLLECT,
        taxCollectVi: dataRes.VN_TAXCOLLECT,
        taxCollectEn: dataRes.EN_TAXCOLLECT,
        status: dataRes.STATUS,
        statusVi: dataRes.VN_STATUS,
        statusEn: dataRes.EN_STATUS,
    };
};
