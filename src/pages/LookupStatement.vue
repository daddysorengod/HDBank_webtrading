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
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.orderNo.label" />
                <QcInput
                    outlined
                    name="orderNo"
                    :placeholder="dataLocale.form.orderNo.placeholder"
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
                    name="statementStatus"
                    :options="
                        lookupStatementStatusOptions.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
                    map-options
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.statementType.label" />

                <QcSelect
                    :placeholder="dataLocale.form.statementType.placeholder"
                    name="statementType"
                    :options="
                        statementTypeOptions.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
                    map-options
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.companyCode.label" />
                <QcInput
                    outlined
                    name="companyCode"
                    :placeholder="dataLocale.form.companyCode.placeholder"
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
                v-model:pagination="lookupStatementStore.meta"
                :rows="lookupStatementStore.listStatements"
                :columns="columnI18n.columns"
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
                        v-if="lookupStatementStore.meta.total > 1"
                        >{{ lookupStatementStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="lookupStatementStore.meta.total <= 1"
                        >{{ lookupStatementStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
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
                                    enumClass="LookupStatementStatus"
                                />
                            </template>
                            <template v-else-if="col.name === 'statementType'">
                                <type-label
                                    :key="col.value"
                                    :type="col.value"
                                    enumClass="StatementType"
                                />
                            </template>
                            <template v-else>
                                {{ col.value }}
                            </template>
                        </q-td>
                    </q-tr>
                </template>

                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="lookupStatementStore.meta.rowsPerPage"
                        :currentPage="lookupStatementStore.meta.currentPage"
                        :lastPage="lookupStatementStore.meta.lastPage"
                        :total="lookupStatementStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useForm } from "vee-validate";
import { getMeta, metaToParams } from "src/common/utils/helper";
import RequestDepositoryForm from "components/transaction/RequestDepositoryForm";
import RequestWithdrawForm from "components/transaction/RequestWithdrawForm";
import { ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import OrderForm from "components/transaction/OrderForm";
import { useLookupStatementStore } from "stores/lookupStatement";

export default defineComponent({
    name: "LookupStatement",
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columns = [
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
                    name: "orderNo",
                    align: "left",
                    label: this.$t("field.orderNo.label"),
                    field: "orderNo",
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
                    name: "status",
                    required: true,
                    label: this.$t("field.status.label"),
                    field: "status",
                    align: "center",
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
                    name: "statementType",
                    align: "left",
                    label: this.$t("field.statementType.label"),
                    field: "statementType",
                    sortable: false,
                },
                {
                    name: "clearDay",
                    align: "center",
                    label: this.$t("field.clearDay.label"),
                    field: "clearDay",
                    sortable: false,
                },
                {
                    name: "stockQuantity",
                    align: "right",
                    label: this.$t("field.stockQuantity.label"),
                    field: "stockQuantity",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "stockValue",
                    align: "right",
                    label: this.$t("field.stockValue.label"),
                    field: "totalAmount",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "commissionFee",
                    align: "right",
                    label: this.$t("field.commissionFee.label"),
                    field: "commissionFee",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "transFee",
                    align: "right",
                    label: this.$t("field.transFee.label"),
                    field: "transFee",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "tax",
                    align: "right",
                    label: this.$t("field.tax.label"),
                    field: "tax",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "pendAmount",
                    align: "right",
                    label: this.$t("field.pendAmount.label"),
                    field: "pendAmount",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "companyCode",
                    align: "right",
                    label: this.$t("field.companyCode.label"),
                    field: "companyCode",
                    sortable: false,
                },
            ];
            const visibleColumns = columns
                .filter((column) => column.name !== "id")
                .map((column) => column.name);
            return { columns, visibleColumns };
        },
    },
    setup() {
        const { t } = useI18n();

        const lookupStatementStore = useLookupStatementStore();

        const dataLocale = {
            form: {
                depositoryAccountNumber: {
                    label: "field.depositoryAccountNumber.label",
                    placeholder: "field.depositoryAccountNumber.placeholder",
                },
                orderNo: {
                    label: "field.orderNo.label",
                    placeholder: "field.orderNo.placeholder",
                },
                stockCode: {
                    label: "field.stockCode.label",
                    placeholder: "field.stockCode.placeholder",
                },
                transactionDate: {
                    label: "field.transactionDate.label",
                    placeholder: "field.transactionDate.placeholder",
                },
                status: {
                    label: "field.status.label",
                    placeholder: "field.status.placeholder",
                },
                statementType: {
                    label: "field.statementType.label",
                    placeholder: "field.statementType.placeholder",
                },
                companyCode: {
                    label: "field.companyCode.label",
                    placeholder: "field.companyCode.placeholder",
                },
                orderbyTime: {
                    label: "field.orderbyTime.label",
                    placeholder: "field.orderbyTime.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
            },
            table: {
                btnAdd: t("button.addUser"),
                colAction: t("title.functional"),
                colApprove: t("title.approve"),
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
                // orderNo: "",
                // stockCode: "",
                // transactionDate: "",
                // statementStatus: t("commonLabel.all"),
                // statementType: t("commonLabel.all"),
                // companyCode: "",
                // orderbyTime: "",
                depositoryAccountNumber: "",
                orderNo: "",
                stockCode: "",
                transactionDate: "",
                statementStatus: "",
                statementType: "",
                companyCode: "",
                orderbyTime: "",
            },
        });

        onMounted(() => {
            onReset();
        });

        const onSubmit = handleSubmit(async (values) => {
            lookupStatementStore.getList({ ...values, currentPage: 1 });
        });

        const onReset = () => {
            resetForm();

            lookupStatementStore.getList({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            lookupStatementStore.meta = getMeta(lookupStatementStore.meta, val);

            lookupStatementStore.getList(
                metaToParams(lookupStatementStore.meta)
            );
        };

        return {
            dataLocale,
            lookupStatementStore,
            onUpdatePagination,
            onSubmit,
            onReset,
        };
    },
});
</script>
<style scoped></style>
