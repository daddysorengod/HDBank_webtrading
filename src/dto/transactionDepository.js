import { formatDate } from "src/common/utils/helper";
import StockType from "src/common/types/stock";

export const transactionDepositoryDto = (dataRes) => {
    return {
        id: dataRes.Id,
        depositoryAccountNumber: dataRes.Afacctno,
        customerCode: dataRes.Cifno,
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
        releaseCode: dataRes.IssuedCode,
        stockType:
            dataRes?.Txtype === "12"
                ? StockType.WAITING_TRANSACTION.value
                : StockType.TRANSACTION.value,
        Recipient: dataRes.Recipient,
        Passport: dataRes.Passport,
        PhoneNumber: dataRes.PhoneNumber,
        registration:
            dataRes?.DirectSubmission === 1
                ? "1"
                : dataRes?.SentByPost === 1
                ? "2"
                : dataRes?.SecuritiesIssuer
                ? "3"
                : null,
        OwnershipCertificate: dataRes?.OwnershipCertificate,
    };
};
