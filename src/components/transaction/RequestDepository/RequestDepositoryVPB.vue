<template>
    <div class="vpb-order-form-group">
        <h4 class="vpb-title-in-form">
            I. {{ dataLocale.requestDepositoryVPBTitle }}
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
                    :options="stockOptions"
                    use-input
                />
            </div>
            <div class="col-3 vpb-form-group">
                <QcLabel required :label="dataLocale.form.serialNumber.label" />
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
                <QcLabel required :label="dataLocale.form.stockValue.label" />
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

        <div class="row q-col-gutter-sm">
            <QcLabel :label="dataLocale.form.registration.label" required />

            <div v-if="!!errorMessage" style="color: #e6544f">
                <span
                    >{{ $t(errorMessage) }}
                    <q-icon name="error"></q-icon>
                </span>
            </div>

            <div
                :key="`registration_information_${i}`"
                v-for="(registration, i) in registrationInformations"
                class="col-12 vpb-form-group"
            >
                <QcCheckboxArray
                    :val="registration.value"
                    :true-value="registration.value"
                    :label="$t(registration.label)"
                    name="registration"
                    :disabled="inputDisabled"
                />
                <div
                    class="row q-col-gutter-sm"
                    style="padding-top: 20px"
                    v-if="valForm.registration === '1' && i === 0"
                >
                    <div class="col-4 vpb-form-group">
                        <QcLabel :label="dataLocale.form.receiver.label" />
                        <QcInput
                            :disabled="inputDisabled"
                            outlined
                            name="receiver"
                            :placeholder="dataLocale.form.receiver.label"
                        />
                    </div>
                    <div class="col-4 vpb-form-group">
                        <QcLabel
                            :label="
                                dataLocale.form.numberCitizenIdentification
                                    .label
                            "
                        />
                        <QcInput
                            :disabled="inputDisabled"
                            outlined
                            name="numberCitizenIdentification"
                            :placeholder="
                                dataLocale.form.numberCitizenIdentification
                                    .placeholder
                            "
                        />
                    </div>
                    <div class="col-4 vpb-form-group">
                        <QcLabel :label="dataLocale.form.phone.label" />
                        <QcInput
                            :disabled="inputDisabled"
                            outlined
                            name="phone"
                            :placeholder="dataLocale.form.phone.placeholder"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { computed, inject, onMounted, ref, watch } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useAuthStore } from "stores/auth";
import { useCommonStore } from "stores/common";
import { useTransWithdrawStore } from "stores/transactionWithdraw";
import { useTransDepositoryStore } from "stores/transactionDepository";
import { formatDate } from "src/common/utils/helper";
import RegistrationInformation from "src/common/types/registrationInformation";

export default {
    name: "RequestDepositoryVPB",
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
        const transDepositoryStore = useTransDepositoryStore();

        const dataLocale = {
            requestDepositoryVPBTitle: t(
                "transaction.requestDepositoryVPBTitle"
            ),
            form: {
                depositoryAccountNumber: {
                    label: "field.depositoryAccountNumber.label",
                    placeholder: "field.depositoryAccountNumber.placeholder",
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
                registration: {
                    label: t("field.registration.label"),
                    placeholder: t("field.registration.placeholder"),
                },
                receiver: {
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
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(action);
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
            serialNumber: yup
                .string()
                .typeError(
                    `${dataLocale.form.serialNumber.label} ${t(
                        "validation.string"
                    )}`
                )
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
            registration: yup
                .string()
                .required(
                    `${dataLocale.form.registration.placeholder} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.registration.label),
            phone: yup.lazy(() => {
                if (valForm.registration === "1") {
                    return yup
                        .string()
                        .required(
                            `${dataLocale.form.phone.label} ${t(
                                "validation.required"
                            )}`
                        )
                        .label(dataLocale.form.phone.label)
                        .typeError(
                            `${dataLocale.form.phone.label} ${t(
                                "validation.required"
                            )}`
                        );
                }

                return yup
                    .string()
                    .nullable()
                    .label(dataLocale.form.phone.label);
            }),
            receiver: yup.lazy(() => {
                if (valForm.registration === "1") {
                    return yup
                        .string()
                        .required(
                            `${dataLocale.form.receiver.label} ${t(
                                "validation.required"
                            )}`
                        )
                        .label(dataLocale.form.receiver.label)
                        .typeError(
                            `${dataLocale.form.receiver.label} ${t(
                                "validation.required"
                            )}`
                        );
                }

                return yup
                    .string()
                    .label(dataLocale.form.receiver.label)
                    .nullable();
            }),
            numberCitizenIdentification: yup.lazy(() => {
                if (valForm.registration === "1") {
                    return yup
                        .string()
                        .required(
                            `${
                                dataLocale.form.numberCitizenIdentification
                                    .label
                            } ${t("validation.required")}`
                        )
                        .label(
                            dataLocale.form.numberCitizenIdentification.label
                        )
                        .typeError(
                            `${
                                dataLocale.form.numberCitizenIdentification
                                    .label
                            } ${t("validation.required")}`
                        );
                }

                return yup
                    .string()
                    .label(dataLocale.form.numberCitizenIdentification.label)
                    .nullable();
            }),
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
        });

        watch(
            () => valForm.registration,
            () => {
                if (valForm.registration === "1") {
                    yupObject.phone = yup
                        .string()
                        .required(
                            `${dataLocale.form.phone.label} ${t(
                                "validation.required"
                            )}`
                        )
                        .label(dataLocale.form.phone.label)
                        .typeError(
                            `${dataLocale.form.phone.label} ${t(
                                "validation.required"
                            )}`
                        );

                    yupObject.numberCitizenIdentification = yup
                        .number(
                            `${
                                dataLocale.form.numberCitizenIdentification
                                    .label
                            } ${t("validation.numberPaper")}`
                        )
                        .integer()
                        .required(
                            `${
                                dataLocale.form.numberCitizenIdentification
                                    .label
                            } ${t("validation.required")}`
                        )
                        .label(
                            dataLocale.form.numberCitizenIdentification.label
                        )
                        .typeError(
                            `${
                                dataLocale.form.numberCitizenIdentification
                                    .label
                            } ${t("validation.required")}`
                        );

                    yupObject.receiver = yup
                        .string()
                        .required(
                            `${dataLocale.form.receiver.label} ${t(
                                "validation.required"
                            )}`
                        )
                        .label(dataLocale.form.receiver.label)
                        .typeError(
                            `${dataLocale.form.receiver.label} ${t(
                                "validation.required"
                            )}`
                        );
                } else {
                    yupObject.phone = yup
                        .string()
                        .label(dataLocale.form.phone.label)
                        .nullable();

                    yupObject.numberCitizenIdentification = yup
                        .string()
                        .label(
                            dataLocale.form.numberCitizenIdentification.label
                        )
                        .nullable();

                    yupObject.receiver = yup
                        .string()
                        .label(dataLocale.form.receiver.label)
                        .nullable();
                }
                if (!valForm.registration) {
                    errorMessage.value = `${
                        dataLocale.form.registration.placeholder
                    } ${t("validation.required")}`;
                } else errorMessage.value = null;
            }
        );

        const errorMessage = ref("");

        const onSubmit = async () => {
            const { valid, errors } = await validate();

            const registrationOption = formatDirectSubmission(
                valForm.registration
            );

            errorMessage.value = errors.registration;

            if (valid) {
                try {
                    const data = {
                        // ...valForm,
                        Afacctno: valForm.depositoryAccountNumber,
                        accountName: valForm.accountName,
                        symbol: valForm.stockCode,
                        Series: valForm.serialNumber,
                        Qtty: valForm.stockQuantity,
                        Amount: valForm.stockValue,
                        Td_Txdesc: valForm.note,
                        Recipient: valForm.receiver,
                        Passport: valForm.numberCitizenIdentification,
                        PhoneNumber: valForm.phone,
                        transactionDate: formatDate(valForm.transactionDate),
                        ...registrationOption,
                    };

                    if (props.id)
                        await transDepositoryStore.editVPB({
                            ...data,
                            Id: props.id,
                        });
                    else await transDepositoryStore.createVPB(data);

                    resetForm();

                    return true;
                } catch (e) {
                    throw e;
                }
            } else {
                return false;
            }
        };

        const formatDirectSubmission = (registration) => {
            if (registration === "1") {
                return {
                    DirectSubmission: 1,
                    SentByPost: 0,
                    SecuritiesIssuer: 0,
                };
            } else if (registration === "2")
                return {
                    DirectSubmission: 0,
                    SentByPost: 1,
                    SecuritiesIssuer: 0,
                };
            else if (registration === "3")
                return {
                    DirectSubmission: 0,
                    SentByPost: 0,
                    SecuritiesIssuer: 1,
                };
            else return null;
        };

        onMounted(async () => {
            const systemDate = await commonStore.getSystemDate();
            setFieldValue("transactionDate", systemDate);

            if (props.id) {
                await transDepositoryStore.getDetail(props.id, transactionType);
                setValues({
                    transactionDate:
                        transDepositoryStore.transaction.transactionDate,
                    depositoryAccountNumber:
                        transDepositoryStore.transaction
                            .depositoryAccountNumber,
                    stockCode: transDepositoryStore.transaction.stockCode,
                    stockQuantity:
                        transDepositoryStore.transaction.stockQuantity,
                    stockValue: transDepositoryStore.transaction.stockValue,
                    serialNumber: transDepositoryStore.transaction.serialNumber,
                    note: transDepositoryStore.transaction.note,
                    receiver: transDepositoryStore.transaction.Recipient,
                    numberCitizenIdentification:
                        transDepositoryStore.transaction.Passport,
                    phone: transDepositoryStore.transaction.PhoneNumber,
                    registration: transDepositoryStore.transaction.registration,
                });
            }
        });

        const onChangeDepoAccNo = (val) => {
            if (!val) return;

            const depoAccNo = authStore.depoAccNo(val);
            setFieldValue("accountName", depoAccNo.Afname);
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

        const registrationInformations = RegistrationInformation.toOptions();

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
            registrationInformations,
            errorMessage,
        };
    },
};
</script>

<style scoped></style>
