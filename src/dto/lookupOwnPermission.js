import {formatDate} from "src/common/utils/helper";

export const lookupOwnPermissionDto = (dataRes) => {

    return {
        id: dataRes.CAID,
        thqCode: dataRes.CACODE,
        THQType: dataRes.CATYPE,
        THQTypeVi: dataRes.VN_CATYPE,
        THQTypeEn: dataRes.EN_CATYPE,
        thqName: dataRes.CANAME,
        stockCode: dataRes.SYMBOL,
        registerDate: formatDate(dataRes.REPORTDATE, 'DD/MM/YYYY', "YYYY-MM-DD'T'HH:mm:ss"),
        depositoryAccountNumber: dataRes.AFACCTNO,
        accountName: dataRes.AFNAME,
        moneyAccount: dataRes.CASHACCOUNT,
        permissionStockNumber: dataRes.REPORTQTTY,
        amountMoney: dataRes.AMT,
        amountAfterTax: dataRes.AMT_AFTER_TAX,
        stockNewQuantity: dataRes.EXEQTTY,
        moneyExchange: dataRes.RETAILAMT,
        status: dataRes.STATUS,
        statusVi: dataRes.VN_STATUS,
        statusEn: dataRes.EN_STATUS,
    }
}
