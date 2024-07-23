<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="1200px"
            height-content="500px"
        ></QcCardSkeleton>

        <q-card style="width: 1200px; max-width: 95vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ dataLocale.title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pb-md">
                <div class="row">
                    <div class="col-2 flex items-center q-gutter-md">
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
                            <QCFileUploadFA
                                name="file"
                                :placeholder="dataLocale.form.file.placeholder"
                                @change="onChangeFile"
                            />
                        </div>
                    </div>
                    <div class="col-3" style="margin-left: 30px">
                        <div v-if="action === 'create'" class="vpb-form-group">
                            <QcLabel :label="dataLocale.form.note.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="note"
                                :placeholder="dataLocale.form.note.placeholder"
                                @change="onChangeNote"
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
                <div class="vpb-file-errors" v-if="fileDoInvalid.status">
                    <div v-if="fileDoInvalid.message.length == 0">
                        {{ $t("responseMessage.errorOccurred") }}
                    </div>
                    <div
                        v-else
                        v-for="(error, index) in fileDoInvalid.message"
                        :key="index"
                    >
                        {{ error }}
                    </div>
                </div>
                <!-- Thanh tab -->
                <q-tabs
                    v-model="nameTableActive"
                    class="qc-tab header-menu-fa"
                    no-caps
                    narrow-indicator
                    active-color="primary"
                >
                    <q-route-tab
                        :to="{ name: route.name }"
                        class="text-dark-gray"
                        :key="route.name"
                        v-for="route in listTabTable.slice(0, 9)"
                        :name="route.name"
                        :label="route.label"
                        @click="onTabChange(route.name)"
                    />
                </q-tabs>
                <template v-for="(tab, index) in listTabTable" :key="index">
                    <div v-if="nameTableActive === tab.name && index < 9">
                        <q-table
                            class="qc-table my-sticky-header-table"
                            :rows="dataImport[index]"
                            :columns="dataColumns[index]"
                            row-key="id"
                            flat
                            bordered
                            hide-bottom
                            :loading="loadingFile"
                            virtual-scroll
                            :rows-per-page-options="[0]"
                            style="max-height: 320px"
                        >
                            <template v-slot:top>
                                <img
                                    src="/icons/ellipse-green.svg"
                                    alt="Ellipse Green"
                                />
                                <span class="qc-table-top--title">
                                    {{
                                        dataImport[index]
                                            ? dataImport[index].length
                                            : 0
                                    }}
                                    {{ $t("system.result") }}
                                </span>
                            </template>
                        </q-table>
                    </div>
                </template>
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
                class="qc-card-actions--right"
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
                    :loading="isSubReject"
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
                    :loading="isSubApprove"
                    >{{ dataLocale.form.btnApprove }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { useDialogPluginComponent } from "quasar";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { saveAs } from "file-saver";
import StatementImportType from "src/common/types/statementImport";
import useReadFileFa from "src/composables/commons/useReadFileFa";
import QCFileUploadFA from "components/commons/QCFileUploadFA";
import { useCommonStore } from "stores/common";
import { useImportFaStatementStore } from "stores/importFaStatement";
import { formatDate } from "src/common/utils/helper";
import moment from "moment";
import OtpFaFrom from "components/fund-admin/OtpFaFrom.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import { useAuthStore } from "stores/auth";
import {
    listTabTableFa,
    dataColumnsFa,
    listHeadersFa,
    mappingDataFa,
    dateFieldsFa,
    numberFieldsFa,
} from "src/constants/configImportFa";
import { SUCCESS_CODE } from "src/common/constant";

export default defineComponent({
    name: "ImportFaForm",
    components: { QCFileUploadFA },
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
        const importFaStatementStore = useImportFaStatementStore();
        const authStore = useAuthStore();

        const statementImportTypeKey = ref(1);

        const {
            handleImport,
            fileInvalid,
            fileDoInvalid,
            fileData,
            loadingFile,
        } = useReadFileFa();

        const titleByAction = {
            create: t("title.importTransaction"),
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
                note: {
                    label: t("field.note.label"),
                    placeholder: t("field.note.placeholder"),
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
        const { openDialog: openDialogOtpFaFrom } = useOpenDialog(OtpFaFrom);

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
            values: valForm,
            errors,
            setFieldValue,
        } = useForm({
            validationSchema: schema,
            initialValues: {
                statementImportType: StatementImportType.CUSTOMER_1.value,
            },
        });

        const listTabTable = ref(
            listTabTableFa.map((tab) => ({
                ...tab,
                label: t(tab.label),
            }))
        );

        const nameTableActive = ref("fundCertificates");

        const dataColumns = ref(
            dataColumnsFa.map((tab) => {
                // Kiểm tra xem tab có thuộc tính label không
                if (tab && tab.length > 0 && tab[0].hasOwnProperty("label")) {
                    return tab.map((column) => ({
                        ...column,
                        label: t(column.label),
                    }));
                } else {
                    return tab;
                }
            })
        );

        const dataISheet = ref([]);
        const dataISheetValidate = ref([]);
        const dataImport = ref([]);
        const dataRequestValidate = ref([]);
        const dataSubmit = ref({});
        const descriptionImport = ref("");

        const isSubmitting = ref(false);
        const isSubApprove = ref(false);
        const isSubReject = ref(false);

        const fileExcel = ref(null);

        const onTabChange = (tabName) => {
            nameTableActive.value = tabName;
        };

        onMounted(async () => {
            setTimeout(() => (statementImportTypeKey.value = 2));

            if (props.id) {
                skeleton.value = true;

                await importFaStatementStore.getDetail(props.id);

                setFieldValue("statementImportType", "Mẫu loại 1");

                const resDetail = importFaStatementStore.statement;
                dataImport.value = [
                    resDetail.fundCert,
                    resDetail.depositContract,
                    resDetail.fundCertDeposit,
                    resDetail.fundStockInvest,
                    resDetail.fundOtc,
                    resDetail.fundDerivatives,
                    resDetail.loanContract,
                    resDetail.fundCertInvest,
                    resDetail.fundOddLotTrading,
                ];

                setTimeout(() => (statementImportTypeKey.value = 3));

                skeleton.value = false;
            }
        });

        const formatData = async (value) => {
            const systemDate = await commonStore.getSystemDate();
            const importData = await Promise.all(value);
            let data = {
                generalInfo: {
                    Txdate: formatDate(systemDate),
                },
            };

            data = {
                ...data,
                fundCert: importData[0],
                depositContract: importData[1],
                fundCertDeposit: importData[2],
                fundStockInvest: importData[3],
                fundOtc: importData[4],
                fundDerivatives: importData[5],
                loanContract: importData[6],
                fundCertInvest: importData[7],
                fundOddLotTrading: importData[8],
            };
            return data;
        };

        const onSubmit = handleSubmit(async (values) => {
            if (fileInvalid.value.status || fileDoInvalid.value.status) return;

            isSubmitting.value = true;
            try {
                const resAddFileExcel =
                    await importFaStatementStore.addFileExcel(fileExcel.value);
                if (resAddFileExcel) {
                    const systemDate = await commonStore.getSystemDate();
                    const resImportData =
                        await importFaStatementStore.importFaStatement(
                            {
                                ...dataSubmit.value,
                                generalInfo: {
                                    Txdate: formatDate(systemDate),
                                    Description: descriptionImport.value,
                                },
                            },
                            resAddFileExcel.Data.id
                        );
                    if (resImportData) {
                        isSubmitting.value = false;
                        if (resImportData.Code == 200) onDialogCancel();
                    }
                }
            } catch (e) {
                throw e;
            }
        });

        const downloadTemplate = () => {
            if (
                valForm.statementImportType ===
                StatementImportType.CUSTOMER_1.value
            ) {
                saveAs(
                    `${process.env.VUE_APP_API}${process.env.VUE_APP_LINK_TEMPLATE_FUND_ADMIN}`
                );
            }
        };

        const onChangeFile = (val) => {
            if (!val) return;
            isSubmitting.value = true;
            fileExcel.value = val;
            dataImport.value = [];
            handleImport(val, validateFunc);
        };

        const onChangeStatementImportType = (val) => {
            fileData.value = [];
            fileInvalid.value = {
                status: false,
                message: "",
            };
            fileDoInvalid.value = {
                status: false,
                message: [],
            };
            dataISheet.value = [];
            setFieldValue("file", null);
        };

        const listHeaders = listHeadersFa;

        const validateFunc = async (fileArray) => {
            let shouldReturn = false;
            fileArray.map((item, index) => {
                if (!item.length) {
                    fileInvalid.value = {
                        status: true,
                        message:
                            t(
                                `listTabImportFa.${listTabTable.value[index].name}`
                            ) +
                            " " +
                            t("importFile.validateFileFa"),
                    };
                    shouldReturn = true;
                    return;
                }
            });
            if (shouldReturn) return;

            fileArray.map((item, index) => {
                if (
                    valForm.statementImportType ===
                        StatementImportType.CUSTOMER_1.value &&
                    !isValidHeader(item[0], index, listHeaders[index].length)
                ) {
                    fileInvalid.value = {
                        status: true,
                        message:
                            t(
                                `listTabImportFa.${listTabTable.value[index].name}`
                            ) +
                            " " +
                            t("importFile.validateFileFa"),
                    };
                    shouldReturn = true;
                    return;
                }
            });
            if (shouldReturn) return;

            let isDataContent = false;

            fileArray.map((item, index) => {
                isValidContent(item.slice(1, item.length), index);
                if (item.length > 1) isDataContent = true;
            });
            if (!isDataContent) {
                fileInvalid.value = {
                    status: true,
                    message: t("importFile.emptyFile"),
                };
                return;
            }

            try {
                const dataDoValidate = await formatData(
                    dataRequestValidate.value
                );
                if (dataDoValidate) {
                    const validate =
                        await importFaStatementStore.importDoValidate(
                            dataDoValidate
                        );
                    if (validate.Code !== SUCCESS_CODE) {
                        fileDoInvalid.value = {
                            status: true,
                            message: [],
                        };

                        if (validate.Data == false) {
                            fileDoInvalid.value.message.push(validate.Message);
                            return;
                        }

                        const importInfoArrays = [
                            validate.Data.data?.FundCert || [],
                            validate.Data.data?.DepositContract || [],
                            validate.Data.data?.FundCertDeposit || [],
                            validate.Data.data?.FundStockInvest || [],
                            validate.Data.data?.FundOtc || [],
                            validate.Data.data?.FundDerivatives || [],
                            validate.Data.data?.LoanContract || [],
                            validate.Data.data?.FundCertInvest || [],
                            validate.Data.data?.FundOddLotTrading || [],
                        ];

                        for (
                            let index = 0;
                            index < importInfoArrays.length;
                            index++
                        ) {
                            const importInfoArray = importInfoArrays[index];
                            if (importInfoArray) {
                                for (
                                    let i = 0;
                                    i < importInfoArray.length;
                                    i++
                                ) {
                                    const importInfo = importInfoArray[i];
                                    if (
                                        importInfo.ErrorMessages.length > 0 &&
                                        !importInfo.IsValidData
                                    ) {
                                        importInfo.ErrorMessages.map((item) => {
                                            fileDoInvalid.value.message.push(
                                                "- " +
                                                    t(
                                                        listTabTableFa[index]
                                                            .label
                                                    ) +
                                                    " - Dòng " +
                                                    (i + 1) +
                                                    ": " +
                                                    item.Message +
                                                    "."
                                            );
                                        });
                                    }
                                }
                            }
                        }
                        isSubmitting.value = false;
                    } else {
                        dataSubmit.value = removeErrorMessages(
                            validate.Data.data
                        );
                        isSubmitting.value = false;
                    }
                }
            } catch (e) {
                throw e;
            }
        };

        //xóa error message
        const removeErrorMessages = (data) => {
            if (typeof data !== "object" || data === null) {
                return data;
            }

            for (let key in data) {
                if (Array.isArray(data[key])) {
                    for (let obj of data[key]) {
                        if (
                            obj &&
                            typeof obj === "object" &&
                            obj.hasOwnProperty("ErrorMessages")
                        ) {
                            delete obj.ErrorMessages;
                        }
                    }
                }
            }

            return data;
        };

        const mappingData = mappingDataFa;

        // format date
        const dateFields = dateFieldsFa;

        // format number to string
        const formatFloatNumber = (number) => {
            // Chuyển số thành chuỗi và tách phần nguyên và phần thập phân
            let [integerPart, decimalPart] = number.toString().split(".");

            // Định dạng phần nguyên với dấu phẩy
            let formattedInteger = parseInt(integerPart, 10).toLocaleString(
                "en-US"
            );

            // Kiểm tra nếu có phần thập phân
            if (decimalPart) {
                // Nếu phần thập phân có nhiều hơn 3 chữ số, chèn dấu phẩy vào sau chữ số thứ ba
                if (decimalPart.length > 3) {
                    decimalPart =
                        decimalPart.slice(0, 3) + "," + decimalPart.slice(3);
                }
                return formattedInteger + "." + decimalPart;
            } else {
                return formattedInteger;
            }
        };
        //format Number
        const numberFields = numberFieldsFa;

        const convertDataToTable = (data, indexTab) => {
            const result = {};
            const resultImport = {};
            for (let i = 0; i < data.length; i++) {
                if (dateFields.includes(mappingData[indexTab][i])) {
                    try {
                        const resDate = data[i] + "";
                        if (resDate.trim() == "") {
                            result[mappingData[indexTab][i]] = null;
                            resultImport[mappingData[indexTab][i]] = null;
                        } else {
                            result[mappingData[indexTab][i]] = moment(
                                resDate,
                                "YYYYMMDD"
                            ).format("YYYY-MM-DD");
                            resultImport[mappingData[indexTab][i]] = moment(
                                resDate,
                                "YYYYMMDD"
                            ).format("YYYY-MM-DD");
                        }
                    } catch (e) {
                        result[mappingData[indexTab][i]] = data[i] + "";
                        resultImport[mappingData[indexTab][i]] = data[i] + "";
                    }
                } else if (numberFields.includes(mappingData[indexTab][i])) {
                    try {
                        const resNumber = (data[i] + "").trim();
                        if (resNumber == "") {
                            result[mappingData[indexTab][i]] = null;
                            resultImport[mappingData[indexTab][i]] = null;
                        } else {
                            result[mappingData[indexTab][i]] = parseFloat(
                                parseFloat(resNumber).toFixed(2)
                            );
                            resultImport[mappingData[indexTab][i]] =
                                formatFloatNumber(
                                    parseFloat(parseFloat(resNumber).toFixed(2))
                                );
                        }
                    } catch (e) {
                        result[mappingData[indexTab][i]] = data[i] + "";
                        resultImport[mappingData[indexTab][i]] = data[i] + "";
                    }
                } else {
                    result[mappingData[indexTab][i]] = data[i] + "";
                    resultImport[mappingData[indexTab][i]] = data[i] + "";
                }
            }

            return { result, resultImport };
        };

        const isValidHeader = (headers, index, quantity) => {
            const newArrayHeader = [...headers];
            for (let i = newArrayHeader.length - 1; i >= 0; i--) {
                // Nếu phần tử là chuỗi rỗng ở đoạn cuối, loại bỏ nó khỏi mảng
                if (newArrayHeader[i].trim() === "") {
                    newArrayHeader.pop();
                } else {
                    break;
                }
            }

            if (newArrayHeader.length !== quantity) {
                return false;
            }

            const listHeadersCheck = listHeaders[index];
            for (let i = 0; i <= newArrayHeader.length; i++) {
                if (listHeadersCheck[i] !== newArrayHeader[i]) {
                    if (listHeadersCheck[i] == newArrayHeader[i].trim()) {
                    } else {
                        return false;
                    }
                }
            }

            return true;
        };

        const isValidContent = (datas, indexTab) => {
            if (!datas.length) {
                dataImport.value.push([]);
                dataRequestValidate.value.push([]);
                return false;
            }
            dataISheet.value = [];
            dataISheetValidate.value = [];

            for (let i = 0; i < datas.length; i++) {
                const data = datas[i];

                const isAllEmpty = data.every((item) => item === "");
                if (data && !isAllEmpty) {
                    dataISheet.value.push(
                        convertDataToTable(data, indexTab).resultImport
                    );
                    dataISheetValidate.value.push(
                        convertDataToTable(data, indexTab).result
                    );
                }
            }
            dataImport.value.push(dataISheet.value);
            dataRequestValidate.value.push(dataISheetValidate.value);
            return true;
        };

        const onApprove = async () => {
            // const checkCorrectOtp =
            //     await importFaStatementStore?.checkBeforeVerifyOtp({
            //         userId: authStore?.user?.UserId,
            //         transactionId: props?.id,
            //     });

            // if (checkCorrectOtp) {
            //     const params = {
            //         userId: authStore?.user?.UserId,
            //         transactionId: props?.id,
            //         transactionTypeId: "1",
            //         transactionData: "1",
            //         challenge: "",
            //         callbackUrl: "",
            //         isOnline: "0",
            //         isPush: "1",
            //         notificationInfo: {
            //             title: "Please confirm the transaction",
            //             body: "You are making transaction on VPBank custody online. Please confirm the transaction",
            //         },
            //         eSignerTypeId: "7",
            //         channelId: "0",
            //     };

            //     const requestOTPCode =
            //         await importFaStatementStore?.requestFundAdminCode(params);

            //     if (requestOTPCode?.Code == SUCCESS_CODE) {
            //         onDialogCancel();

            //         openDialogOtpFaFrom({
            //             data: {
            //                 userId: authStore?.user?.UserId,
            //                 transactionId: props?.id,
            //             },
            //         });
            //     }
            // }
            try {
                isSubApprove.value = true;
                const response = await importFaStatementStore.approveFundAdmin(
                    props.id
                );
                if (response) isSubApprove.value = false;
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        const onReject = async () => {
            try {
                isSubReject.value = true;
                const response = await importFaStatementStore.rejectFundAdmin(
                    props.id
                );
                if (response) isSubReject.value = false;
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        const onDelete = async () => {
            try {
                await importFaStatementStore.deleteStatement(props.id);
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        const onChangeNote = (value) => {
            descriptionImport.value = value;
        };

        return {
            dialogRef,
            isSubmitting,
            isSubApprove,
            skeleton,
            formatData,
            onSubmit,
            valForm,
            dataLocale,
            dataForm,
            inputDisabled,
            autoApprove,
            onApprove,
            onReject,
            onDelete,
            nameTableActive,
            onTabChange,
            listTabTable,
            dataColumns,
            downloadTemplate,
            statementImportTypeKey,
            loadingFile,
            fileData,
            dataISheet,
            dataISheetValidate,
            dataImport,
            dataRequestValidate,
            fileInvalid,
            fileDoInvalid,
            StatementImportType,
            onChangeStatementImportType,
            errors,
            onChangeFile,
            removeErrorMessages,
            dataSubmit,
            descriptionImport,
            onChangeNote,
        };
    },
});
</script>

<style scoped></style>
