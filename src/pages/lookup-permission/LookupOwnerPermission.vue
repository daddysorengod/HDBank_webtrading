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
                                    return $t(item.label);
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
                        thqTypeOptions.map((item) => ({
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
                    >{{ $t(dataLocale.form.btnSearch) }} </q-btn
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
                v-model:pagination="lookupOwnPermissionStore.meta"
                :rows="lookupOwnPermissionStore.listOwnPermissions"
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
                    <span class="qc-table-top--title"
                        >{{ lookupOwnPermissionStore.meta.total }}
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
                                    enum-class="LookupOwnerPermissionStatus"
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
                        :rowsPerPage="lookupOwnPermissionStore.meta.rowsPerPage"
                        :currentPage="lookupOwnPermissionStore.meta.currentPage"
                        :lastPage="lookupOwnPermissionStore.meta.lastPage"
                        :total="lookupOwnPermissionStore.meta.total"
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
import { useLookupOwnPermissionStore } from "stores/lookupOwnPermission";
import { useCommonStore } from "stores/common";

export default defineComponent({
    name: "LookupOwnerPermission",
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
                    name: "accountName",
                    align: "left",
                    label: this.$t("field.accountName.label"),
                    field: "accountName",
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
                    name: "registerDate",
                    align: "left",
                    label: this.$t("field.registerDate.label"),
                    field: "registerDate",
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
                    name: "moneyAccount",
                    align: "left",
                    label: this.$t("field.moneyAccount.label"),
                    field: "moneyAccount",
                    sortable: false,
                },
                {
                    name: "permissionStockNumber",
                    required: true,
                    label: this.$t("field.permissionStockNumber.label"),
                    field: "permissionStockNumber",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    align: "center",
                    sortable: false,
                },
                {
                    name: "amountMoney",
                    align: "left",
                    label: this.$t("field.amountMoney.label"),
                    field: "amountMoney",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "amountAfterTax",
                    align: "left",
                    label: this.$t("field.amountAfterTax.label"),
                    field: "amountAfterTax",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "stockNewQuantity",
                    align: "left",
                    label: this.$t("field.stockNewQuantity.label"),
                    field: "stockNewQuantity",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "moneyExchange",
                    align: "left",
                    label: this.$t("field.moneyExchange.label"),
                    field: "moneyExchange",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "status",
                    align: "left",
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
                    name: "accountName",
                    align: "left",
                    label: this.$t("field.accountName.label"),
                    field: "accountName",
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
                    name: "registerDate",
                    align: "left",
                    label: this.$t("field.registerDate.label"),
                    field: "registerDate",
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
                    name: "moneyAccount",
                    align: "left",
                    label: this.$t("field.moneyAccount.label"),
                    field: "moneyAccount",
                    sortable: false,
                },
                {
                    name: "permissionStockNumber",
                    required: true,
                    label: this.$t("field.permissionStockNumber.label"),
                    field: "permissionStockNumber",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    align: "center",
                    sortable: false,
                },
                {
                    name: "amountMoney",
                    align: "left",
                    label: this.$t("field.amountMoney.label"),
                    field: "amountMoney",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "amountAfterTax",
                    align: "left",
                    label: this.$t("field.amountAfterTax.label"),
                    field: "amountAfterTax",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "stockNewQuantity",
                    align: "left",
                    label: this.$t("field.stockNewQuantity.label"),
                    field: "stockNewQuantity",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "moneyExchange",
                    align: "left",
                    label: this.$t("field.moneyExchange.label"),
                    field: "moneyExchange",
                    format: (val) => `${val?.toLocaleString("US") || ""}`,
                    sortable: false,
                },
                {
                    name: "status",
                    align: "left",
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

        const lookupOwnPermissionStore = useLookupOwnPermissionStore();

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
            lookupOwnPermissionStore.getList({ ...values, currentPage: 1 });
        });

        const onReset = () => {
            resetForm();

            lookupOwnPermissionStore.getList({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            lookupOwnPermissionStore.meta = getMeta(
                lookupOwnPermissionStore.meta,
                val
            );

            lookupOwnPermissionStore.getList(
                metaToParams(lookupOwnPermissionStore.meta)
            );
        };

        return {
            dataLocale,
            lookupOwnPermissionStore,
            onUpdatePagination,
            onSubmit,
            onReset,
            currentLang,
        };
    },
});
</script>
<style scoped></style>
