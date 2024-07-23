<template>
    <div class="vpb-order-form-group">
        <h4 class="vpb-title-in-form">
            I. {{ dataLocale.requestWithdrawVSDTitle }}
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
                    map-options
                    :options="stockBalanceOptions"
                    @change="onChangeStockCode"
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

                <QcInputCurrency class="hidden" name="maxStockQuantity" />
                <QcInputCurrency
                    class="hidden"
                    name="maxStockQuantityRestricted"
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
            <div class="col-3 vpb-form-group">
                <QcLabel :label="dataLocale.form.costPrice.label" />
                <QcInputCurrency
                    :disabled="inputDisabled"
                    outlined
                    name="costPrice"
                    :placeholder="dataLocale.form.costPrice.placeholder"
                />
            </div>
        </div>

        <div class="row q-col-gutter-lg">
            <div class="col-12 vpb-form-group">
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
import { computed, onMounted, ref, inject, nextTick } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useAuthStore } from "stores/auth";
import { useCommonStore } from "stores/common";
import { useTransWithdrawStore } from "stores/transactionWithdraw";
import { formatDate } from "src/common/utils/helper";
import { SUCCESS_CODE } from "src/common/constant";
import { getBalanceStock } from "src/api/common";

export default {
    name: "RequestWithdrawVSD",
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

        const firstChange = ref(true);

        const { t } = useI18n();

        const authStore = useAuthStore();
        const commonStore = useCommonStore();
        const tranWithdrawStore = useTransWithdrawStore();

        const dataLocale = {
            requestWithdrawVSDTitle: t("transaction.requestWithdrawVSDTitle"),
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
                transactionType: {
                    label: t("field.transactionType.label"),
                    placeholder: t("field.transactionType.placeholder"),
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
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(action);
        });

        const stockBalanceOptions = ref([]);

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const maxStockQuantity = ref(10);

        const maxStockQuantityRestricted = ref(0);

        const yupObject = {
            depositoryAccountNumber: yup
                .string()
                .typeError(
                    `${t(dataLocale.form.depositoryAccountNumber.label)} ${t(
                        "validation.string"
                    )}`
                )
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
            maxStockQuantity: yup.number(),
            maxStockQuantityRestricted: yup.number(),
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
                .label(dataLocale.form.TDCNQuantity.label)
                .when("maxStockQuantity", (maxStockQuantity) => {
                    if (!isNaN(maxStockQuantity)) {
                        return yup
                            .number()
                            .max(
                                maxStockQuantity,
                                t(
                                    `${dataLocale.form.TDCNQuantity.label} ${t(
                                        "validation.maxQuantity"
                                    )}`
                                )
                            )
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
                            .label(dataLocale.form.TDCNQuantity.label);
                    }
                }),
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
                .label(dataLocale.form.HCCNQuantity.label)
                .when(
                    "maxStockQuantityRestricted",
                    (maxStockQuantityRestricted) => {
                        if (!isNaN(maxStockQuantityRestricted)) {
                            return yup
                                .number()
                                .max(
                                    maxStockQuantityRestricted,
                                    t(
                                        `${
                                            dataLocale.form.HCCNQuantity.label
                                        } ${t("validation.maxQuantity")}`
                                    )
                                )
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
                                .label(dataLocale.form.HCCNQuantity.label);
                        }
                    }
                ),
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
                depositoryAccountNumber: "",
                stockCode: undefined,
                maxStockQuantity: 0,
                maxStockQuantityRestricted: 0,
            },
        });

        onMounted(async () => {
            const systemDate = await commonStore.getSystemDate();
            setFieldValue("transactionDate", systemDate);

            if (props.id) {
                await tranWithdrawStore.getDetail(props.id, transactionType);

                setValues({
                    transactionDate:
                        tranWithdrawStore.transaction.transactionDate,
                    depositoryAccountNumber:
                        tranWithdrawStore.transaction.depositoryAccountNumber,
                    stockCode: tranWithdrawStore.transaction.stockCode,
                    stockQuantity: tranWithdrawStore.transaction.stockQuantity,
                    stockQuantityRestricted:
                        tranWithdrawStore.transaction.stockQuantityRestricted,
                    costPrice: tranWithdrawStore.transaction.costPrice,
                    note: tranWithdrawStore.transaction.note,
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
                        Txdate: formatDate(valForm.transactionDate),
                        Afacctno: valForm.depositoryAccountNumber,
                        Symbol: valForm.stockCode,
                        Txtype: 13,
                        Qtty: valForm.stockQuantity,
                        Restrictedqtty: valForm.stockQuantityRestricted,
                        Costprice: valForm.costPrice,
                        Td_Txdesc: valForm.note,
                        Connectvsd: "Y",
                        VsdLocation: "01",
                    };

                    if (props.id)
                        await tranWithdrawStore.editVSD({
                            ...data,
                            Id: props.id,
                        });
                    else await tranWithdrawStore.createVSD(data);

                    resetForm();

                    return true;
                } catch (e) {
                    console.log(e);
                }
            }

            return false;
        };

        const onChangeDepoAccNo = async (val) => {
            if (!val) return;

            const depoAccNo = authStore.depoAccNo(val);

            setFieldValue("accountName", depoAccNo.Afname);

            if (!props.id || !firstChange.value)
                setFieldValue("stockCode", undefined);

            await getStockBalance(val);
        };

        const onChangeStockCode = async (val) => {
            if (!val) return;

            if (!stockBalanceOptions.value || !stockBalanceOptions.value.length)
                await getStockBalance(valForm.depositoryAccountNumber);

            const stock = stockBalanceOptions.value.find(
                (item) => item.value === val
            );

            setFieldValue("maxStockQuantity", stock?.stockQuantity || 0);
            setFieldValue(
                "maxStockQuantityRestricted",
                stock?.stockQuantityRestricted || 0
            );
        };

        const getStockBalance = async (depoAccNo) => {
            try {
                const { data } = await getBalanceStock({
                    accountno: depoAccNo,
                });

                if (data.Code !== SUCCESS_CODE) return;

                stockBalanceOptions.value = data.Data.map((item) => ({
                    label: `${item.SYMBOL} - SL TDCN: ${item.TRADEQTTY} - SL HCCN: ${item.RESTRICTEDQTTY}`,
                    value: item.SYMBOL,
                    stockQuantity: item.TRADEQTTY,
                    stockQuantityRestricted: item.RESTRICTEDQTTY,
                }));
            } catch (e) {}
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
            onChangeQuantity,
            stockBalanceOptions,
            onChangeStockCode,
            firstChange,
        };
    },
};
</script>

<style scoped></style>
