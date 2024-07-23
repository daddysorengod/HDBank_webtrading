<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="1000px"
            height-content="500px"
        ></QcCardSkeleton>

        <q-card style="width: 1000px; max-width: 80vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ dataLocale.title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pb-md">
                <div class="row">
                    <div class="col-6 flex items-center q-gutter-md">
                        <div class="vpb-form-group" style="width: 60%">
                            <QcLabel
                                :label="
                                    dataLocale.form.statementImportType.label
                                "
                            />
                            <QcSelect
                                :disabled="action !== 'create'"
                                :key="statementImportTypeKey"
                                :placeholder="
                                    dataLocale.form.statementImportType
                                        .placeholder
                                "
                                name="statementImportType"
                                :options="
                                    statementImportTypeOptions.map((item) => ({
                                        label: $t(item.label),
                                        value: item.value,
                                    }))
                                "
                                map-options
                                @change="onChangeStatementImportType"
                            />
                        </div>
                        <q-btn
                            v-if="action === 'create'"
                            @click="downloadTemplate"
                            class="qc-btn"
                            no-caps
                            color="primary"
                            size="large"
                        >
                            <q-icon left size="18px" name="assignment" />
                            <div>{{ dataLocale.btnDownloadTemplate }}</div>
                        </q-btn>
                    </div>
                    <div class="col-6">
                        <div v-if="action === 'create'" class="vpb-form-group">
                            <QcLabel :label="dataLocale.form.file.label" />
                            <QCFileUpload
                                name="file"
                                :placeholder="dataLocale.form.file.placeholder"
                                @change="onChangeFile"
                            />
                        </div>
                    </div>
                </div>

                <h4 class="vpb-title-in-form">
                    I. {{ dataLocale.importFormTitle }}
                </h4>

                <div class="vpb-file-errors" v-if="fileInvalid.status">
                    {{ fileInvalid.message }}
                </div>

                <q-table
                    class="qc-table my-sticky-header-table"
                    :rows="dataTable"
                    :columns="
                        valForm.statementImportType ===
                        StatementImportType.CUSTOMER_1.value
                            ? columns1
                            : columns2
                    "
                    row-key="id"
                    flat
                    bordered
                    hide-bottom
                    :loading="loadingFile"
                    virtual-scroll
                    :rows-per-page-options="[0]"
                    style="height: 400px"
                >
                    <template v-slot:top>
                        <img
                            src="/icons/ellipse-green.svg"
                            alt="Ellipse Green"
                        />
                        <span class="qc-table-top--title"
                            >{{ dataTable.length }}
                            {{ $t("system.result") }}</span
                        >
                    </template>
                </q-table>
            </q-card-section>

            <q-card-actions v-if="action === 'create' || action === 'update'">
                <q-btn
                    padding="12px 31.5px"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onSubmit"
                    :loading="isSubmitting"
                    >{{
                        action === "create"
                            ? dataLocale.form.btnConfirm
                            : dataLocale.form.btnSave
                    }}
                </q-btn>
            </q-card-actions>
            <q-card-actions
                class="qc-card-actions--end"
                v-else-if="action === 'delete'"
            >
                <q-btn
                    padding="12px 31.5px"
                    no-caps
                    color="negative"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onDelete"
                    :loading="isSubmitting"
                    >{{ dataLocale.form.btnDelete }}
                </q-btn>
            </q-card-actions>
            <q-card-actions
                v-else-if="action === 'approve'"
                class="qc-card-actions--center"
            >
                <q-btn
                    padding="12px 31.5px"
                    icon="close"
                    no-caps
                    color="negative"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onReject"
                    :loading="isSubmitting"
                    >{{ dataLocale.form.btnReject }}
                </q-btn>
                <q-btn
                    padding="12px 31.5px"
                    icon="check"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onApprove"
                    :loading="isSubmitting"
                    >{{ dataLocale.form.btnApprove }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { useDialogPluginComponent } from "quasar";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { saveAs } from "file-saver";
import StatementImportType from "src/common/types/statementImport";
import useReadFile from "src/composables/commons/useReadFile";
import QCFileUpload from "components/commons/QCFileUpload";
import { useCommonStore } from "stores/common";
import { useImportStatementStore } from "stores/importStatement";
import { formatDate } from "src/common/utils/helper";
import moment from "moment";
import { useApproveTransactionStore } from "stores/approveTransaction";
import OtpFrom from "components/transaction/OtpFrom.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import { useAuthStore } from "stores/auth";

export default defineComponent({
    name: "ImportForm",
    components: { QCFileUpload },
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
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const commonStore = useCommonStore();
        const importStatementStore = useImportStatementStore();
        const authStore = useAuthStore();

        const sizeFileAllow = 2;

        const statementImportTypeKey = ref(1);

        const { handleImport, fileInvalid, fileData, loadingFile } =
            useReadFile();

        const titleByAction = {
            create: t("title.import"),
            update: t("title.update"),
            detail: t("title.detail"),
            delete: t("title.delete"),
            approve: t("title.approve"),
        };

        const dataLocale = {
            title: titleByAction[props.action],
            importFormTitle: t("transaction.importFormTitle"),
            form: {
                file: {
                    label: t("field.file.label"),
                    placeholder: t("field.file.placeholder"),
                },
                statementImportType: {
                    label: t("field.statementImportType.label"),
                    placeholder: t("field.statementImportType.placeholder"),
                },
                btnConfirm: t("button.confirm"),
                btnSave: t("button.save"),
                btnDelete: t("button.delete"),
                btnReject: t("button.reject"),
                btnApprove: t("button.approve"),
            },
            btnDownloadTemplate: t("button.downloadTemplate"),
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(props.action);
        });

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();
        const { openDialog: openDialogOtpFrom } = useOpenDialog(OtpFrom);

        const approveTransactionStore = useApproveTransactionStore();

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const yupObject = {
            statementImportType: yup
                .string()
                .required(
                    `${dataLocale.form.statementImportType.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.statementImportType.label),
            file: yup
                .mixed()
                .required(
                    `${dataLocale.form.file.label} ${t("validation.required")}`
                )
                .test(
                    "fileSize",
                    t("importFile.fileSize") + sizeFileAllow + "MB",
                    (value) => value && value.size <= sizeFileAllow * 1048576
                )
                .test(
                    "fileFormat",
                    t("importFile.fileFormat"),
                    (value) =>
                        value &&
                        (value.name.endsWith("xls") ||
                            value.name.endsWith("xlsx"))
                )
                .label(dataLocale.form.file.label),
        };

        const schema = yup.object(yupObject);

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            values: valForm,
            errors,
            setFieldValue,
        } = useForm({
            validationSchema: schema,
            initialValues: {
                statementImportType: StatementImportType.CUSTOMER_1.value,
            },
        });

        const columns1 = ref([
            {
                name: "companyCode",
                align: "left",
                label: t("field.companyCode.label"),
                field: "BrokerCode",
                sortable: false,
            },
            {
                name: "statementType",
                align: "center",
                label: t("field.statementType.label"),
                field: "TransType",
                sortable: false,
            },
            {
                name: "depositoryAccountNumber",
                align: "left",
                label: t("field.depositoryAccountNumber.label"),
                field: "FundCode",
                sortable: false,
            },
            {
                name: "stockCode",
                align: "left",
                label: t("field.stockCode.label"),
                field: "SecID",
                sortable: false,
            },
            {
                name: "transactionDate",
                align: "center",
                label: t("field.transactionDate.label"),
                field: "StrTradeDate",
                sortable: false,
            },
            {
                name: "payDate",
                align: "center",
                label: t("field.payDate.label"),
                field: "StrSettleDate",
                sortable: false,
            },
            {
                name: "stockQuantity",
                align: "right",
                label: t("field.stockQuantity.label"),
                field: "Quantity",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "price",
                align: "right",
                label: t("field.price.label"),
                field: "Price",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "totalPrice",
                align: "right",
                label: t("field.totalPrice.label"),
                field: "GrossAmount",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "commissionFee",
                align: "right",
                label: t("field.commissionFee.label"),
                field: "CommissionFee",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "tax",
                align: "right",
                label: t("field.tax.label"),
                field: "Tax",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "netAmount",
                align: "right",
                label: t("field.netAmount.label"),
                field: "NetAmount",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "description",
                align: "right",
                label: t("field.description.label"),
                field: "Description",
                sortable: false,
            },
        ]);

        const columns2 = ref([
            {
                name: "orderNumber",
                align: "left",
                label: t("field.orderNumber.label"),
                field: "OrderNumber",
                sortable: false,
            },
            {
                name: "depositoryAccountNumber",
                align: "left",
                label: t("field.depositoryAccountNumber.label"),
                field: "FundCode",
                sortable: false,
            },
            {
                name: "stockCode",
                align: "right",
                label: t("field.stockCode.label"),
                field: "TickerCode",
                sortable: false,
            },
            {
                name: "statementType",
                align: "center",
                label: t("field.statementType.label"),
                field: "Type",
                sortable: false,
            },
            {
                name: "isinCode",
                align: "right",
                label: t("field.isinCode.label"),
                field: "ISINCode",
                sortable: false,
            },
            {
                name: "description",
                align: "right",
                label: t("field.description.label"),
                field: "Description",
                sortable: false,
            },
            {
                name: "stockQuantity",
                align: "right",
                label: t("field.stockQuantity.label"),
                field: "Quantity",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "price",
                align: "right",
                label: t("field.price.label"),
                field: "Price",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "commissionFee",
                align: "right",
                label: t("field.commissionFee.label"),
                field: "CommissionFee",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "tax",
                align: "right",
                label: t("field.tax.label"),
                field: "Tax",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "totalPrice",
                align: "right",
                label: t("field.totalPrice.label"),
                field: "GrossAmount",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "netAmount",
                align: "right",
                label: t("field.netAmount.label"),
                field: "NetAmount",
                format: (val) => `${val?.toLocaleString("US") || ""}`,
                sortable: false,
            },
            {
                name: "ccy",
                align: "right",
                label: t("field.ccy.label"),
                field: "CCY",
                sortable: false,
            },
            {
                name: "transactionDate",
                align: "center",
                label: t("field.transactionDate.label"),
                field: "StrTradeDate",
                sortable: false,
            },
            {
                name: "payDate",
                align: "center",
                label: t("field.payDate.label"),
                field: "StrOriginalSettleDate",
                sortable: false,
            },
            {
                name: "companyCode",
                align: "left",
                label: t("field.companyCode.label"),
                field: "Broker",
                sortable: false,
            },
        ]);

        const dataTable = ref([]);

        onMounted(async () => {
            setTimeout(() => (statementImportTypeKey.value = 2));

            if (props.id) {
                skeleton.value = true;

                await importStatementStore.getDetail(props.id);

                setFieldValue(
                    "statementImportType",
                    importStatementStore.statement.importType
                );

                dataTable.value = importStatementStore.statement.importInfo;

                setTimeout(() => (statementImportTypeKey.value = 3));

                skeleton.value = false;
            }
        });

        const onSubmit = handleSubmit(async (values) => {
            if (fileInvalid.value.status) return;

            const systemDate = await commonStore.getSystemDate();

            const data = {
                regisMasterInfo: {
                    Txdate: formatDate(systemDate),
                },
                importInfo: dataTable.value,
            };

            try {
                if (checkIfOnlyAfmast(data.importInfo)) {
                    await importStatementStore.importStatement(
                        data,
                        valForm.statementImportType
                    );
                    onDialogCancel();
                }
            } catch (e) {
                onDialogCancel();
                throw e;
            }
        });

        const checkIfOnlyAfmast = (importInfo) => {
            const currentListAfmast = importInfo.map((item) => item.FundCode);

            const otherAfmast = currentListAfmast.filter(
                (item) => item !== currentListAfmast[0]
            );

            if (otherAfmast && otherAfmast.length) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.valiateAfmast"),
                };

                return false;
            } else return true;
        };

        const downloadTemplate = () => {
            if (
                valForm.statementImportType ===
                StatementImportType.CUSTOMER_1.value
            ) {
                saveAs(
                    `${process.env.VUE_APP_API}${process.env.VUE_APP_LINK_TEMPLATE_1}`
                );
            } else {
                saveAs(
                    `${process.env.VUE_APP_API}${process.env.VUE_APP_LINK_TEMPLATE_2}`
                );
            }
        };

        const onChangeFile = (val) => {
            if (!val) return;

            handleImport(val, validateFunc);
        };

        const onChangeStatementImportType = (val) => {
            fileData.value = [];
            fileInvalid.value = {
                status: false,
                message: "",
            };
            dataTable.value = [];
            setFieldValue("file", null);
        };

        const oneHeaders = [
            "Broker Code",
            "Trans Type",
            "Fund Code",
            "Sec ID",
            "Trade date\n" + "(yyyymmdd)",
            "Settle date\n" + "(yyyymmdd)",
            "Quantity(shs)",
            "Price(VND)",
            "Gross  Amount(VND)",
            "Commission Fee(VND)",
            "Tax",
            "Net Amount(VND)",
        ];

        const twoHeaders = [
            "Order Number",
            "Fund Code",
            "Ticker Code",
            "Type",
            "ISIN Code",
            "Description",
            "Quantity",
            "Price",
            "Commission",
            "Tax+other fee",
            "Principal\n" + "Amount",
            "Net\n" + "Proceeds",
            "CCY",
            "Trade Date",
            "Original Settle Date",
            "Broker",
        ];

        const validateFunc = (fileArray) => {
            if (!fileArray.length) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.validateFile"),
                };
                return;
            }

            if (
                valForm.statementImportType ===
                    StatementImportType.CUSTOMER_1.value &&
                !isValidHeader1(fileArray[0])
            ) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.validateFile"),
                };
                return;
            }

            if (
                valForm.statementImportType ===
                    StatementImportType.CUSTOMER_2.value &&
                !isValidHeader2(fileArray[0])
            ) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.validateFile"),
                };
                return;
            }

            if (
                valForm.statementImportType ===
                    StatementImportType.CUSTOMER_1.value &&
                !isValidContent1(fileArray.slice(1, fileArray.length))
            ) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.emptyFile"),
                };
                return;
            }

            if (
                valForm.statementImportType ===
                    StatementImportType.CUSTOMER_2.value &&
                !isValidContent2(fileArray.slice(1, fileArray.length))
            ) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.emptyFile"),
                };
                return;
            }
            return;
        };

        const mappingData1 = {
            0: "BrokerCode",
            1: "TransType",
            2: "FundCode",
            3: "SecID",
            4: "StrTradeDate",
            5: "StrSettleDate",
            6: "Quantity",
            7: "Price",
            8: "GrossAmount",
            9: "CommissionFee",
            10: "Tax",
            11: "NetAmount",
            12: "Description",
        };

        const mappingData2 = {
            0: "OrderNumber",
            1: "FundCode",
            2: "TickerCode",
            3: "Type",
            4: "ISINCode",
            5: "Description",
            6: "Quantity",
            7: "Price",
            8: "CommissionFee",
            9: "Tax",
            10: "GrossAmount",
            11: "NetAmount",
            12: "CCY",
            13: "StrTradeDate",
            14: "StrOriginalSettleDate",
            15: "Broker",
        };

        const convertDataToTable = (data, importType) => {
            const result = {};
            if (importType === StatementImportType.CUSTOMER_1.value)
                for (let i = 0; i < data.length; i++) {
                    result[mappingData1[i]] = data[i];
                }

            if (importType === StatementImportType.CUSTOMER_2.value)
                for (let i = 0; i < data.length; i++) {
                    if (
                        mappingData2[i] === "StrTradeDate" ||
                        mappingData2[i] === "StrOriginalSettleDate"
                    ) {
                        try {
                            result[mappingData2[i]] = moment(data[i]).format(
                                "YYYY-MM-DD"
                            );
                        } catch (e) {
                            result[mappingData2[i]] = data[i];
                        }
                    } else {
                        result[mappingData2[i]] = data[i];
                    }
                }

            return result;
        };

        const isValidHeader1 = (headers) => {
            if (headers.length !== 12) {
                return false;
            }

            for (let i = 0; i <= headers.length; i++) {
                if (oneHeaders[i] !== headers[i]) {
                    if (oneHeaders[i] !== headers[i].replace("\r\n", "")) {
                    } else return false;
                }
            }

            return true;
        };

        const isValidHeader2 = (headers) => {
            if (headers.length !== 16) return false;

            for (let i = 0; i <= headers.length; i++) {
                if (twoHeaders[i] !== headers[i]) {
                    if (twoHeaders[i] !== headers[i].replace("\r\n", "")) {
                    } else return false;
                }
            }

            return true;
        };

        const isValidContent1 = (datas) => {
            if (!datas.length) return false;

            dataTable.value = [];

            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];

                if (data.length !== 12) return false;

                for (let j = 0; j < data.length; j++) {
                    if (data[j] === "") return false;
                }

                dataTable.value.push(
                    convertDataToTable(
                        data,
                        StatementImportType.CUSTOMER_1.value
                    )
                );
            }

            return true;
        };

        const isValidContent2 = (datas) => {
            if (!datas.length) return false;

            dataTable.value = [];

            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];

                if (data.length !== 16) return false;

                for (let j = 0; j < data.length; j++) {
                    if (data[j] === "") return false;
                }

                dataTable.value.push(
                    convertDataToTable(
                        data,
                        StatementImportType.CUSTOMER_2.value
                    )
                );
            }

            return true;
        };

        const onApprove = async () => {
            const checkCorrectOtp =
                await approveTransactionStore?.checkBeforeVerifyOtp({
                    userId: authStore?.user?.UserId,
                    transactionId: props?.id,
                });

            if (checkCorrectOtp) {
                const params = {
                    userId: authStore?.user?.UserId,
                    transactionId: props?.id,
                    transactionTypeId: "1",
                    transactionData: "1",
                    challenge: "",
                    callbackUrl: "",
                    isOnline: "0",
                    isPush: "1",
                    notificationInfo: {
                        title: "Please confirm the transaction",
                        body: "You are making transaction on VPBank custody online. Please confirm the transaction",
                    },
                    eSignerTypeId: "7",
                    channelId: "0",
                };

                const requestOTPCode =
                    await approveTransactionStore?.requestTransactionCode(
                        params
                    );

                if (requestOTPCode) {
                    onDialogCancel();

                    openDialogOtpFrom({
                        data: {
                            userId: authStore?.user?.UserId,
                            transactionId: props?.id,
                        },
                    });
                }
            }
        };

        const onReject = async () => {
            try {
                await approveTransactionStore.rejectTransaction(props.id);
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        const onDelete = async () => {
            try {
                await importStatementStore.deleteStatement(props.id);
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        return {
            dialogRef,
            isSubmitting,
            skeleton,
            onSubmit,
            valForm,
            dataLocale,
            dataForm,
            inputDisabled,
            autoApprove,
            onApprove,
            onReject,
            onDelete,
            columns1,
            columns2,
            downloadTemplate,
            statementImportTypeKey,
            loadingFile,
            fileData,
            dataTable,
            fileInvalid,
            StatementImportType,
            onChangeStatementImportType,
            errors,
            onChangeFile,
        };
    },
});
</script>

<style scoped></style>
