import { formatDate } from "src/common/utils/helper";

export const lookupStatementDto = (dataRes) => {
    return {
        id: dataRes.ORDERID,
        orderNo: dataRes.ORDERNO,
        statementType: dataRes.ODTYPE,
        statementTypeVi: dataRes.VN_ODTYPE,
        statementTypeEn: dataRes.EN_ODTYPE,
        depositoryAccountNumber: dataRes.AFACCTNO,
        stockCode: dataRes.SYMBOL,
        transactionDate: formatDate(
            dataRes.TXDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        status: dataRes.STATUS,
        statusNameVi: dataRes.VN_STATUS,
        statusNameEn: dataRes.EN_STATUS,
        stockQuantity: dataRes.ORDERQTTY,
        costPrice: dataRes.ORDERPRICE,
        clearDay: dataRes.CLEARDAY,
        commissionFee: dataRes.FEEAMT,
        transFee: dataRes.FEERECORD,
        totalAmount: dataRes.EXECAMT,
        tax: dataRes.TAX,
        pendAmount: dataRes.PEND_AMOUNT,
        companyCode: dataRes.FIRMID,
    };
};
