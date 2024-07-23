<template>
    <div class="vpb-order-form-group">
        <div class="row q-col-gutter-sm">
            <div class="col-3">
                <div class="vpb-form-group">
                    <QcLabel
                        :label="
                            dataLocale.formFilter.depositoryAccountNumber.label
                        "
                    />
                    <QcSelect
                        :placeholder="
                            dataLocale.formFilter.depositoryAccountNumber
                                .placeholder
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

                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.formFilter.stockCode.label" />
                    <QcSelect
                        :placeholder="
                            dataLocale.formFilter.stockCode.placeholder
                        "
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

                <div class="vpb-form-group">
                    <QcLabel
                        :label="dataLocale.formFilter.transactionDate.label"
                    />
                    <QcDatePicker
                        :disabled="inputDisabled"
                        outlined
                        name="transactionDate"
                        :placeholder="
                            dataLocale.formFilter.transactionDate.placeholder
                        "
                    />
                </div>

                <div class="vpb-form-group">
                    <QcLabel
                        :label="dataLocale.formFilter.serialNumber.label"
                    />
                    <QcInput
                        :disabled="inputDisabled"
                        outlined
                        name="serialNumber"
                        :placeholder="
                            dataLocale.formFilter.serialNumber.placeholder
                        "
                    />
                </div>

                <div class="vpb-filter-group vpb-filter-group--btn full-width">
                    <q-btn
                        no-caps
                        color="primary"
                        size="lg"
                        class="qc-btn full-width"
                        unelevated
                        @click="onSubmitFilter"
                        >{{ dataLocale.formFilter.btnSearch }}</q-btn
                    >
                    <q-btn
                        no-caps
                        color="primary"
                        size="lg"
                        class="qc-btn qc-btn--primary-second full-width"
                        unelevated
                        @click="onResetFilter"
                        >{{ dataLocale.formFilter.btnReset }}</q-btn
                    >
                </div>
            </div>
            <div class="col-9">
                <q-table
                    style="max-height: 367px"
                    class="qc-table"
                    v-model:pagination="transWithdrawStore.OTCMeta"
                    :rows="transWithdrawStore.listOTC"
                    :columns="columns"
                    :visible-columns="visibleColumns"
                    :rows-per-page-options="[]"
                    row-key="otcId"
                    flat
                    bordered
                    selection="single"
                    v-model:selected="selectedOtc"
                >
                    <template v-slot:top>
                        <img
                            src="/icons/ellipse-green.svg"
                            alt="Ellipse Green"
                        />
                        <span class="qc-table-top--title"
                            >{{ transWithdrawStore.OTCMeta.total }}
                            {{ $t("system.result") }}</span
                        >
                    </template>
                    <template v-slot:pagination>
                        <QcPagination
                            :rowsPerPage="
                                transWithdrawStore.OTCMeta.rowsPerPage
                            "
                            :currentPage="
                                transWithdrawStore.OTCMeta.currentPage
                            "
                            :lastPage="transWithdrawStore.OTCMeta.lastPage"
                            :total="transWithdrawStore.OTCMeta.total"
                            @change-pagination="onUpdatePagination"
                        />
                    </template>
                </q-table>
            </div>
        </div>
    </div>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { computed, onMounted, ref, watch } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useTransWithdrawStore } from "stores/transactionWithdraw";
import { getMeta, metaToParams } from "src/common/utils/helper";
import { ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import { useCommonStore } from "stores/common";

export default {
    name: "RequestWithdrawFilterVPB",
    mixins: [componentOptionsMixin],
    props: {
        id: Number,
        action: {
            type: String,
            default: "create",
            validator(value) {
                return ["create", "update", "detail", "approve"].includes(
                    value
                );
            },
        },
        step: {
            type: Number,
            default: 1,
            validator(value) {
                return [1, 2].includes(value);
            },
        },
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props, { emit }) {
        const { t } = useI18n();

        const transWithdrawStore = useTransWithdrawStore();
        const commonStore = useCommonStore();

        const dataLocale = {
            requestWithdrawChooseVPBTitle: t(
                "transaction.requestWithdrawChooseVPBTitle"
            ),
            requestWithdrawVPBTitle: t("transaction.requestWithdrawVPBTitle"),
            formFilter: {
                depositoryAccountNumber: {
                    label: t("field.depositoryAccountNumber.label"),
                    placeholder: t("field.depositoryAccountNumber.placeholder"),
                },
                transactionDate: {
                    label: t("field.transactionDate.label"),
                    placeholder: t("field.transactionDate.placeholder"),
                },
                stockCode: {
                    label: t("field.stockCode.label"),
                    placeholder: t("field.stockCode.placeholder"),
                },
                serialNumber: {
                    label: t("field.serialNumber.label"),
                    placeholder: t("field.serialNumber.placeholder"),
                },
                btnSearch: t("button.search"),
                btnReset: t("button.reset"),
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(props.action);
        });

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const yupObjectFilter = {
            depositoryAccountNumber: yup
                .string()
                .nullable()
                .label(dataLocale.formFilter.depositoryAccountNumber.label),
            stockCode: yup
                .string()
                .nullable()
                .label(dataLocale.formFilter.stockCode.label),
            transactionDate: yup
                .string()
                .nullable()
                .label(dataLocale.formFilter.transactionDate.label),
            serialNumber: yup
                .string()
                .nullable()
                .label(dataLocale.formFilter.serialNumber.label),
        };

        const schemaFilter = yup.object(yupObjectFilter);

        const columns = [
            {
                name: "otcId",
                label: "id",
            },
            {
                name: "otcSeri",
                label: "otcSeri",
            },
            {
                name: "depositoryAccountNumber",
                align: "left",
                label: t("field.depositoryAccountNumber.label"),
                field: "depositoryAccountNumber",
                sortable: false,
            },
            {
                name: "stockCode",
                align: "left",
                label: t("field.stockCode.label"),
                field: "stockCode",
                sortable: false,
            },
            {
                name: "transactionDate",
                align: "left",
                label: t("field.transactionDate.label"),
                field: "transactionDate",
                sortable: false,
            },
            {
                name: "serialNumber",
                align: "center",
                label: t("field.serialNumber.label"),
                field: "serialNumber",
                sortable: false,
            },
        ];

        const visibleColumns = columns
            .filter(
                (column) => column.name !== "otcId" && column.name !== "otcSeri"
            )
            .map((column) => column.name);

        const rows = ref([]);

        onMounted(() => {
            transWithdrawStore.getListOTC({}, true);
        });

        const {
            handleSubmit: handleSubmitFilter,
            isSubmitting: isSubmittingFilter,
            setValues: setValuesFilter,
            values: valFormFilter,
            resetForm: resetFormFilter,
        } = useForm({
            validationSchema: schemaFilter,
            initialValues: {
                depositoryAccountNumber: t("commonLabel.all"),
                stockCode: t("commonLabel.all"),
            },
        });

        const onSubmitFilter = handleSubmitFilter(async (values) => {
            transWithdrawStore.getListOTC(values);
        });

        const onResetFilter = () => {
            resetFormFilter();

            transWithdrawStore.getListOTC({
                depositoryAccountNumber: "",
                stockCode: "",
                transactionDate: "",
                serialNumber: "",
                pagenumber: 1,
                pagesize: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            transWithdrawStore.OTCMeta = getMeta(
                transWithdrawStore.OTCMeta,
                val
            );

            transWithdrawStore.getListOTC(
                metaToParams(transWithdrawStore.OTCMeta)
            );
        };

        const selectedOtc = ref([]);

        watch(
            selectedOtc,
            async (val) => {
                emit("change-otc-selected", val[0]);
            },
            { deep: true }
        );

        const onApprove = () => {
            onDialogCancel();
        };

        const onReject = () => {
            onDialogCancel();
        };

        const onDelete = () => {
            onDialogCancel();
        };

        return {
            dialogRef,
            isSubmittingFilter,
            skeleton,
            valFormFilter,
            dataLocale,
            dataForm,
            inputDisabled,
            autoApprove,
            onApprove,
            onReject,
            onDelete,
            rows,
            columns,
            selectedOtc,
            transWithdrawStore,
            onUpdatePagination,
            visibleColumns,
            onSubmitFilter,
            onResetFilter,
        };
    },
};
</script>

<style scoped></style>
