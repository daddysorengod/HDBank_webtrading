import { formatDate } from "src/common/utils/helper";
import { formatMoney } from "src/helpers/formatMoney";

export const orderTransactionStock = (dataRes, index, pageIndex, pageSize) => {
    return {
        tranid: dataRes?.tranid,
        voucherNumber: dataRes.Id,
        depositoryAccountNumber: dataRes.Afacctno,
        registerDate: formatDate(
            dataRes.REPORTDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        caid: dataRes.Caid,
        stockCode: dataRes.Symbol,
        transactionDate: formatDate(
            dataRes.Txdate,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        permissionQuantity: formatMoney(dataRes.Rightqtt),
        registerStockQuantity: formatMoney(dataRes.Qtty),
        payAmount: formatMoney(dataRes.Amount),
        status: dataRes.Td_Status,
        index: (pageIndex - 1) * pageSize + index + 1,
        startDate: dataRes.TRFFROMDATE
            ? formatDate(
                  dataRes.TRFFROMDATE,
                  "DD/MM/YYYY",
                  "YYYY-MM-DD'T'HH:mm:ss"
              )
            : "",
        endDate: dataRes.REGDUEDATE
            ? formatDate(
                  dataRes.REGDUEDATE,
                  "DD/MM/YYYY",
                  "YYYY-MM-DD'T'HH:mm:ss"
              )
            : "",
        rate: dataRes?.RTOSRATE,
        purchasePrice: formatMoney(dataRes?.ROPARVALUE),
        numberOfSecuritiesPurchased: formatMoney(dataRes.SHARE_AVAILABLE),
    };
};
