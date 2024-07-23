import { formatDate } from "src/common/utils/helper";
import { formatMoney } from "src/helpers/formatMoney";

export const lookupBalanceDepository = (dataRes) => {
    return {
        histDate: formatDate(
            dataRes.HISTDATE,
            "DD/MM/YYYY",
            "YYYY-MM-DD'T'HH:mm:ss"
        ),
        depositoryAccountNumber: dataRes.AFACCTNO,
        stockCode: dataRes.SYMBOL,
        marketPrice: formatMoney(dataRes.CLOSEPRICE),
        availableBalances: formatMoney(dataRes.TRADEQTTY),
        surplusHccn: formatMoney(dataRes.RESTRICTEDQTTY),
        marginBalance: formatMoney(dataRes.SECUREDQTTY),
        blockadeBalance: formatMoney(dataRes.BLOCKEDQTTY),
        balanceWaitingReturn: formatMoney(dataRes.WITHDRAWQTTY),
        balancePendingPayment: formatMoney(dataRes.NETTINGQTTY),
        balancePendingExercise: formatMoney(dataRes.CAQTTY),
        blockedOrder: formatMoney(dataRes.ODBLOCKQTTY),
        depositQtty: formatMoney(dataRes.DEPOSITQTTY),
        mortageqtty:formatMoney(dataRes.MORTAGEQTTY),
        totalOwnership: formatMoney(
            dataRes.TRADEQTTY +
                dataRes.RESTRICTEDQTTY +
                dataRes.VOTINGREFQTTY +
                dataRes.DIVIDENDREFQTTY +
                dataRes.RETURNREFQTTY +
                dataRes.OTHERREFQTTY +
                dataRes.MORTAGEQTTY +
                dataRes.BLOCKEDQTTY +
                dataRes.SECUREDQTTY +
                dataRes.WITHDRAWQTTY +
                dataRes.DEPOSITQTTY +
                dataRes.ODBLOCKQTTY +
                dataRes.TRANSFERQTTY +
                dataRes.CAQTTY +
                dataRes.LISTINGQTTY +
                dataRes.RELISTINGQTTY +
                dataRes.NETTINGQTTY +
                dataRes.RECEIVINGQTTY +
                dataRes.LOANQTTY +
                dataRes.CUSTODYQTTY +
                dataRes.KEEPINGQTTY +
                dataRes.ASSETVALUE
        ), // err
        stockValue: formatMoney(
            dataRes.CLOSEPRICE *
                (dataRes.TRADEQTTY +
                    dataRes.RESTRICTEDQTTY +
                    dataRes.VOTINGREFQTTY +
                    dataRes.DIVIDENDREFQTTY +
                    dataRes.RETURNREFQTTY +
                    dataRes.OTHERREFQTTY +
                    dataRes.MORTAGEQTTY +
                    dataRes.BLOCKEDQTTY +
                    dataRes.SECUREDQTTY +
                    dataRes.WITHDRAWQTTY +
                    dataRes.DEPOSITQTTY +
                    dataRes.ODBLOCKQTTY +
                    dataRes.TRANSFERQTTY +
                    dataRes.CAQTTY +
                    dataRes.LISTINGQTTY +
                    dataRes.RELISTINGQTTY +
                    dataRes.NETTINGQTTY +
                    dataRes.RECEIVINGQTTY +
                    dataRes.LOANQTTY +
                    dataRes.CUSTODYQTTY +
                    dataRes.KEEPINGQTTY +
                    dataRes.ASSETVALUE)
        ), // update
    };
};
