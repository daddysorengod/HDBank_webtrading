<template>
    <q-page>
        <div class="vpb-filter">
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
                <QcLabel :label="dataLocale.form.registerDate.label" />
                <QcDatePicker
                    outlined
                    name="registerDate"
                    :placeholder="dataLocale.form.registerDate.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.thqType.label" />
                <QcSelect
                    :placeholder="dataLocale.form.thqType.placeholder"
                    name="thqType"
                    :options="
                        thqTypeOptions.map((item, index) => {
                            if (index === 0) {
                                return {
                                    label: $t(item.label),
                                    value: $t(item.value),
                                };
                            } else
                                return {
                                    label: $t(item.label),
                                    value: item.value,
                                };
                        })
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
                v-model:pagination="lookupInfoPermissionStore.meta"
                :rows="lookupInfoPermissionStore.listInfoPermissions"
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
                        v-if="lookupInfoPermissionStore.meta.total > 1"
                        >{{ lookupInfoPermissionStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="lookupInfoPermissionStore.meta.total <= 1"
                        >{{ lookupInfoPermissionStore.meta.total }}
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
                        :rowsPerPage="
                            lookupInfoPermissionStore.meta.rowsPerPage
                        "
                        :currentPage="
                            lookupInfoPermissionStore.meta.currentPage
                        "
                        :lastPage="lookupInfoPermissionStore.meta.lastPage"
                        :total="lookupInfoPermissionStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useForm } from "vee-validate";
import { getMeta, metaToParams } from "src/common/utils/helper";
import { ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import { useLookupInfoPermissionStore } from "stores/lookupInfoPermission";
import { useCommonStore } from "stores/common";

export default defineComponent({
    name: "LookupInfoPermission",
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columnsVI = [
                {
                    name: "id",
                    field: "id",
                },
                {
                    name: "thqCode",
                    align: "left",
                    label: this.$t("field.thqCode.label"),
                    field: "thqCode",
                    sortable: false,
                },
                {
                    name: "THQType",
                    align: "left",
                    label: this.$t("field.THQType.label"),
                    field: "THQTypeVi",
                    sortable: false,
                },
                {
                    name: "stockCode",
                    align: "left",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
                    sortable: false,
                },
                // {
                //     name: "KHQTransactionFrom",
                //     required: true,
                //     label: this.$t("field.KHQTransactionFrom.label"),
                //     field: "KHQTransactionFrom",
                //     align: "center",
                //     sortable: false,
                // },
                // {
                //     name: "KHQTransactionTo",
                //     // required: true,
                //     align: "left",
                //     label: this.$t("field.KHQTransactionTo.label"),
                //     field: "KHQTransactionTo",
                //     sortable: false,
                // },
                {
                    name: "registerDate",
                    align: "left",
                    label: this.$t("field.registerDate.label"),
                    field: "registerDate",
                    sortable: false,
                },
                {
                    name: "THQDate",
                    align: "left",
                    label: this.$t("field.THQDate.label"),
                    field: "THQDate",
                    sortable: false,
                },
                {
                    name: "ratioExchangeStockToPermission",
                    align: "center",
                    label: this.$t(
                        "field.ratioExchangeStockToPermission.label"
                    ),
                    field: "ratioExchangeStockToPermission",
                    sortable: false,
                },
                {
                    name: "ratioExchangePermissionToStock",
                    align: "center",
                    label: this.$t(
                        "field.ratioExchangePermissionToStock.label"
                    ),
                    field: "ratioExchangePermissionToStock",
                    sortable: false,
                },
                {
                    name: "ratioExchangePermissionToMoney",
                    align: "center",
                    label: this.$t(
                        "field.ratioExchangePermissionToMoney.label"
                    ),
                    field: "ratioExchangePermissionToMoney",
                    sortable: false,
                },
                {
                    name: "ratioBonds",
                    align: "center",
                    label: this.$t("field.ratioBonds.label"),
                    field: "ratioBonds",
                    sortable: false,
                },
                {
                    name: "exchangeStockToPermission",
                    align: "center",
                    label: this.$t("field.exchangeStockToPermission.label"),
                    field: "transferVi",
                    sortable: false,
                },
                {
                    name: "transferPermission",
                    align: "center",
                    label: this.$t("field.transferPermission.label"),
                    field: "retailVi",
                    sortable: false,
                },
                {
                    name: "transferFromDate",
                    align: "center",
                    label: this.$t("field.transferFromDate.label"),
                    field: "transferFromDate",
                    sortable: false,
                },
                {
                    name: "transferToDate",
                    align: "center",
                    label: this.$t("field.transferToDate.label"),
                    field: "transferToDate",
                    sortable: false,
                },
                {
                    name: "purchaseNewPrice",
                    align: "right",
                    label: this.$t("field.purchaseNewPrice.label"),
                    field: "purchaseNewPrice",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "expiredDate",
                    align: "left",
                    label: this.$t("field.expiredDate.label"),
                    field: "expiredDate",
                    sortable: false,
                },
                // {
                //     name: "taxCollect",
                //     align: "left",
                //     label: this.$t("field.taxCollect.label"),
                //     field: "taxCollectVi",
                //     sortable: false,
                // },
            ];

            const columnsEN = [
                {
                    name: "id",
                    field: "id",
                },
                {
                    name: "thqCode",
                    align: "left",
                    label: this.$t("field.thqCode.label"),
                    field: "thqCode",
                    sortable: false,
                },
                {
                    name: "THQType",
                    align: "left",
                    label: this.$t("field.THQType.label"),
                    field: "THQTypeEn",
                    sortable: false,
                },
                {
                    name: "stockCode",
                    align: "left",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
                    sortable: false,
                },
                // {
                //     name: "KHQTransactionFrom",
                //     required: true,
                //     label: this.$t("field.KHQTransactionFrom.label"),
                //     field: "KHQTransactionFrom",
                //     align: "center",
                //     sortable: false,
                // },
                // {
                //     name: "KHQTransactionTo",
                //     // required: true,
                //     align: "left",
                //     label: this.$t("field.KHQTransactionTo.label"),
                //     field: "KHQTransactionTo",
                //     sortable: false,
                // },
                {
                    name: "registerDate",
                    align: "left",
                    label: this.$t("field.registerDate.label"),
                    field: "registerDate",
                    sortable: false,
                },
                {
                    name: "THQDate",
                    align: "left",
                    label: this.$t("field.THQDate.label"),
                    field: "THQDate",
                    sortable: false,
                },
                {
                    name: "ratioExchangeStockToPermission",
                    align: "center",
                    label: this.$t(
                        "field.ratioExchangeStockToPermission.label"
                    ),
                    field: "ratioExchangeStockToPermission",
                    sortable: false,
                },
                {
                    name: "ratioExchangePermissionToStock",
                    align: "center",
                    label: this.$t(
                        "field.ratioExchangePermissionToStock.label"
                    ),
                    field: "ratioExchangePermissionToStock",
                    sortable: false,
                },
                {
                    name: "ratioExchangePermissionToMoney",
                    align: "center",
                    label: this.$t(
                        "field.ratioExchangePermissionToMoney.label"
                    ),
                    field: "ratioExchangePermissionToMoney",
                    sortable: false,
                },
                {
                    name: "ratioBonds",
                    align: "center",
                    label: this.$t("field.ratioBonds.label"),
                    field: "ratioBonds",
                    sortable: false,
                },
                {
                    name: "exchangeStockToPermission",
                    align: "center",
                    label: this.$t("field.exchangeStockToPermission.label"),
                    field: "transferEn",
                    sortable: false,
                },
                {
                    name: "transferPermission",
                    align: "center",
                    label: this.$t("field.transferPermission.label"),
                    field: "retailEn",
                    sortable: false,
                },
                {
                    name: "transferFromDate",
                    align: "center",
                    label: this.$t("field.transferFromDate.label"),
                    field: "transferFromDate",
                    sortable: false,
                },
                {
                    name: "transferToDate",
                    align: "center",
                    label: this.$t("field.transferToDate.label"),
                    field: "transferToDate",
                    sortable: false,
                },
                {
                    name: "purchaseNewPrice",
                    align: "right",
                    label: this.$t("field.purchaseNewPrice.label"),
                    field: "purchaseNewPrice",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "expiredDate",
                    align: "left",
                    label: this.$t("field.expiredDate.label"),
                    field: "expiredDate",
                    sortable: false,
                },
                // {
                //     name: "taxCollect",
                //     align: "left",
                //     label: this.$t("field.taxCollect.label"),
                //     field: "taxCollectVi",
                //     sortable: false,
                // },
            ];

            const visibleColumns = columnsVI
                .filter((column) => column.name !== "id")
                .map((column) => column.name);

            return { columnsVI, columnsEN, visibleColumns };
        },
    },
    setup() {
        const { t } = useI18n();

        const lookupInfoPermissionStore = useLookupInfoPermissionStore();

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
                thqType: {
                    label: "field.THQType.label",
                    placeholder: "field.THQType.placeholder",
                },
                stockCode: {
                    label: "field.stockCode.label",
                    placeholder: "field.stockCode.placeholder",
                },
                registerDate: {
                    label: "field.registerDate.label",
                    placeholder: "field.registerDate.placeholder",
                },
                orderbyTime: {
                    label: "field.orderbyTime.label",
                    placeholder: "field.orderbyTime.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
            },
            table: {
                btnAdd: "button.addUser",
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
                // thqType: t("commonLabel.all"),
                thqType: "",
                stockCode: "",
                registerDate: "",
            },
        });

        onMounted(() => {
            onReset();
        });

        const onSubmit = handleSubmit(async (values) => {
            lookupInfoPermissionStore.getList({ ...values, currentPage: 1 });
        });

        const onReset = () => {
            resetForm();

            lookupInfoPermissionStore.getList({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            lookupInfoPermissionStore.meta = getMeta(
                lookupInfoPermissionStore.meta,
                val
            );

            lookupInfoPermissionStore.getList(
                metaToParams(lookupInfoPermissionStore.meta)
            );
        };

        return {
            dataLocale,
            lookupInfoPermissionStore,
            onUpdatePagination,
            onSubmit,
            onReset,
            currentLang,
        };
    },
});
</script>
<style scoped></style>
