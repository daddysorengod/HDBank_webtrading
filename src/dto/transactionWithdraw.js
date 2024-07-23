import { formatDate } from "src/common/utils/helper";

export const transactionWithdrawDto = (dataRes) => {
    return {
        id: dataRes.Id,
        depositoryAccountNumber: dataRes.Afacctno,
        stockCode: dataRes.Symbol,
        transactionType: dataRes.Tltxcd,
        transactionTypeNameVI: dataRes.Tltxcd_Name,
        transactionTypeNameEN: dataRes.EN_DESCRIPTION
            ? dataRes.EN_DESCRIPTION
            : dataRes.Tltxcd_Name,
        transactionDate: formatDate(
            dataRes.Txdate,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        voucherNumber: dataRes.Id,
        status: dataRes.Td_Status,
        createdBy: dataRes.Bo_Created_By_Name,
        approveBY: dataRes.Bo_Approved_By_Name,
        cancelBy: dataRes.Bo_Cancel_By_Name,
        stockValue: dataRes.Amount,
        stockQuantity: dataRes.Qtty,
        stockQuantityRestricted: dataRes.Restrictedqtty,
        costPrice: dataRes.Costprice,
        note: dataRes.Td_Txdesc,
        otcId: dataRes.RefTranId,
        serialNumber: dataRes.Series,
        receiveWay: dataRes.DirectSubmission_Origin,
        receiverWithdraw: dataRes.Recipient_Origin,
        numberCitizenIdentification: dataRes.Passport_Origin,
        phone: dataRes.PhoneNumber_Origin,
        address: dataRes.RecipientAddress,
    };
};

export const OTCDto = (dataRes) => {
    return {
        otcId: dataRes.OTCID,
        serialNumber: dataRes.OTCSERI,
        otcCode: dataRes.OTCCODE,
        otcSeri: dataRes.OTCSERI,
        depositoryAccountNumberId: dataRes.AFACCTID,
        depositoryAccountNumber: dataRes.AFACCTNO,
        stockQuantity: dataRes.QUANTITY,
        stockValue: dataRes.AMOUNT,
        fullname: dataRes.FULLNAME,
        stockCode: dataRes.SYMBOL,
        transactionDate: formatDate(
            dataRes.TXDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
    };
};
