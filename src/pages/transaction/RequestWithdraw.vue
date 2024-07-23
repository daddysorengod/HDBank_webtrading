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
                <QcLabel :label="dataLocale.form.stockCode.label" />
                <QcSelect
                    :placeholder="dataLocale.form.stockCode.placeholder"
                    name="stockCode"
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
                    use-input
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.transactionType.label" />
                <QcSelect
                    :placeholder="dataLocale.form.transactionType.placeholder"
                    name="transactionType"
                    :options="
                        transactionWithdrawTypeOptions.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
                    @change="onChangeTransType"
                    map-options
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
                <QcLabel :label="dataLocale.form.voucherNumber.label" />
                <QcInput
                    outlined
                    name="voucherNumber"
                    :placeholder="dataLocale.form.voucherNumber.placeholder"
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
                    @click="onSubmit"
                    >{{ $t(dataLocale.form.btnSearch) }}</q-btn
                >
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onReset"
                    >{{ $t(dataLocale.form.btnReset) }}</q-btn
                >
            </div>
        </div>

        <div class="vpb-page-content">
            <q-table
                class="qc-table"
                v-model:pagination="transWithdrawStore.meta"
                :rows="transWithdrawStore.listTransactions"
                :columns="
                    currentLang === 'vi'
                        ? columnI18n.columnsVI
                        : columnI18n.columnsEN
                "
                :visible-columns="columnI18n.visibleColumns"
                :rows-per-page-options="[]"
                row-key="id"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span
                        class="qc-table-top--title"
                        v-if="transWithdrawStore.meta.total > 1"
                        >{{ transWithdrawStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="transWithdrawStore.meta.total <= 1"
                        >{{ transWithdrawStore.meta.total }}
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
                                    :key="col.value"
                                    :status="col.value"
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
                        :rowsPerPage="transWithdrawStore.meta.rowsPerPage"
                        :currentPage="transWithdrawStore.meta.currentPage"
                        :lastPage="transWithdrawStore.meta.lastPage"
                        :total="transWithdrawStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import { useForm } from "vee-validate";
import RequestWithdrawForm from "src/components/transaction/RequestWithdrawForm.vue";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useTransWithdrawStore } from "src/stores/transactionWithdraw";
import { getMeta, metaToParams } from "src/common/utils/helper";
import { GROUP_FUNCTION, ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import CommonStatus from "src/common/statues/common";
import useCheckPermission from "src/composables/commons/useCheckPermission";
import { useCommonStore } from "stores/common";

export default defineComponent({
    name: "RequestWithdraw",
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columnsVI = [
                {
                    name: "id",
                    field: "id",
                },
                {
                    name: "depositoryAccountNumber",
                    align: "left",
                    label: this.$t("field.depositoryAccountNumber.label"),
                    field: "depositoryAccountNumber",
                    sortable: false,
                },
                {
                    name: "stockCode",
                    align: "left",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
                    sortable: false,
                },
                {
                    name: "transactionType",
                    align: "left",
                    label: this.$t("field.transactionType.label"),
                    field: "transactionTypeNameVI",
                    sortable: false,
                },
                {
                    name: "transactionDate",
                    align: "left",
                    label: this.$t("field.transactionDate.label"),
                    field: "transactionDate",
                    sortable: false,
                },
                {
                    name: "voucherNumber",
                    align: "left",
                    label: this.$t("field.voucherNumber.label"),
                    field: "voucherNumber",
                    sortable: false,
                },
                {
                    name: "status",
                    align: "center",
                    label: this.$t("field.status.label"),
                    field: "status",
                    sortable: false,
                },
            ];

            const columnsEN = [
                {
                    name: "id",
                    field: "id",
                },
                {
                    name: "depositoryAccountNumber",
                    align: "left",
                    label: this.$t("field.depositoryAccountNumber.label"),
                    field: "depositoryAccountNumber",
                    sortable: false,
                },
                {
                    name: "stockCode",
                    align: "left",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
                    sortable: false,
                },
                {
                    name: "transactionType",
                    align: "left",
                    label: this.$t("field.transactionType.label"),
                    field: "transactionTypeNameEN",
                    sortable: false,
                },
                {
                    name: "transactionDate",
                    align: "left",
                    label: this.$t("field.transactionDate.label"),
                    field: "transactionDate",
                    sortable: false,
                },
                {
                    name: "voucherNumber",
                    align: "left",
                    label: this.$t("field.voucherNumber.label"),
                    field: "voucherNumber",
                    sortable: false,
                },
                {
                    name: "status",
                    align: "center",
                    label: this.$t("field.status.label"),
                    field: "status",
                    sortable: false,
                },
            ];

            const visibleColumns = columnsVI
                .filter((column) => column.name !== "id")
                .map((column) => column.name);

            return { columnsVI, columnsEN, visibleColumns };
        },
    },
    setup() {
        const { t } = useI18n();

        const {
            hasPermissionApprove,
            hasPermissionCreate,
            hasPermissionEdit,
            hasPermissionDelete,
        } = useCheckPermission({
            permissionApprove: "",
            permissionCreate:
                GROUP_FUNCTION.TRANSACTION_REQUIRED_WITHDRAWAL_ADD,
            permissionEdit: GROUP_FUNCTION.TRANSACTION_REQUIRED_WITHDRAWAL_MIX,
            permissionDelete:
                GROUP_FUNCTION.TRANSACTION_REQUIRED_WITHDRAWAL_DELETE,
        });

        const { openDialog } = useOpenDialog(RequestWithdrawForm);

        const transWithdrawStore = useTransWithdrawStore();

        const commonStore = useCommonStore();

        const currentLang = ref(commonStore.locale);

        watch(
            () => commonStore.locale,
            () => {
                currentLang.value = commonStore.locale;
            }
        );

        const dataLocale = {
            form: {
                depositoryAccountNumber: {
                    label: "field.depositoryAccountNumber.label",
                    placeholder: "field.depositoryAccountNumber.placeholder",
                },
                voucherNumber: {
                    label: "field.voucherNumber.label",
                    placeholder: "field.voucherNumber.placeholder",
                },
                stockCode: {
                    label: "field.stockCode.label",
                    placeholder: "field.stockCode.placeholder",
                },
                transactionType: {
                    label: "field.transactionType.label",
                    placeholder: "field.transactionType.placeholder",
                },
                transactionDate: {
                    label: "field.transactionDate.label",
                    placeholder: "field.transactionDate.placeholder",
                },
                status: {
                    label: "field.status.label",
                    placeholder: "field.status.placeholder",
                },
                orderbyTime: {
                    label: "field.orderbyTime.label",
                    placeholder: "field.orderbyTime.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
            },
            table: {
                btnAdd: "button.add",
                colAction: "title.functional",
                colApprove: "title.approve",
            },
        };

        const {
            handleSubmit,
            values: valForm,
            resetForm,
            setValues,
        } = useForm({
            initialValues: {
                // depositoryAccountNumber: t("commonLabel.all"),
                // stockCode: t("commonLabel.all"),
                // transactionType: t("commonLabel.all"),
                // status: t("commonLabel.all"),
                depositoryAccountNumber: "",
                stockCode: "",
                transactionType: "",
                status: "",
                voucherNumber: "",
                transactionDate: "",
                orderbyTime: "",
            },
        });

        const onSubmit = handleSubmit(async (values) => {
            transWithdrawStore.getList({ ...values, currentPage: 1 });
        });

        const onReset = () => {
            resetForm();

            transWithdrawStore.getList({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            transWithdrawStore.meta = getMeta(transWithdrawStore.meta, val);

            transWithdrawStore.getList(metaToParams(transWithdrawStore.meta));
        };

        onMounted(() => {
            onReset();
        });

        const onChangeTransType = (val) => {
            transWithdrawStore.params = {
                ...transWithdrawStore.params,
                currentPage: 1,
            };
            setValues({
                // depositoryAccountNumber: t("commonLabel.all"),
                // stockCode: t("commonLabel.all"),
                // status: t("commonLabel.all"),
                depositoryAccountNumber: "",
                stockCode: "",
                status: "",
                transactionDate: "",
                voucherNumber: "",
                transactionType: val,
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

        const updateAction = (row) => {
            openDialog({
                action: "update",
                id: row.id,
                transactionType: row.transactionType,
            });
        };

        const detailAction = (row) => {
            openDialog({
                action: "detail",
                id: row.id,
                transactionType: row.transactionType,
            });
        };

        const deleteAction = (row) => {
            openDialog({
                action: "delete",
                id: row.id,
                transactionType: row.transactionType,
            });
        };

        const approveAction = () => {
            openDialog({
                action: "approve",
            });
        };

        return {
            onSubmit,
            onReset,
            dataLocale,
            openDialog,
            updateAction,
            detailAction,
            deleteAction,
            approveAction,
            transWithdrawStore,
            onUpdatePagination,
            onChangeTransType,
            valForm,
            showAction,
            hasPermissionCreate,
            currentLang
        };
    },
});
</script>
<style scoped></style>
