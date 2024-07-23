<template>
    <div class="vpb-order-form-group">
        <h4 class="vpb-title-in-form">
            I. {{ dataLocale.requestDepositoryVSDTitle }}
        </h4>
        <div class="row q-col-gutter-sm">
            <div class="col-3 vpb-form-group">
                <QcLabel
                    required
                    :label="dataLocale.form.depositoryAccountNumber.label"
                />
                <QcSelect
                    :disabled="inputDisabled"
                    :placeholder="
                        dataLocale.form.depositoryAccountNumber.placeholder
                    "
                    name="depositoryAccountNumber"
                    :options="depositoryAccNoOptions"
                    use-input
                    @change="onChangeDepoAccNo"
                />
            </div>
            <div class="col-3 vpb-form-group">
                <QcLabel required :label="dataLocale.form.accountName.label" />
                <QcInput
                    :disabled="true"
                    outlined
                    name="accountName"
                    :placeholder="dataLocale.form.accountName.placeholder"
                />
            </div>
            <div class="col-3 vpb-form-group">
                <QcLabel
                    required
                    :label="dataLocale.form.transactionDate.label"
                />
                <QcDatePicker
                    :disabled="true"
                    outlined
                    name="transactionDate"
                    :placeholder="dataLocale.form.transactionDate.placeholder"
                />
            </div>
        </div>

        <div class="row q-col-gutter-sm">
            <div class="col-3 vpb-form-group">
                <QcLabel required :label="dataLocale.form.stockCode.label" />
                <QcSelect
                    :disabled="inputDisabled"
                    :placeholder="dataLocale.form.stockCode.placeholder"
                    name="stockCode"
                    use-input
                    :options="stockOptions"
                    @change="onChangeSymbol"
                />
            </div>
            <div class="col-3 vpb-form-group">
                <QcLabel required :label="dataLocale.form.stockType.label" />
                <QcSelect
                    :key="changeKeyStockType"
                    :disabled="inputDisabled"
                    :placeholder="dataLocale.form.stockType.placeholder"
                    name="stockType"
                    :options="
                        currentLang === 'vi'
                            ? stockTypeOptions.map((item, index) => {
                                  return {
                                      label: item.label,
                                      value: item.value,
                                  };
                              })
                            : stockTypeOptions.map((item, index) => {
                                  return {
                                      label: item.subLabel,
                                      value: item.value,
                                  };
                              })
                    "
                    map-options
                    @change="onChangeStockType"
                />
            </div>
            <div class="col-3 vpb-form-group">
                <QcLabel required :label="dataLocale.form.TDCNQuantity.label" />
                <QcInputCurrency
                    :disabled="
                        inputDisabled || valForm.stockQuantityRestricted > 0
                    "
                    outlined
                    name="stockQuantity"
                    :placeholder="dataLocale.form.TDCNQuantity.placeholder"
                    @change="onChangeQuantity($event, 'stockQuantity')"
                />
            </div>

            <div class="col-3 vpb-form-group">
                <QcLabel required :label="dataLocale.form.HCCNQuantity.label" />
                <QcInputCurrency
                    :disabled="inputDisabled || valForm.stockQuantity > 0"
                    outlined
                    name="stockQuantityRestricted"
                    :placeholder="dataLocale.form.HCCNQuantity.placeholder"
                    @change="
                        onChangeQuantity($event, 'stockQuantityRestricted')
                    "
                />
            </div>
        </div>

        <div class="row q-col-gutter-sm">
            <div class="col-3 vpb-form-group">
                <QcLabel :label="dataLocale.form.costPrice.label" required />
                <QcInputCurrency
                    :disabled="inputDisabled"
                    outlined
                    name="costPrice"
                    :placeholder="dataLocale.form.costPrice.placeholder"
                />
            </div>

            <div class="col-3 vpb-form-group">
                <QcLabel :label="dataLocale.form.bookNumber.label" required />
                <QcInput
                    :disabled="inputDisabled"
                    outlined
                    name="bookNumber"
                    :placeholder="dataLocale.form.bookNumber.placeholder"
                />
            </div>

            <div class="col-6 vpb-form-group">
                <QcLabel :label="dataLocale.form.note.label" />
                <QcInput
                    :disabled="inputDisabled"
                    outlined
                    name="note"
                    :placeholder="dataLocale.form.note.placeholder"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { computed, onMounted, ref, nextTick, inject,watch } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useAuthStore } from "stores/auth";
import { useCommonStore } from "stores/common";
import { useTransDepositoryStore } from "stores/transactionDepository";
import { formatDate } from "src/common/utils/helper";
import StockType from "src/common/types/stock";
import { getReleaseCode } from "src/api/transDepository";
import { SUCCESS_CODE } from "src/common/constant";

export default {
    name: "RequestDepositoryVSD",
    mixins: [componentOptionsMixin],
    props: {
        id: Number,
    },
    emits: [...useDialogPluginComponent.emits],
    data() {
        return {
            firstOptionStock: null,
            firstOptionDepositoryAccNo: null,
        };
    },
    setup(props) {
        const action = inject("action");
        const transactionType = inject("transactionType");

        const { t } = useI18n();

        const authStore = useAuthStore();
        const commonStore = useCommonStore();
        const tranDepositoryStore = useTransDepositoryStore();

        const changeKeyStockType = ref(1);

        const stockType = StockType;

        const releaseCodeOptions = ref([]);

        const firstChange = ref(true);

        const dataLocale = {
            requestDepositoryVSDTitle: t(
                "transaction.requestDepositoryVSDTitle"
            ),
            form: {
                depositoryAccountNumber: {
                    label: t("field.depositoryAccountNumber.label"),
                    placeholder: t("field.depositoryAccountNumber.placeholder"),
                },
                accountName: {
                    label: t("field.accountName.label"),
                    placeholder: t("field.accountName.placeholder"),
                },
                transactionDate: {
                    label: t("field.transactionDate.label"),
                    placeholder: t("field.transactionDate.placeholder"),
                },
                stockCode: {
                    label: t("field.stockCode.label"),
                    placeholder: t("field.stockCode.placeholder"),
                },
                stockType: {
                    label: t("field.stockType.label"),
                    placeholder: t("field.stockType.placeholder"),
                },
                releaseCode: {
                    label: t("field.releaseCode.label"),
                    placeholder: t("field.releaseCode.placeholder"),
                },
                TDCNQuantity: {
                    label: t("field.TDCNQuantity.label"),
                    placeholder: t("field.TDCNQuantity.placeholder"),
                },
                HCCNQuantity: {
                    label: t("field.HCCNQuantity.label"),
                    placeholder: t("field.HCCNQuantity.placeholder"),
                },
                costPrice: {
                    label: t("field.costPrice.label"),
                    placeholder: t("field.costPrice.placeholder"),
                },
                note: {
                    label: t("field.note.label"),
                    placeholder: t("field.note.placeholder"),
                },
                bookNumber: {
                    label: t("field.bookNumber.label"),
                    placeholder: t("field.bookNumber.placeholder"),
                },
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(action);
        });

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const currentLang = ref(commonStore.locale);

        watch(
            () => commonStore.locale,
            () => {
                currentLang.value = commonStore.locale;
            }
        );

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const yupObject = {
            depositoryAccountNumber: yup
                .string()
                .required(
                    `${t(dataLocale.form.depositoryAccountNumber.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.depositoryAccountNumber.label),
            accountName: yup
                .string()
                .required(
                    `${dataLocale.form.accountName.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.accountName.label),
            transactionDate: yup
                .string()
                .required(
                    `${dataLocale.form.transactionDate.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.transactionDate.label),
            stockCode: yup
                .string()
                .required(
                    `${dataLocale.form.stockCode.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.stockCode.label),
            stockType: yup
                .string()
                .required(
                    `${dataLocale.form.stockType.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.stockType.label),
            stockQuantity: yup
                .number()
                .typeError(
                    `${dataLocale.form.TDCNQuantity.label} ${t(
                        "validation.number"
                    )}`
                )
                .required(
                    `${dataLocale.form.TDCNQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.TDCNQuantity.label),
            stockQuantityRestricted: yup
                .number()
                .typeError(
                    `${dataLocale.form.HCCNQuantity.label} ${t(
                        "validation.number"
                    )}`
                )
                .required(
                    `${dataLocale.form.HCCNQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.HCCNQuantity.label),
            costPrice: yup
                .number()
                .typeError(
                    `${dataLocale.form.costPrice.label} ${t(
                        "validation.number"
                    )}`
                )
                .nullable()
                .label(dataLocale.form.costPrice.label),
            note: yup.string().nullable().label(dataLocale.form.note.label),
            bookNumber: yup
                .string()
                .nullable()
                .label(dataLocale.form.bookNumber.label),
        };

        const schema = yup.object(yupObject);

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            values: valForm,
            setFieldValue,
            validate,
            resetForm,
        } = useForm({
            validationSchema: schema,
            initialValues: {
                stockType: stockType.TRANSACTION.value,
            },
        });

        onMounted(async () => {
            const systemDate = await commonStore.getSystemDate();
            setFieldValue("transactionDate", systemDate);

            setTimeout(() => (changeKeyStockType.value = new Date().valueOf()));

            if (props.id) {
                await tranDepositoryStore.getDetail(props.id, transactionType);

                setValues({
                    transactionDate:
                        tranDepositoryStore.transaction.transactionDate,
                    depositoryAccountNumber:
                        tranDepositoryStore.transaction.depositoryAccountNumber,
                    stockType: tranDepositoryStore.transaction.stockType,
                    stockCode: tranDepositoryStore.transaction.stockCode,
                    stockQuantity:
                        tranDepositoryStore.transaction.stockQuantity,
                    stockQuantityRestricted:
                        tranDepositoryStore.transaction.stockQuantityRestricted,
                    // releaseCode: tranDepositoryStore.transaction.releaseCode,
                    costPrice: tranDepositoryStore.transaction.costPrice,
                    note: tranDepositoryStore.transaction.note,
                    bookNumber:
                        tranDepositoryStore.transaction.OwnershipCertificate,
                });

                await nextTick();

                firstChange.value = false;
            }
        });

        const onSubmit = async () => {
            const { valid, errors } = await validate();

            if (valid) {
                try {
                    const data = {
                        ...valForm,
                        transactionDate: formatDate(valForm.transactionDate),
                        Connectvsd: "Y",
                        VsdLocation: "01",
                    };

                    if (props.id)
                        await tranDepositoryStore.editVSD({
                            ...data,
                            Id: props.id,
                        });
                    else await tranDepositoryStore.createVSD(data);

                    resetForm();

                    return true;
                } catch (e) {
                    console.log(e);
                }
            }

            return false;
        };

        const onChangeDepoAccNo = (val) => {
            if (!val) return;

            const depoAccNo = authStore.depoAccNo(val);
            setFieldValue("accountName", depoAccNo.Afname);
        };

        const getListReleaseCode = async (symbol) => {
            try {
                const { data } = await getReleaseCode(symbol);
                if (data.Code === SUCCESS_CODE) {
                    return data.Data;
                }
            } catch (e) {
                console.log(e);
            }

            return [];
        };

        const onChangeSymbol = async (val) => {
            if (!val) return;

            if (valForm.stockType !== stockType.WAITING_TRANSACTION.value)
                return;

            const releaseCodes = await getListReleaseCode(valForm.stockCode);

            releaseCodeOptions.value = releaseCodes.map((item) => ({
                label: item.MA_DOT_PHAT_HANH,
                value: item.MA_DOT_PHAT_HANH,
            }));
        };

        const onChangeStockType = async (val) => {
            if (!val || !valForm.stockCode) return;

            if (val === stockType.TRANSACTION.value) {
                // setFieldValue("releaseCode", "");
                return;
            }

            if (!props.id || !firstChange.value) {
                // setFieldValue("releaseCode", "");
            }

            const releaseCodes = await getListReleaseCode(valForm.stockCode);

            releaseCodeOptions.value = releaseCodes.map((item) => ({
                label: item.MA_DOT_PHAT_HANH,
                value: item.MA_DOT_PHAT_HANH,
            }));
        };

        const onApprove = () => {
            onDialogCancel();
        };

        const onReject = () => {
            onDialogCancel();
        };

        const onDelete = () => {
            onDialogCancel();
        };

        const onChangeQuantity = (val, field) => {
            if (!val) return;

            if (field === "stockQuantity") {
                setFieldValue("stockQuantityRestricted", 0);
                return;
            }
            if (field === "stockQuantityRestricted") {
                setFieldValue("stockQuantity", 0);
                return;
            }
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
            onChangeDepoAccNo,
            changeKeyStockType,
            onChangeQuantity,
            stockType,
            releaseCodeOptions,
            onChangeSymbol,
            onChangeStockType,
            firstChange,
            currentLang,
        };
    },
};
</script>

<style scoped></style>
