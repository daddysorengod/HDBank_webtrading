<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel
                    :label="dataLocale.form.depositoryAccountNumber.label"
                />
                <QcSelect
                    outlined
                    name="depositoryAccountNumber"
                    :placeholder="
                        dataLocale.form.depositoryAccountNumber.placeholder
                    "
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
                <QcLabel :label="dataLocale.form.transactionDate.label" />
                <QcDatePicker
                    outlined
                    name="transactionDate"
                    :placeholder="dataLocale.form.transactionDate.placeholder"
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
                class="qc-table"
                v-model:pagination="lookupBalanceStore.meta"
                :rows="lookupBalanceStore.listDepositoryAccount"
                :columns="columnI18n"
                :rows-per-page-options="[]"
                row-key="stockCode"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span
                        v-if="lookupBalanceStore.meta.total > 1"
                        class="qc-table-top--title"
                        >{{ lookupBalanceStore.meta.total }}
                        {{ $t("system.results") }}</span
                    ><span
                        v-if="lookupBalanceStore.meta.total <= 1"
                        class="qc-table-top--title"
                        >{{ lookupBalanceStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
                </template>

                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="lookupBalanceStore.meta.rowsPerPage"
                        :currentPage="lookupBalanceStore.meta.currentPage"
                        :lastPage="lookupBalanceStore.meta.lastPage"
                        :total="lookupBalanceStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import QCDatePicker from "components/commons/QCDatePicker";
import { useI18n } from "vue-i18n";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useOrderListStock } from "src/stores/lookupBalanceStore";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { getMeta, metaToParams } from "src/common/utils/helper";

export default defineComponent({
    name: "LookupBalance",
    components: { QCDatePicker },
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columns = [
                {
                    name: "transactionDate",
                    align: "left",
                    label: this.$t("field.transactionDate.label"),
                    field: "histDate",
                    sortable: false,
                },
                {
                    name: "depositoryAccountNumber",
                    required: true,
                    label: this.$t("lookupBalance.depositoryAccountNumber"),
                    field: "depositoryAccountNumber",
                    align: "left",
                    format: (val) => `${val}`,
                    sortable: false,
                },
                {
                    name: "stockCode",
                    align: "left",
                    label: this.$t("lookupBalance.stockCode"),
                    field: "stockCode",
                    sortable: false,
                },
                {
                    name: "marketPrice",
                    align: "right",
                    label: this.$t("lookupBalance.marketPrice"),
                    field: "marketPrice",
                    sortable: false,
                },
                {
                    name: "availableBalances",
                    align: "right",
                    label: this.$t("lookupBalance.availableBalances"),
                    field: "availableBalances",
                    sortable: false,
                },
                {
                    name: "surplusHccn",
                    align: "right",
                    label: this.$t("lookupBalance.surplusHccn"),
                    field: "surplusHccn",
                    sortable: false,
                },
                {
                    name: "marginBalance",
                    align: "right",
                    label: this.$t("lookupBalance.marginBalance"),
                    field: "marginBalance",
                    sortable: false,
                },
                {
                    name: "blockadeBalance",
                    align: "right",
                    label: this.$t("lookupBalance.blockadeBalance"),
                    field: "blockadeBalance",
                    sortable: false,
                },
                {
                    name: "balanceWaitingReturn",
                    align: "right",
                    label: this.$t("lookupBalance.balanceWaitingReturn"),
                    field: "balanceWaitingReturn",
                    sortable: false,
                },
                {
                    name: "balancePendingPayment",
                    align: "right",
                    label: this.$t("lookupBalance.balancePendingPayment"),
                    field: "balancePendingPayment",
                    sortable: false,
                },
                {
                    name: "balancePendingExercise",
                    align: "right",
                    label: this.$t("lookupBalance.balancePendingExercise"),
                    field: "balancePendingExercise",
                    sortable: false,
                },
                {
                    name: "depositQtty",
                    align: "right",
                    label: this.$t("lookupBalance.depositQtty"),
                    field: "depositQtty",
                    sortable: false,
                },
                {
                    name: "blockedOrder",
                    align: "right",
                    label: this.$t("lookupBalance.blockedOrder"),
                    field: "blockedOrder",
                    sortable: false,
                },
                {
                    name: "mortageqtty",
                    align: "right",
                    label: this.$t("lookupBalance.mortageqtty"),
                    field: "mortageqtty",
                    sortable: false,
                },
                {
                    name: "totalOwnership",
                    align: "right",
                    label: this.$t("lookupBalance.totalOwnership"),
                    field: "totalOwnership",
                    sortable: false,
                },
                {
                    name: "stockValue",
                    align: "right",
                    label: this.$t("lookupBalance.stockValue"),
                    field: "stockValue",
                    sortable: false,
                },
            ];

            return columns;
        },
    },
    setup() {
        const { t } = useI18n();

        const lookupBalanceStore = useOrderListStock();

        // console.log(componentOptionsMixin.data.depositoryAccNoOptions);

        // console.log("stock option", componentOptionsMixin.data.stockOptions);

        const dataLocale = ref({
            form: {
                depositoryAccountNumber: {
                    label: "field.depositoryAccountNumber.label",
                    placeholder: "field.depositoryAccountNumber.placeholder",
                },
                transactionDate: {
                    label: "field.transactionDate.label",
                    placeholder: "field.transactionDate.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
                btnRefresh: "button.refresh",
            },
        });

        const schema = yup.object({
            depositoryAccountNumber: yup
                .string()
                .label(t(dataLocale.value.form.depositoryAccountNumber.label)),
            transactionDate: yup
                .string()
                .label(t(dataLocale.value.form.transactionDate.label)),
        });

        onMounted(() => {
            lookupBalanceStore.getList({});
        });

        const {
            handleSubmit,
            isSubmitting,
            resetForm,
            setValues,
            values: valForm,
        } = useForm({
            initialValues: {
                // depositoryAccountNumber: ("commonLabel.all"),
                depositoryAccountNumber: "",
                transactionDate: "",
            },
        });

        const onPressSearch = handleSubmit(async (values) => {
            lookupBalanceStore.getList({ ...values, currentPage: 1 });
        });

        const resetFilter = () => {
            resetForm();

            lookupBalanceStore.getList({
                ...valForm,
                currentPage: 1,
            });
        };

        const onUpdatePagination = (val) => {
            lookupBalanceStore.meta = getMeta(lookupBalanceStore.meta, val);

            lookupBalanceStore.getList(metaToParams(lookupBalanceStore.meta));
        };

        const onPressRefresh = (val) => {};

        return {
            resetFilter,
            onPressSearch,
            dataLocale,
            lookupBalanceStore,
            onUpdatePagination,
            valForm,
            onPressRefresh,
        };
    },
});
</script>
<style scoped></style>
