import { formatDate } from "src/common/utils/helper";

export const importStatementDto = (dataRes) => {
    return {
        id: dataRes.ID,
        voucherNumber: dataRes.ID,
        importDate: formatDate(
            dataRes.CREATED_DATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        approveDate:
            formatDate(
                dataRes.APPROVED_DATE || dataRes.REJECTED_DATE,
                "DD/MM/YYYY",
                "YYYY-MM-DD'T'HH:mm:ss"
            ) != "Invalid date"
                ? formatDate(
                      dataRes.APPROVED_DATE || dataRes.REJECTED_DATE,
                      "DD/MM/YYYY",
                      "YYYY-MM-DD'T'HH:mm:ss"
                  )
                : "",
        status: dataRes.STATUS,
        fileName: dataRes.FILENAME,
        createdBy: dataRes.CREATED_BY,
        approveDenyBy: dataRes.APPROVED_BY || dataRes.REJECTED_BY,
        note: dataRes.DESCRIPTION,
    };
};

export const importStatementDetailDto = (dataRes) => {
    let res = {};
    for (let i in dataRes) {
        const arr = dataRes[i].map((item) => {
            const newItem = { ...item };

            for (const key in newItem) {
                if (
                    typeof newItem[key] === "string" &&
                    newItem[key].match(/^\d{4}-\d{2}-\d{2}T00:00:00$/)
                ) {
                    newItem[key] = newItem[key].slice(0, 10); // Lấy phần YYYY-MM-DD
                }
            }

            return newItem;
        });

        res = { ...res, [i]: arr };
    }
    return {
        id: dataRes.batchId,
        fundCert: res.lstFundCert,
        depositContract: res.lstDepositContract,
        fundCertDeposit: res.lstFundCertDeposit,
        fundStockInvest: res.lstFundStockInvest,
        fundOtc: res.lstFundOtc,
        fundDerivatives: res.lstFundDerivatives,
        loanContract: res.lstLoanContract,
        fundCertInvest: res.lstFundCertInvest,
        fundOddLotTrading: res.lstOddLotTrading,
    };
};
