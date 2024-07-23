<template>
    <div class="vpb-order-form-group">
        <template v-if="step === 1">
            <h4 class="vpb-title-in-form">
                I. {{ dataLocale.requestWithdrawChooseVPBTitle }}
            </h4>
            <RequestWithdrawFilterVPB
                @change-otc-selected="onChangeOtcSelected"
            />
        </template>
        <template v-else-if="step === 2">
            <h4 class="vpb-title-in-form">
                II. {{ dataLocale.requestWithdrawVPBTitle }}
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
                    <QcLabel
                        required
                        :label="dataLocale.form.accountName.label"
                    />
                    <QcInput
                        :disabled="inputDisabled"
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
                        :disabled="inputDisabled"
                        outlined
                        name="transactionDate"
                        :placeholder="
                            dataLocale.form.transactionDate.placeholder
                        "
                    />
                </div>
            </div>

            <div class="row q-col-gutter-sm">
                <div class="col-3 vpb-form-group">
                    <QcLabel
                        required
                        :label="dataLocale.form.stockCode.label"
                    />
                    <QcSelect
                        :disabled="inputDisabled"
                        :placeholder="dataLocale.form.stockCode.placeholder"
                        name="stockCode"
                        :options="stockOptions"
                        use-input
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel
                        required
                        :label="dataLocale.form.serialNumber.label"
                    />
                    <QcInput
                        :disabled="inputDisabled"
                        outlined
                        name="serialNumber"
                        :placeholder="dataLocale.form.serialNumber.placeholder"
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel
                        required
                        :label="dataLocale.form.stockQuantity.label"
                    />
                    <QcInputCurrency
                        :disabled="inputDisabled"
                        outlined
                        name="stockQuantity"
                        :placeholder="dataLocale.form.stockQuantity.placeholder"
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel
                        required
                        :label="dataLocale.form.stockValue.label"
                    />
                    <QcInputCurrency
                        :disabled="inputDisabled"
                        outlined
                        name="stockValue"
                        :placeholder="dataLocale.form.stockValue.placeholder"
                    />
                </div>
            </div>

            <div class="row q-col-gutter-lg">
                <div class="col-9 vpb-form-group">
                    <QcLabel :label="dataLocale.form.note.label" />
                    <QcInput
                        :disabled="inputDisabled"
                        outlined
                        name="note"
                        :placeholder="dataLocale.form.note.placeholder"
                    />
                </div>
            </div>

            <h4 class="vpb-title-in-form">
                III. {{ dataLocale.requestWithdrawVPBTitleII }}
            </h4>

            <div class="row q-col-gutter-sm">
                <div class="col-3 vpb-form-group">
                    <QcLabel :label="dataLocale.form.receiveWay.label" />
                    <QcSelect
                        :disabled="inputDisabledReceiveWay"
                        :placeholder="dataLocale.form.receiveWay.placeholder"
                        name="receiveWay"
                        :options="ReceiveWay"
                        map-options
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel :label="dataLocale.form.receiverWithdraw.label" />
                    <QcInput
                        :disabled="inputDisabledReceiveWay"
                        outlined
                        name="receiverWithdraw"
                        :placeholder="dataLocale.form.receiverWithdraw.label"
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel
                        :label="
                            dataLocale.form.numberCitizenIdentification.label
                        "
                    />
                    <QcInput
                        :disabled="inputDisabledReceiveWay"
                        outlined
                        name="numberCitizenIdentification"
                        :placeholder="
                            dataLocale.form.numberCitizenIdentification
                                .placeholder
                        "
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel :label="dataLocale.form.phone.label" />
                    <QcInput
                        :disabled="inputDisabledReceiveWay"
                        outlined
                        name="phone"
                        :placeholder="dataLocale.form.phone.placeholder"
                    />
                </div>
                <div class="col-3 vpb-form-group">
                    <QcLabel :label="dataLocale.form.address.label" />
                    <QcInput
                        :disabled="inputDisabledReceiveWay"
                        outlined
                        name="address"
                        :placeholder="dataLocale.form.address.placeholder"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { computed, inject, onMounted, ref, watch } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useTransWithdrawStore } from "stores/transactionWithdraw";
import { formatDate, getMeta, metaToParams } from "src/common/utils/helper";
import { ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import { useCommonStore } from "stores/common";
import RequestWithdrawFilterVPB from "components/transaction/RequestWithdraw/RequestWithdrawFilterVPB";
import { useAuthStore } from "stores/auth";

export default {
    name: "RequestWithdrawVPB",
    components: { RequestWithdrawFilterVPB },
    mixins: [componentOptionsMixin],
    props: {
        id: Number,
        step: {
            type: Number,
            default: 1,
            validator(value) {
                return [1, 2].includes(value);
            },
        },
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
        const action = inject("action");
        const transactionType = inject("transactionType");

        const { t } = useI18n();

        const transWithdrawStore = useTransWithdrawStore();
        const commonStore = useCommonStore();
        const authStore = useAuthStore();

        const dataLocale = {
            requestWithdrawChooseVPBTitle: t(
                "transaction.requestWithdrawChooseVPBTitle"
            ),
            requestWithdrawVPBTitle: t("transaction.requestWithdrawVPBTitle"),
            requestWithdrawVPBTitleII: t(
                "transaction.requestWithdrawVPBTitleII"
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
                serialNumber: {
                    label: t("field.serialNumber.label"),
                    placeholder: t("field.serialNumber.placeholder"),
                },
                stockQuantity: {
                    label: t("field.stockQuantity.label"),
                    placeholder: t("field.stockQuantity.placeholder"),
                },
                stockValue: {
                    label: t("field.stockValue.label"),
                    placeholder: t("field.stockValue.placeholder"),
                },
                note: {
                    label: t("field.note.label"),
                    placeholder: t("field.note.placeholder"),
                },
                receiverWithdraw: {
                    label: t("field.receiver.label"),
                    placeholder: t("field.receiver.placeholder"),
                },
                phone: {
                    label: t("field.phone.label"),
                    placeholder: t("field.phone.placeholder"),
                },
                numberCitizenIdentification: {
                    label: t("field.numberCitizenIdentification.label"),
                    placeholder: t(
                        "field.numberCitizenIdentification.placeholder"
                    ),
                },
                address: {
                    label: t("field.address.label"),
                    placeholder: t("field.address.placeholder"),
                },
                receiveWay: {
                    label: t("field.receiveWay.label"),
                    placeholder: t("field.receiveWay.placeholder"),
                },
                btnSearch: t("button.search"),
                btnReset: t("button.reset"),
            },
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

        const inputDisabled = computed(() => true);

        const inputDisabledReceiveWay = computed(() => {
            return ["delete", "detail", "approve"].includes(props.action);
        });

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

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
            stockCode: yup
                .string()
                .required(
                    `${dataLocale.form.stockCode.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.stockCode.label),
            transactionDate: yup
                .string()
                .required(
                    `${dataLocale.form.transactionDate.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.transactionDate.label),
            serialNumber: yup
                .string()
                .required(
                    `${dataLocale.form.serialNumber.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.serialNumber.label),
            stockQuantity: yup
                .number()
                .typeError(
                    `${dataLocale.form.stockQuantity.label} ${t(
                        "validation.number"
                    )}`
                )
                .required(
                    `${dataLocale.form.stockQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.stockQuantity.label),
            stockValue: yup
                .number()
                .typeError(
                    `${dataLocale.form.stockValue.label} ${t(
                        "validation.number"
                    )}`
                )
                .required(
                    `${dataLocale.form.stockValue.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.stockValue.label),
            note: yup.string().nullable().label(dataLocale.form.note.label),
            address: yup
                .string()
                .required(
                    `${dataLocale.form.address.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.address.label),
            phone: yup
                .string()
                .required(
                    `${dataLocale.form.phone.label} ${t("validation.required")}`
                )
                .label(dataLocale.form.phone.label)
                .typeError(
                    `${dataLocale.form.phone.label} ${t("validation.required")}`
                ),
            // .matches(
            //     /(84|0[2|3|5|7|8|9])+([0-9]{8})\b/,
            //     `${dataLocale.form.phone.label} ${t("validation.phone")}`
            // )
            numberCitizenIdentification: yup
                .string()
                .required(
                    `${dataLocale.form.numberCitizenIdentification.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.numberCitizenIdentification.label)
                .typeError(
                    `${dataLocale.form.numberCitizenIdentification.label} ${t(
                        "validation.required"
                    )}`
                ),
            receiverWithdraw: yup
                .string()
                .required(
                    `${dataLocale.form.receiverWithdraw.label} ${t(
                        "validation.required"
                    )}`
                )
                .typeError(
                    `${dataLocale.form.receiverWithdraw.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.receiverWithdraw.label),

            receiveWay: yup
                .string()
                .required(
                    `${dataLocale.form.receiveWay.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.receiveWay.label)
                .typeError(
                    `${dataLocale.form.receiveWay.label} ${t(
                        "validation.required"
                    )}`
                ),
        };

        const schema = yup.object(yupObject);

        const columns = [
            {
                name: "otcId",
                label: "id",
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
            .filter((column) => column.name !== "id")
            .map((column) => column.name);

        const rows = ref([]);

        onMounted(async () => {
            if (["create", "edit"].includes(action))
                transWithdrawStore.getListOTC({});

            if (props.id) {
                await transWithdrawStore.getDetail(props.id, transactionType);

                setValues({
                    transactionDate:
                        transWithdrawStore.transaction.transactionDate,
                    depositoryAccountNumber:
                        transWithdrawStore.transaction.depositoryAccountNumber,
                    stockCode: transWithdrawStore.transaction.stockCode,
                    serialNumber: transWithdrawStore.transaction.serialNumber,
                    stockQuantity: transWithdrawStore.transaction.stockQuantity,
                    stockValue: transWithdrawStore.transaction.stockValue,
                    note: transWithdrawStore.transaction.note,
                    receiveWay: transWithdrawStore.transaction.receiveWay,
                    receiverWithdraw:
                        transWithdrawStore.transaction.receiverWithdraw,
                    numberCitizenIdentification:
                        transWithdrawStore.transaction
                            .numberCitizenIdentification,
                    phone: transWithdrawStore.transaction.phone,
                    address: transWithdrawStore.transaction.address,
                });
            }
        });

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            values: valForm,
            resetForm,
            validate,
            setFieldValue,
        } = useForm({
            validationSchema: schema,
        });

        const onSubmit = async () => {
            const { valid, errors } = await validate();

            if (valid) {
                try {
                    console.log(valForm);
                    const data = {
                        ...valForm,
                        transactionDate: formatDate(valForm.transactionDate),
                        otcId: selectedOtc.value.otcId,
                        otcSeri: selectedOtc.value.otcSeri,
                    };

                    if (props.id)
                        await transWithdrawStore.editVPB({
                            ...data,
                            Id: props.id,
                        });
                    else await transWithdrawStore.createVPB(data);

                    resetForm();

                    return true;
                } catch (e) {
                    console.log(e);
                }
            }

            return false;
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

        const onChangeDepoAccNo = (val) => {
            if (!val) return;

            const depoAccNo = authStore.depoAccNo(val);
            setFieldValue("accountName", depoAccNo.Afname);
        };

        const selectedOtc = ref();

        const onChangeOtcSelected = (otc) => {
            selectedOtc.value = otc;
        };

        watch(
            () => props.step,
            async (val) => {
                if (!selectedOtc || val === 1) return;

                const systemDate = await commonStore.getSystemDate();

                setValues({
                    depositoryAccountNumber:
                        selectedOtc.value.depositoryAccountNumber,
                    // accountName: selectedOtc.value.fullname,
                    stockCode: selectedOtc.value.stockCode,
                    transactionDate: systemDate,
                    serialNumber: selectedOtc.value.serialNumber,
                    stockQuantity: selectedOtc.value.stockQuantity,
                    stockValue: selectedOtc.value.stockValue,
                    note: "THEM MOI GIAO DICH RUT OTC",
                });
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
            skeleton,
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
            valForm,
            onChangeOtcSelected,
            onSubmit,
            onChangeDepoAccNo,
            inputDisabledReceiveWay,
        };
    },
};
</script>

<style scoped></style>
