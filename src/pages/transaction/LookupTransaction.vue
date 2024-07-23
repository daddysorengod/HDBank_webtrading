<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.transactionType.label" />
                <QcSelect
                    :placeholder="dataLocale.form.transactionType.placeholder"
                    name="transactionType"
                    :options="
                        currentLang === 'vi'
                            ? transactionTypesOptions.map((item, index) => {
                                  if (index === 0) {
                                      return {
                                          label: $t(item.label),
                                          value: item.value,
                                      };
                                  } else
                                      return {
                                          label: item.label,
                                          value: item.value,
                                      };
                              })
                            : transactionTypesOptions.map((item, index) => {
                                  if (index === 0) {
                                      return {
                                          label: $t(item.label),
                                          value: item.value,
                                      };
                                  } else
                                      return {
                                          label: item.subLabel,
                                          value: item.value,
                                      };
                              })
                    "
                    map-options
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.transactionId.label" />
                <QcInput
                    outlined
                    name="transactionId"
                    :placeholder="dataLocale.form.transactionId.placeholder"
                />
            </div>

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
                <QcLabel :label="dataLocale.form.createdBy.label" />
                <QcInput
                    outlined
                    name="createdBy"
                    :placeholder="dataLocale.form.createdBy.placeholder"
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
                v-model:pagination="approveTransactionStore.meta"
                :rows="approveTransactionStore.listTransactions"
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
                        v-if="approveTransactionStore.meta.total > 1"
                        >{{ approveTransactionStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="approveTransactionStore.meta.total <= 1"
                        >{{ approveTransactionStore.meta.total }}
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
                        <q-th key="action">
                            {{ $t(dataLocale.table.colAction) }}
                        </q-th>
                        <q-th key="downloadHTML">
                            {{ $t(dataLocale.table.bttDownloadHTML) }}
                        </q-th>
                        <q-th key="downloadXML">
                            {{ $t(dataLocale.table.bttDownloadXML) }}
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

                        <q-td align="center" auto-width>
                            <q-btn
                                flat
                                size="sm"
                                round
                                @click="detailAction(props.row)"
                            >
                                <img src="/icons/vp-eye.svg" />
                            </q-btn>
                        </q-td>
                        <q-td align="center" auto-width>
                            <q-btn
                                v-if="props.row.HtmlFile"
                                flat
                                size="sm"
                                square
                                no-caps
                                color="primary"
                                @click="onPressDownload(props.row.HtmlFile)"
                            >
                                <q-icon
                                    center
                                    size="18px"
                                    name="file_download"
                                />
                                <div class="center">
                                    {{ $t(dataLocale.table.bttDownloadHTML) }}
                                </div>
                            </q-btn>
                        </q-td>

                        <q-td align="center" auto-width>
                            <q-btn
                                v-if="props.row.XmlFile"
                                flat
                                size="sm"
                                square
                                no-caps
                                color="primary"
                                @click="onPressDownload(props.row.XmlFile)"
                            >
                                <q-icon
                                    center
                                    size="18px"
                                    name="file_download"
                                />
                                <div class="center">
                                    {{ $t(dataLocale.table.bttDownloadXML) }}
                                </div>
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>

                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="approveTransactionStore.meta.rowsPerPage"
                        :currentPage="approveTransactionStore.meta.currentPage"
                        :lastPage="approveTransactionStore.meta.lastPage"
                        :total="approveTransactionStore.meta.total"
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
import useOpenDialog from "src/composables/commons/useOpenDialog";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useForm } from "vee-validate";
import { useApproveTransactionStore } from "stores/approveTransaction";
import { getMeta, metaToParams } from "src/common/utils/helper";
import RequestDepositoryForm from "components/transaction/RequestDepositoryForm";
import RequestWithdrawForm from "components/transaction/RequestWithdrawForm";
import GetActiveCode from "components/transaction/GetActiveCode.vue";
import TransactionWithdrawType from "src/common/types/transactionWithdraw";
import TransactionDepositoryType from "src/common/types/transactionDepository";
import { ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import OrderForm from "components/transaction/OrderForm";
import OtpFrom from "components/transaction/OtpFrom.vue";
import UnVertifyActiveCode from "components/transaction/UnVertifyActiveCode.vue";
import ImportForm from "src/components/transaction/ImportForm.vue";
import OrderAfmastType from "src/common/types/orderAfmast";
import { useCommonStore } from "stores/common";

export default defineComponent({
    name: "ApproveTransaction",
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columnsVI = [
                {
                    name: "id",
                    field: "id",
                },
                {
                    name: "transactionType",
                    required: true,
                    label: this.$t("field.transactionType.label"),
                    field: "transactionTypeNameVI",
                    align: "left",
                    format: (val) => `${val}`,
                    sortable: false,
                },
                {
                    name: "transactionId",
                    required: true,
                    label: this.$t("field.transactionId.label"),
                    field: "transId",
                    align: "left",
                    // format: (val) => `${val}`,
                    sortable: false,
                },
                {
                    name: "depositoryAccountNumber",
                    align: "left",
                    label: this.$t("field.depositoryAccountNumber.label"),
                    field: "depositoryAccountNumber",
                    sortable: false,
                },
                {
                    name: "createdBy",
                    align: "left",
                    label: this.$t("field.createdBy.label"),
                    field: "createdBy",
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
                    name: "stockCode",
                    align: "left",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
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
                    name: "transactionType",
                    required: true,
                    label: this.$t("field.transactionType.label"),
                    field: "transactionTypeNameEN",
                    align: "left",
                    format: (val) => `${val}`,
                    sortable: false,
                },
                {
                    name: "transactionId",
                    required: true,
                    label: this.$t("field.transactionId.label"),
                    field: "transId",
                    align: "left",
                    // format: (val) => `${val}`,
                    sortable: false,
                },
                {
                    name: "depositoryAccountNumber",
                    align: "left",
                    label: this.$t("field.depositoryAccountNumber.label"),
                    field: "depositoryAccountNumber",
                    sortable: false,
                },
                {
                    name: "createdBy",
                    align: "left",
                    label: this.$t("field.createdBy.label"),
                    field: "createdBy",
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
                    name: "stockCode",
                    align: "left",
                    label: this.$t("field.stockCode.label"),
                    field: "stockCode",
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

        const approveTransactionStore = useApproveTransactionStore();

        const { openDialog: openDialogDepositoryForm } = useOpenDialog(
            RequestDepositoryForm
        );
        const { openDialog: openDialogWithdrawForm } =
            useOpenDialog(RequestWithdrawForm);
        const { openDialog: openDialogOrderForm } = useOpenDialog(OrderForm);
        const { openDialog: openDialogGetActiveCode } =
            useOpenDialog(GetActiveCode);
        const { openDialog: openDialogOtpFrom } = useOpenDialog(OtpFrom);
        const { openDialog: openDialogUnVertifyActiveCode } =
            useOpenDialog(UnVertifyActiveCode);
        const { openDialog: openImportForm } = useOpenDialog(ImportForm);

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
                transactionType: {
                    label: "field.transactionType.label",
                    placeholder: "field.transactionType.placeholder",
                },
                transactionId: {
                    label: "field.transactionId.label",
                    placeholder: "field.transactionId.placeholder",
                },
                depositoryAccountNumber: {
                    label: "field.depositoryAccountNumber.label",
                    placeholder: "field.depositoryAccountNumber.placeholder",
                },
                createdBy: {
                    label: "field.createdBy.label",
                    placeholder: "field.createdBy.placeholder",
                },
                transactionDate: {
                    label: "field.transactionDate.label",
                    placeholder: "field.transactionDate.placeholder",
                },
                stockCode: {
                    label: "field.stockCode.label",
                    placeholder: "field.stockCode.placeholder",
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
                btnConfirm: "button.getActiveCode",
            },
            table: {
                btnDownload: "button.downloadHTML_XML",
                colAction: "title.functional",
                bttDownloadHTML: "button.downloadHTML",
                bttDownloadXML: "button.downloadXML",
                // colApprove: ("title.approve")
            },
        };

        const {
            handleSubmit,
            values: valForm,
            resetForm,
            setValues,
        } = useForm({
            initialValues: {
                // transactionType: t("commonLabel.all"),
                transactionType: "",
                transactionId: "",
                // depositoryAccountNumber: t("commonLabel.all"),
                depositoryAccountNumber: "",
                createdBy: "",
                transactionDate: "",
                // stockCode: t("commonLabel.all"),
                // status: t("commonLabel.all"),
                stockCode: "",
                status: "",
            },
        });

        onMounted(() => {
            onReset();
        });

        const onSubmit = handleSubmit(async (values) => {
            approveTransactionStore.getListLookupTransaction({
                ...values,
                currentPage: 1,
            });
        });

        const onReset = () => {
            resetForm();

            approveTransactionStore.getListLookupTransaction({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            approveTransactionStore.meta = getMeta(
                approveTransactionStore.meta,
                val
            );

            approveTransactionStore.getListLookupTransaction(
                metaToParams(approveTransactionStore.meta)
            );
        };

        const detailAction = (transaction) => {
            approveTransactionStore.currentActionTransaction = "detail";

            if (
                TransactionWithdrawType.getValues().includes(
                    transaction.transactionType
                )
            ) {
                openDialogWithdrawForm({
                    action: "detail",
                    id: transaction.id,
                    transactionType: transaction.transactionType,
                });
            } else if (
                TransactionDepositoryType.getValues().includes(
                    transaction.transactionType
                )
            ) {
                openDialogDepositoryForm({
                    action: "detail",
                    id: transaction.id,
                    transactionType: transaction.transactionType,
                });
            } else if (
                OrderAfmastType.getValues().includes(
                    transaction.transactionType
                )
            ) {
                openDialogOrderForm({
                    action: "detail",
                    data: {
                        afacctno: transaction.depositoryAccountNumber,
                        id: transaction.id,
                    },
                });
            } else {
                openImportForm({
                    action: "detail",
                    id: transaction.id,
                });
            }
        };

        const onPressDownload = (itemLink) => {
            if (!itemLink) return;
            window.open(
                `${process.env.VUE_APP_API_TEMPLATE_ESIGN_HUB_FILES}?filename=${itemLink}`
            );

            // row.filesSave.forEach(function (e) {
            //     fetch(e.download)
            //       .then(res => res.blob()) // Gets the response and returns it as a blob
            //       .then(blob => {
            //         saveAs(blob, e.filename);
            //     });
            // });
        };

        return {
            dataLocale,
            detailAction,
            approveTransactionStore,
            onUpdatePagination,
            onSubmit,
            onReset,
            onPressDownload,
            currentLang,
        };
    },
});
</script>
<style scoped></style>
