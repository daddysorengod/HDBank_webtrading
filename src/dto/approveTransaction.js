import { formatDate } from "src/common/utils/helper";

export const approveTransactionDto = (dataRes) => {
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
        status: dataRes.Td_Status,
        createdBy: dataRes.Created_By_Name,
        approveBY: dataRes.Bo_Approved_By_Name,
        cancelBy: dataRes.Bo_Cancel_By_Name,
        transId: dataRes.Id,
    };
};

export const lookupTransactionDto = (dataRes) => {
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
        status: dataRes.Td_Status,
        createdBy: dataRes.Created_By_Name,
        approveBY: dataRes.Bo_Approved_By_Name,
        cancelBy: dataRes.Bo_Cancel_By_Name,
        transId: dataRes.Id,
        XmlFile: dataRes.XmlFile,
        HtmlFile: dataRes.HtmlFile,
        filesSave: "",
    };
};
