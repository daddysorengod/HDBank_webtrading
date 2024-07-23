<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel
                    :label="dataLocale.form.depositoryAccountNumber.label"
                />
                <QcSelect
                    :placeholder="
                        dataLocale.form.depositoryAccountNumber.placeholder
                    "
                    name="depositoryAccountNumber"
                    :options="
                        depositoryAccNoOptions.map((item, index) => {
                            if (index === 0) {
                                return {
                                    label: $t(item.label),
                                    value: $t(item.value),
                                };
                            } else return item;
                        })
                    "
                    use-input
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.voucherNumber.label" />
                <QcInput
                    outlined
                    name="voucherNumber"
                    :placeholder="dataLocale.form.voucherNumber.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.stockCode.label" />
                <QcSelect
                    :placeholder="dataLocale.form.stockCode.placeholder"
                    :options="
                        stockOptions.map((item, index) => {
                            if (index === 0) {
                                return {
                                    label: $t(item.label),
                                    value: $t(item.value),
                                };
                            } else return item;
                        })
                    "
                    name="stockCode"
                    use-input
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.transactionDate.label" />
                <QcDatePicker
                    outlined
                    name="transactionDate"
                    :placeholder="dataLocale.form.transactionDate.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.status.label" />
                <QcSelect
                    :placeholder="dataLocale.form.status.placeholder"
                    name="status"
                    :options="
                        statusOptions.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
                    map-options
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.orderbyTime.label" />

                <QcSelect
                    :placeholder="dataLocale.form.orderbyTime.placeholder"
                    name="orderbyTime"
                    :options="
                        orderByTime.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
                    map-options
                />
            </div>

            <div class="vpb-filter-group vpb-filter-group--btn">
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn full-width"
                    unelevated
                    @click="onPressSearch"
                    >{{ $t(dataLocale.form.btnSearch) }}</q-btn
                >
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width qc-btn qc-btn--primary-second"
                    unelevated
                    @click="resetFilter"
                    >{{ $t(dataLocale.form.btnReset) }}</q-btn
                >
            </div>
        </div>

        <div class="vpb-page-content">
            <q-table
                class="qc-table-sticky"
                v-model:pagination="orderStore.meta"
                :rows="orderStore.listTransactions"
                :columns="columnI18n"
                :rows-per-page-options="[]"
                row-key="voucherNumber"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span
                        class="qc-table-top--title"
                        v-if="orderStore.meta.total > 1"
                        >{{ orderStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="orderStore.meta.total <= 1"
                        >{{ orderStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
                    <q-space />
                    <q-btn
                        v-if="hasPermissionCreate"
                        flat
                        no-caps
                        color="primary"
                        @click="openDialog"
                    >
                        <q-icon left size="18px" name="add" />
                        <div>{{ $t(dataLocale.table.btnAdd) }}</div>
                    </q-btn>
                </template>

                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            {{ col.label }}
                        </q-th>
                        <q-th key="action">
                            {{ $t(dataLocale.table.colAction) }}
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            <template v-if="col.name === 'status'">
                                <status-label
                                    :status="col.value"
                                    :key="col.value"
                                />
                            </template>
                            <template v-else>
                                {{ col.value }}
                            </template>
                        </q-td>

                        <q-td auto-width>
                            <q-btn
                                v-if="showAction(props.row.status, 'detail')"
                                flat
                                size="sm"
                                round
                                @click="detailAction(props.row)"
                            >
                                <img src="/icons/vp-eye.svg" />
                            </q-btn>
                            <q-btn
                                v-if="showAction(props.row.status, 'edit')"
                                flat
                                size="sm"
                                round
                                @click="updateAction(props.row)"
                            >
                                <img src="/icons/vp-pencil.svg" />
                            </q-btn>
                            <q-btn
                                v-if="showAction(props.row.status, 'delete')"
                                flat
                                size="sm"
                                round
                                @click="deleteAction(props.row)"
                            >
                                <img src="/icons/vp-trash.svg" />
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>

                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="orderStore.meta.rowsPerPage"
                        :currentPage="orderStore.meta.currentPage"
                        :lastPage="orderStore.meta.lastPage"
                        :total="orderStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>

        <div class="vpb-note">
            <QcLabel :label="dataLocale.form.noteRegisterBuyingStock.label" />
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import OrderForm from "src/components/transaction/OrderForm.vue";
import { useForm } from "vee-validate";
import { handleResponseNotify, notifyFail } from "src/common/utils/helper";
import * as yup from "yup";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { getMeta, metaToParams } from "src/common/utils/helper";
import { useOrderListStock } from "src/stores/order";
import { GROUP_FUNCTION, ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import CommonStatus from "src/common/statues/common";
import useCheckPermission from "src/composables/commons/useCheckPermission";

export default defineComponent({
    name: "Order",
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columns = [
                {
                    name: "index",
                    label: this.$t("field.indexNumber.label"),
                    field: "index",
                    align: "left",
                },
                {
                    name: "voucherNumber",
                    label: this.$t("field.voucherNumber.label"),
                    field: "voucherNumber",
                    align: "left",
                },
                {
                    name: "depositoryAccountNumber",
                    align: "left",
                    label: this.$t("field.depositoryAccountNumber.label"),
                    field: "depositoryAccountNumber",
                    sortable: false,
                },
                {
                    name: "registerTransactionDate",
                    label: this.$t("field.registerTransactionDate.label"),
                    field: "transactionDate",
                    align: "left",
                },
                {
                    name: "thqCode",
                    label: this.$t("field.thqCode.label"),
                    field: "caid",
                    align: "left",
                },
                {
                    name: "stockCode",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
                    align: "left",
                },
                {
                    name: "registerDate",
                    label: this.$t("field.registerDate.label"),
                    field: "registerDate",
                    align: "left",
                },
                {
                    name: "startDate",
                    label: this.$t("field.startDate.label"),
                    field: "startDate",
                    align: "left",
                },
                {
                    name: "endDate",
                    label: this.$t("field.endDate.label"),
                    field: "endDate",
                    align: "left",
                },
                {
                    name: "ratio",
                    label: this.$t("field.ratio.label"),
                    field: "rate",
                    align: "left",
                },

                {
                    name: "purchasePrice",
                    label: this.$t("field.purchasePrice.label"),
                    field: "purchasePrice",
                    align: "left",
                },
                {
                    name: "permissionQuantity",
                    label: this.$t("field.permissionQuantity.label"),
                    field: "permissionQuantity",
                    align: "left",
                },
                {
                    name: "numberOfSecuritiesPurchased",
                    label: this.$t("field.numberOfSecuritiesPurchased.label"),
                    field: "numberOfSecuritiesPurchased",
                    align: "left",
                },
                {
                    name: "registerStockQuantity",
                    label: this.$t("field.registerStockQuantity.label"),
                    field: "registerStockQuantity",
                    align: "left",
                },
                {
                    name: "paymentAmount",
                    label: this.$t("field.paymentAmount.label"),
                    field: "payAmount",
                    align: "left",
                },
                // {
                //     name: "depositoryAccountNumber",
                //     align: "left",
                //     label: this.$t("field.depositoryAccountNumber.label"),
                //     field: "depositoryAccountNumber",
                //     sortable: false,
                // },
                // {
                //     name: "voucherNumber",
                //     align: "left",
                //     label: this.$t("field.voucherNumber.label"),
                //     field: "voucherNumber",
                //     sortable: false,
                // },
                // {
                //     name: "stockCode",
                //     align: "left",
                //     label: this.$t("field.stockCode.label"),
                //     field: "stockCode",
                //     sortable: false,
                // },
                // {
                //     name: "transactionDate",
                //     align: "left",
                //     label: this.$t("field.transactionDate.label"),
                //     field: "transactionDate",
                //     sortable: false,
                // },
                // {
                //     name: "permissionQuantity",
                //     align: "center",
                //     label: this.$t("field.permissionQuantity.label"),
                //     field: "permissionQuantity",
                //     sortable: false,
                // },
                // {
                //     name: "registerStockQuantity",
                //     align: "center",
                //     label: this.$t("field.registerStockQuantity.label"),
                //     field: "registerStockQuantity",
                //     sortable: false,
                // },
                // {
                //     name: "payAmount",
                //     align: "right",
                //     label: this.$t("field.payAmount.label"),
                //     field: "payAmount",
                //     sortable: false,
                // },
                {
                    name: "status",
                    align: "right",
                    label: this.$t("field.status.label"),
                    field: "status",
                    sortable: false,
                },
            ];

            return columns;
        },
    },
    setup() {
        const {
            hasPermissionApprove,
            hasPermissionCreate,
            hasPermissionEdit,
            hasPermissionDelete,
        } = useCheckPermission({
            permissionApprove: "",
            permissionCreate: GROUP_FUNCTION.TRANSACTIONS_FOR_BUYING_ADD,
            permissionEdit: GROUP_FUNCTION.TRANSACTIONS_FOR_BUYING_MIX,
            permissionDelete: GROUP_FUNCTION.TRANSACTIONS_FOR_BUYING_DELETE,
        });

        const { t } = useI18n();

        const { openDialog } = useOpenDialog(OrderForm);

        const orderStore = useOrderListStock();

        const dataLocale = ref({
            form: {
                depositoryAccountNumber: {
                    label: "field.depositoryAccountName.label",
                    placeholder: "field.depositoryAccountName.placeholder",
                },
                voucherNumber: {
                    label: "field.voucherNumber.label",
                    placeholder: "field.voucherNumber.placeholder",
                },
                stockCode: {
                    label: "field.stockCode.label",
                    placeholder: "field.stockCode.placeholder",
                },
                transactionDate: {
                    label: "field.registerTransactionDate.label",
                    placeholder: "field.registerTransactionDate.placeholder",
                },
                status: {
                    label: "field.status.label",
                    placeholder: "field.status.placeholder",
                },
                orderbyTime: {
                    label: "field.orderbyTime.label",
                    placeholder: "field.orderbyTime.placeholder",
                },
                ///new cols
                indexNumber: {
                    label: "field.indexNumber.label",
                    placeholder: "field.indexNumber.placeholder",
                },
                voucherNumber: {
                    label: "field.voucherNumber.label",
                    placeholder: "field.voucherNumber.placeholder",
                },
                registerTransactionDate: {
                    label: "field.registerTransactionDate.label",
                    placeholder: "field.registerTransactionDate.placeholder",
                },
                thqCode: {
                    label: "field.thqCode.label",
                    placeholder: "field.thqCode.placeholder",
                },
                stockCode: {
                    label: "field.stockCode.label",
                    placeholder: "field.stockCode.placeholder",
                },
                registerDate: {
                    label: "field.registerDate.label",
                    placeholder: "field.registerDate.placeholder",
                },
                startDate: {
                    label: "field.startDate.label",
                    placeholder: "field.startDate.placeholder",
                },
                endDate: {
                    label: "field.endDate.label",
                    placeholder: "field.endDate.placeholder",
                },
                ratio: {
                    label: "field.ratio.label",
                    placeholder: "field.ratio.placeholder",
                },
                purchasePrice: {
                    label: "field.purchasePrice.label",
                    placeholder: "field.purchasePrice.placeholder",
                },
                permissionQuantity: {
                    label: "field.permissionQuantity.label",
                    placeholder: "field.permissionQuantity.placeholder",
                },
                numberOfSecuritiesPurchased: {
                    label: "field.numberOfSecuritiesPurchased.label",
                    placeholder:
                        "field.numberOfSecuritiesPurchased.placeholder",
                },
                noteRegisterBuyingStock: {
                    label: "field.noteRegisterBuyingStock.label",
                    placeholder: "field.noteRegisterBuyingStock.placeholder",
                },
                registerStockQuantity: {
                    label: "field.registerStockQuantity.label",
                    placeholder: "field.registerStockQuantity.placeholder",
                },
                paymentAmount: {
                    label: "field.paymentAmount.label",
                    placeholder: "field.paymentAmount.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
            },
            table: {
                btnAdd: "button.add",
                colAction: "title.functional",
                colApprove: "title.approve",
            },
        });

        const schema = yup.object({
            depositoryAccountNumber: yup
                .string()
                .label(t(dataLocale.value.form.depositoryAccountNumber.label)),
            voucherNumber: yup
                .string()
                .label(t(dataLocale.value.form.voucherNumber.label)),
            stockCode: yup
                .string()
                .label(t(dataLocale.value.form.stockCode.label)),
            transactionDate: yup
                .string()
                .label(t(dataLocale.value.form.transactionDate.label)),
            status: yup.string().label(t(dataLocale.value.form.status.label)),
        });

        const {
            handleSubmit,
            resetForm,
            setValues,
            values: valForm,
        } = useForm({
            initialValues: {
                // depositoryAccountNumber: t("commonLabel.all"),
                // stockCode: t("commonLabel.all"),
                // status: t("commonLabel.all"),
                depositoryAccountNumber: "",
                stockCode: "",
                status: "",
                voucherNumber: "",
                transactionDate: "",
                orderbyTime: "",
            },
        });

        const onPressSearch = handleSubmit(async (values) => {
            orderStore.getList({ ...values, currentPage: 1 });
        });

        const resetFilter = () => {
            resetForm();

            orderStore.getList({
                ...valForm,
                currentPage: 1,
            });
        };

        const onUpdatePagination = (val) => {
            orderStore.meta = getMeta(orderStore.meta, val);

            orderStore.getList(metaToParams(orderStore.meta));
        };

        onMounted(() => {
            orderStore.getList({});
        });

        const onChangeTransType = (val) => {
            setValues({
                // depositoryAccountNumber: t("commonLabel.all"),
                // stockCode: t("commonLabel.all"),
                // status: t("commonLabel.all"),
                depositoryAccountNumber: "",
                stockCode: "",
                status: "",
                transactionDate: "",
                voucherNumber: "",
            });
        };

        const rows = ref([]);

        const updateAction = (row) => {
            openDialog({
                action: "update",
                data: {
                    caid: row.caid,
                    afacctno: row.depositoryAccountNumber,
                    id: row?.voucherNumber,
                },
            });
        };

        const detailAction = (row) => {
            openDialog({
                action: "detail",
                data: {
                    caid: row.caid,
                    afacctno: row.depositoryAccountNumber,
                    id: row?.voucherNumber,
                },
            });
        };

        const deleteAction = (row) => {
            openDialog({
                action: "delete",
                data: {
                    caid: row.caid,
                    afacctno: row.depositoryAccountNumber,
                    id: row?.voucherNumber,
                },
            });
        };

        const approveAction = (row) => {
            openDialog({
                action: "approve",
                data: {
                    caid: row.caid,
                    afacctno: row.depositoryAccountNumber,
                    id: row?.voucherNumber,
                },
            });
        };

        const showAction = (status, action) => {
            switch (action) {
                case "detail":
                    return true;
                case "edit":
                    return (
                        hasPermissionEdit.value &&
                        status === CommonStatus.WAITING.value
                    );
                case "delete":
                    return (
                        hasPermissionDelete.value &&
                        status === CommonStatus.WAITING.value
                    );
                default:
                    return true;
            }
        };

        return {
            // columns,
            rows,
            dataLocale,
            openDialog,
            updateAction,
            detailAction,
            deleteAction,
            approveAction,
            onPressSearch,
            resetFilter,
            valForm,
            onChangeTransType,
            orderStore,
            onUpdatePagination,
            showAction,
            hasPermissionCreate,
        };
    },
});
</script>
<style scoped></style>
