import { useAuthStore } from "stores/auth";
import { useCommonStore } from "stores/common";
import PlaceWithdrawType from "src/common/types/placeWithdraw";
import PlaceDepositoryType from "src/common/types/placeDepository";
import TransactionDepositoryType from "src/common/types/transactionDepository";
import TransactionWithdrawType from "src/common/types/transactionWithdraw";
import CommonStatus from "src/common/statues/common";
import StatementType from "src/common/types/statement";
import StatementImportType from "src/common/types/statementImport";
import DocumentType from "src/common/types/documentForm";
import ThqType from "src/common/types/thqType";
import LookupStatementStatus from "src/common/statues/lookupStatement";
import RoleType from "src/common/types/role";
import OrderByTime from "src/common/types/orderByTime";
import ReceiveWay from "src/common/types/receiveWay";
import { translate } from "src/common/utils/helper";
import { notifyList } from "src/api/common";
import { SUCCESS_CODE } from "src/common/constant";

const componentOptionsMixin = {
    data() {
        return {
            firstOptionDepositoryAccNo: {
                label: "commonLabel.all",
                value: "commonLabel.all",
            },
            firstOptionStock: {
                label: "commonLabel.all",
                value: "commonLabel.all",
            },
            depositoryAccNoOptions: [],
            stockOptions: [],
            transactionWithdrawTypeOptions: [],
            transactionDepositoryTypeOptions: [],
            statusOptions: [],
            stockTypeOptions: [],
            placeDepositoryOptions: [],
            placeWithdrawOptions: [],
            transactionTypesOptions: [],
            statementTypeOptions: [],
            statementImportTypeOptions: [],
            thqTypeOptions: [],
            lookupStatementStatusOptions: [], ///lookup statement
            roleTypeOptions: [],
            documentOption: [],
            orderByTime: [],
            ReceiveWay: [],
            listNotification: [],
            intervalId: null,
        };
    },
    methods: {
        async getListNotifications() {
            const { data } = await notifyList();

            if (data.Code === SUCCESS_CODE) {
                this.listNotification = data.Data;
            }
        },
        startInterval(delay) {
            this.intervalId = setInterval(() => {
                // Gọi callback function đã truyền vào
                this.getListNotifications();
            }, 1800000);
        },
        stopInterval() {
            clearInterval(this.intervalId);
            this.intervalId = null;
        },
    },
    async mounted() {
        const authStore = useAuthStore();
        const commonStore = useCommonStore();

        this.statusOptions = CommonStatus.toOptions(true);

        this.depositoryAccNoOptions = this.firstOptionDepositoryAccNo
            ? [this.firstOptionDepositoryAccNo]
            : [];

        if (authStore.listDeposAccNo) {
            this.depositoryAccNoOptions = this.depositoryAccNoOptions.concat(
                authStore.listDeposAccNo.map((item) => ({
                    label: `${item.Afacctno} - ${item.Afname}`,
                    value: item.Afacctno,
                }))
            );
        }

        this.stockOptions = this.firstOptionStock
            ? [this.firstOptionStock]
            : [];

        try {
            const stockList = await commonStore.getStockList();

            this.stockOptions = this.stockOptions.concat(
                stockList.map((item) => ({
                    label: `${item.Symbol} - ${item.Name}`,
                    value: item.Symbol,
                }))
            );
        } catch (e) {
            console.log(e);
        }

        try {
            this.startInterval(60000);
            // const notifyList = await commonStore.getNotifyList();

            // this.listNotification = this.listNotification.concat(notifyList);
        } catch (e) {
            console.log(e);
        }

        try {
            const stockType = await commonStore.getStockType();

            this.stockTypeOptions = this.stockTypeOptions.concat(
                stockType.map((item) => ({
                    label: item.vn_cdcontent,
                    value: item.cdval,
                    subLabel: item.en_cdcontent,
                }))
            );
        } catch (e) {
            console.log(e);
        }

        try {
            const transactionTypes = await commonStore.getTransactionTypes();

            this.transactionTypesOptions = [
                {
                    label: "commonLabel.all",
                    subLabel: "commonLabel.all",
                    value: "commonLabel.all",
                },
            ].concat(
                transactionTypes.map((item) => ({
                    label: item.VN_TXDESC,
                    value: item.TLTXCD,
                    subLabel: item.EN_TXDESC,
                }))
            );
        } catch (e) {
            console.log(e);
        }
        this.transactionDepositoryTypeOptions =
            TransactionDepositoryType.toOptions(true);
        this.transactionWithdrawTypeOptions =
            TransactionWithdrawType.toOptions(true);

        this.placeWithdrawOptions = PlaceWithdrawType.toOptions();
        this.placeDepositoryOptions = PlaceDepositoryType.toOptions();

        this.statementTypeOptions = StatementType.toOptions();
        this.statementImportTypeOptions = StatementImportType.toOptions();
        this.thqTypeOptions = ThqType.toOptions(true);
        this.lookupStatementStatusOptions =
            LookupStatementStatus.toOptions().filter(
                (item) =>
                    item.value === 1 || item.value === 2 || item.value === 4
            );
        this.roleTypeOptions = RoleType.toOptions(true);
        this.documentOption = DocumentType.toOptions();
        this.orderByTime = OrderByTime.toOptions();
        this.ReceiveWay = ReceiveWay.toOptions();
    },
    beforeUnmount() {
        this.stopInterval();
    },
};

export default componentOptionsMixin;
