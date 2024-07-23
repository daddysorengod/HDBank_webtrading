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
                <div class="vpb-order-form-group">
                    <h4 class="vpb-title-in-form">
                        I. {{ dataLocale.userTitle }}
                    </h4>
                    <div class="row q-col-gutter-lg">
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="
                                    dataLocale.form.depositoryAccountNumber
                                        .label
                                "
                            />
                            <QcSelect
                                :disabled="inputDisabled"
                                :placeholder="
                                    dataLocale.form.depositoryAccountNumber
                                        .placeholder
                                "
                                name="depositoryAccountNumber"
                                :options="
                                    depositoryAccNoOptions.map(
                                        (item, index) => {
                                            if (index === 0) {
                                                return {
                                                    label: $t(item.label),
                                                    value: $t(item.value),
                                                };
                                            } else return item;
                                        }
                                    )
                                "
                                @change="onChangeDepoAccNo"
                                use-input
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.accountName.label"
                            />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="accountName"
                                :placeholder="
                                    dataLocale.form.accountName.placeholder
                                "
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel :label="dataLocale.form.address.label" />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="address"
                                :placeholder="
                                    dataLocale.form.address.placeholder
                                "
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.transactionDate.label"
                            />
                            <QcDatePicker
                                :disabled="true"
                                outlined
                                name="transactionDate"
                                :placeholder="
                                    dataLocale.form.transactionDate.placeholder
                                "
                            />
                        </div>
                    </div>
                </div>

                <div class="vpb-order-form-group">
                    <h4 class="vpb-title-in-form">
                        II. {{ dataLocale.infoTHQTitle }}
                    </h4>
                    <div class="row q-col-gutter-lg">
                        <div class="col-3 vpb-form-group">
                            <QcLabel :label="dataLocale.form.thqCode.label" />
                            <QcSelect
                                :disabled="inputDisabled"
                                :placeholder="
                                    dataLocale.form.thqCode.placeholder
                                "
                                name="thqCode"
                                @change="onChangeThqCodeNo"
                                :options="orderStore?.currentListStock"
                                map-options
                            />
                        </div>
                        <div class="col-6 vpb-form-group">
                            <QcLabel :label="dataLocale.form.thqName.label" />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="thqName"
                                :placeholder="
                                    dataLocale.form.thqName.placeholder
                                "
                            />
                            <QCTooltip name="thqName"></QCTooltip>
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel :label="dataLocale.form.stockCode.label" />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="stockCode"
                                :placeholder="
                                    dataLocale.form.stockCode.placeholder
                                "
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.registerDate.label"
                            />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="registerDate"
                                :placeholder="
                                    dataLocale.form.registerDate.placeholder
                                "
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.expiredDate.label"
                            />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="expiredDate"
                                :placeholder="
                                    dataLocale.form.expiredDate.placeholder
                                "
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel :label="dataLocale.form.ratio.label" />
                            <QcInput
                                :disabled="true"
                                outlined
                                name="ratio"
                                :placeholder="dataLocale.form.ratio.placeholder"
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.purchasePrice.label"
                            />
                            <QcInputCurrency
                                :disabled="true"
                                outlined
                                name="purchasePrice"
                                :placeholder="
                                    dataLocale.form.purchasePrice.placeholder
                                "
                            />
                        </div>
                    </div>
                </div>

                <div class="vpb-order-form-group">
                    <h4 class="vpb-title-in-form">
                        III. {{ dataLocale.infoRegisterTitle }}
                    </h4>
                    <div class="row q-col-gutter-lg">
                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="
                                    dataLocale.form.permissionQuantity.label
                                "
                            />
                            <QcInputCurrency
                                :disabled="true"
                                outlined
                                name="permissionQuantity"
                                :placeholder="
                                    dataLocale.form.permissionQuantity
                                        .placeholder
                                "
                            />
                        </div>

                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.paidQuantity.label"
                            />
                            <QcInputCurrency
                                :disabled="true"
                                outlined
                                name="paidQuantity"
                                :placeholder="
                                    dataLocale.form.paidQuantity.placeholder
                                "
                            />
                        </div>

                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="
                                    dataLocale.form.registerPermissionQuantity
                                        .label
                                "
                            />
                            <QcInputCurrency
                                :disabled="inputDisabled"
                                outlined
                                name="registerPermissionQuantity"
                                :placeholder="
                                    dataLocale.form.registerPermissionQuantity
                                        .placeholder
                                "
                                @change="onChangeRegisterPermissionQuantity"
                            />
                        </div>

                        <div class="col-3 vpb-form-group">
                            <QcLabel
                                :label="
                                    dataLocale.form.registerStockQuantity.label
                                "
                            />
                            <QcInputCurrency
                                :disabled="true"
                                outlined
                                name="registerStockQuantity"
                                :placeholder="
                                    dataLocale.form.registerStockQuantity
                                        .placeholder
                                "
                            />
                        </div>
                        <div class="col-3 vpb-form-group">
                            <QcLabel :label="dataLocale.form.payAmount.label" />
                            <QcInputCurrency
                                :disabled="true"
                                outlined
                                name="payAmount"
                                :placeholder="
                                    dataLocale.form.payAmount.placeholder
                                "
                            />
                        </div>
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
                </div>
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
import { defineComponent, computed, ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import moment from "moment";
import { SUCCESS_CODE, UNAUTHORIZED_CODE } from "src/common/constant";
import { useOrderListStock } from "src/stores/order";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useApproveTransactionStore } from "stores/approveTransaction";
import { useRouter } from "vue-router";
import { useCommonStore } from "stores/common";
import { useAuthStore } from "stores/auth";
import OtpFrom from "components/transaction/OtpFrom.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";

export default defineComponent({
    name: "OrderForm",
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
        data: {
            caid: String,
            afacctno: String,
            id: String,
        },
        vertifyOTP: Boolean,
    },
    emits: [...useDialogPluginComponent.emits],
    mixins: [componentOptionsMixin],
    setup(props) {
        const { t } = useI18n();

        const orderStore = useOrderListStock();

        const commonStore = useCommonStore();

        const approveTransactionStore = useApproveTransactionStore();
        const authStore = useAuthStore();

        const router = useRouter();

        const titleByAction = {
            create: t("title.addOrder"),
            update: t("title.update"),
            detail: t("title.detail"),
            delete: t("title.delete"),
            approve: t("title.order"),
        };

        const dataLocale = {
            title: titleByAction[props.action],
            userTitle: t("transaction.userTitle"),
            infoTHQTitle: t("transaction.infoTHQTitle"),
            infoRegisterTitle: t("transaction.infoRegisterTitle"),
            infoMoneyAccount: t("transaction.infoMoneyAccount"),
            form: {
                depositoryAccountNumber: {
                    label: t("field.depositoryAccountNumber.label"),
                    placeholder: t("field.depositoryAccountNumber.placeholder"),
                },
                accountName: {
                    label: t("field.accountName.label"),
                    placeholder: t("field.accountName.placeholder"),
                },
                address: {
                    label: t("field.address.label"),
                    placeholder: t("field.address.placeholder"),
                },
                transactionDate: {
                    label: t("field.transactionDate.label"),
                    placeholder: t("field.transactionDate.placeholder"),
                },
                thqCode: {
                    label: t("field.thqCode.label"),
                    placeholder: t("field.thqCode.placeholder"),
                },
                thqName: {
                    label: t("field.thqName.label"),
                    placeholder: t("field.thqName.placeholder"),
                },
                stockCode: {
                    label: t("field.stockCode.label"),
                    placeholder: t("field.stockCode.placeholder"),
                },
                registerDate: {
                    label: t("field.registerDate.label"),
                    placeholder: t("field.registerDate.placeholder"),
                },
                expiredDate: {
                    label: t("field.expiredDate.label"),
                    placeholder: t("field.expiredDate.placeholder"),
                },
                ratio: {
                    label: t("field.ratio.label"),
                    placeholder: t("field.ratio.placeholder"),
                },
                purchasePrice: {
                    label: t("field.purchasePrice.label"),
                    placeholder: t("field.purchasePrice.placeholder"),
                },
                moneyAccount: {
                    label: t("field.moneyAccount.label"),
                    placeholder: t("field.moneyAccount.placeholder"),
                },
                surplus: {
                    label: t("field.surplus.label"),
                    placeholder: t("field.surplus.placeholder"),
                },
                pendingBalance: {
                    label: t("field.pendingBalance.label"),
                    placeholder: t("field.pendingBalance.placeholder"),
                },
                availableBalances: {
                    label: t("field.availableBalances.label"),
                    placeholder: t("field.availableBalances.placeholder"),
                },
                permissionQuantity: {
                    label: t("field.permissionQuantity.label"),
                    placeholder: t("field.permissionQuantity.placeholder"),
                },
                numberOfSecuritiesPurchased: {
                    label: t("field.numberOfSecuritiesPurchased.label"),
                    placeholder: t(
                        "field.numberOfSecuritiesPurchased.placeholder"
                    ),
                },
                paidQuantity: {
                    label: t("field.paidQuantity.label"),
                    placeholder: t("field.paidQuantity.placeholder"),
                },
                remainingRights: {
                    label: t("field.remainingRights.label"),
                    placeholder: t("field.remainingRights.placeholder"),
                },
                registerPermissionQuantity: {
                    label: t("field.registerPermissionQuantity.label"),
                    placeholder: t(
                        "field.registerPermissionQuantity.placeholder"
                    ),
                },
                registerStockQuantity: {
                    label: t("field.registerStockQuantity.label"),
                    placeholder: t("field.registerStockQuantity.placeholder"),
                },
                payAmount: {
                    label: t("field.payAmount.label"),
                    placeholder: t("field.payAmount.placeholder"),
                },
                note: {
                    label: t("field.note.label"),
                    placeholder: t("field.note.placeholder"),
                },
                btnConfirm: t("button.confirm"),
                btnSave: t("button.save"),
                btnDelete: t("button.delete"),
                btnReject: t("button.reject"),
                btnApprove: t("button.approve"),
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(props.action);
        });

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();
        const { openDialog: openDialogOtpFrom } = useOpenDialog(OtpFrom);

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const yupObject = ref({
            depositoryAccountNumber: yup
                .string()
                .required(
                    `${t(dataLocale.form.depositoryAccountNumber.label)} ${t(
                        "validation.required"
                    )}`
                )
                .typeError(
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
            address: yup
                .string()
                .required(
                    `${dataLocale.form.address.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.address.label),
            transactionDate: yup
                .string()
                .required(
                    `${dataLocale.form.transactionDate.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.transactionDate.label),
            thqCode: yup
                .string()
                .required(
                    `${dataLocale.form.thqCode.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.thqCode.label),
            thqName: yup
                .string()
                .required(
                    `${dataLocale.form.thqName.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.thqName.label),
            stockCode: yup
                .string()
                .required(
                    `${dataLocale.form.stockCode.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.stockCode.label),
            registerDate: yup
                .string()
                .required(
                    `${dataLocale.form.registerDate.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.registerDate.label),
            expiredDate: yup
                .string()
                .required(
                    `${dataLocale.form.expiredDate.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.expiredDate.label),
            ratio: yup
                .string()
                .required(
                    `${dataLocale.form.ratio.label} ${t("validation.required")}`
                )
                .label(dataLocale.form.ratio.label),
            purchasePrice: yup
                .number()
                .required(
                    `${dataLocale.form.purchasePrice.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.purchasePrice.label),
            permissionQuantity: yup
                .number()
                .required(
                    `${dataLocale.form.permissionQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.permissionQuantity.label),
            paidQuantity: yup
                .number()
                .label(dataLocale.form.paidQuantity.label),
            registerPermissionQuantity: yup
                .number()
                .required(
                    `${dataLocale.form.registerPermissionQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .integer(
                    `${dataLocale.form.registerPermissionQuantity.label} ${t(
                        "validation.isInteger"
                    )}`
                )
                .typeError(
                    `${dataLocale.form.registerPermissionQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.registerPermissionQuantity.label),
            registerStockQuantity: yup
                .number()
                .required(
                    `${dataLocale.form.registerStockQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .typeError(
                    `${dataLocale.form.registerStockQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.registerStockQuantity.label),
            payAmount: yup
                .number()
                .required(
                    `${dataLocale.form.payAmount.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.payAmount.label),
            note: yup.string().nullable().label(dataLocale.form.note.label),
            moneyAccount: yup
                .number()
                .label(dataLocale.form.moneyAccount.label),
            surplus: yup.number().label(dataLocale.form.surplus.label),
            pendingBalance: yup
                .number()
                .label(dataLocale.form.pendingBalance.label),
            availableBalances: yup
                .number()
                .label(dataLocale.form.availableBalances.label),
            numberOfSecuritiesPurchased: yup
                .number()
                .label(dataLocale.form.numberOfSecuritiesPurchased.label),
            remainingRights: yup
                .number()
                .label(dataLocale.form.remainingRights.label),
        });

        const schema = yup.object(yupObject.value);

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            setFieldValue,
            values: valForm,
            resetForm,
            // setErrors,
        } = useForm({
            validationSchema: schema,
        });

        onMounted(async () => {
            if (props.action === "create") {
                const systemDate = await commonStore.getSystemDate();
                setFieldValue("transactionDate", systemDate);
                return;
            }

            const detailTransaction = await orderStore.getDetailTransaction({
                registerid: props?.data?.id,
            });
            if (!detailTransaction?.Afacctno) {
                return;
            }

            setFieldValue(
                "depositoryAccountNumber",
                detailTransaction.Afacctno ?? ""
            );

            setFieldValue("thqCode", detailTransaction.Caid ?? " ");

            setFieldValue(
                "transactionDate",
                detailTransaction?.Txdate
                    ? moment(detailTransaction?.Txdate).format("DD/MM/YYYY")
                    : ""
            );
            setFieldValue(
                "registerPermissionQuantity",
                detailTransaction?.RightqttBuying ?? 0
            );

            setFieldValue("registerStockQuantity", detailTransaction?.Qtty);

            setFieldValue("payAmount", detailTransaction?.Amount);

            setFieldValue("paidQuantity", detailTransaction?.QTTY_PAID ?? 0);

            setFieldValue("note", detailTransaction?.Td_Txdesc);
        });

        const onSubmit = handleSubmit(async (values) => {
            if (props.action === "create") {
                const params = {
                    caid: values.thqCode,
                    afacctno: values.depositoryAccountNumber,
                    Symbol: values.stockCode,
                    Qtty: values.registerStockQuantity,
                    Amount: values.payAmount,
                    Rightqtt: values.permissionQuantity,
                    Td_Txdesc: values.note,
                    RightqttBuying: values.registerPermissionQuantity,
                };

                const caBuyingDoAdd = await orderStore?.createTransaction(
                    params
                );

                if (caBuyingDoAdd === UNAUTHORIZED_CODE) {
                    // router.push({ name: "login" });
                    router.push({ name: "sso-login" });
                    return;
                }

                if (caBuyingDoAdd != SUCCESS_CODE) {
                    return;
                } else {
                    onDialogCancel();
                }
            } else {
                const params = {
                    Id: props.data.id,
                    Afacctno: values.depositoryAccountNumber,
                    Symbol: values.stockCode,
                    Qtty: values.registerStockQuantity,
                    Amount: values.payAmount,
                    Td_Txdesc: values.note,
                    Rightqtt: values.permissionQuantity,
                    Caid: values.thqCode,
                    RightqttBuying: values.registerPermissionQuantity,
                };

                const caBuyingDoEdit = await orderStore?.editTransaction(
                    params
                );

                if (caBuyingDoEdit === UNAUTHORIZED_CODE) {
                    // router.push({ name: "login" });
                    router.push({ name: "sso-login" });
                    return;
                }

                if (caBuyingDoEdit === SUCCESS_CODE) {
                    onDialogCancel();
                } else {
                    return;
                }
            }
        });

        const onApprove = async () => {
            const checkCorrectOtp =
                await approveTransactionStore?.checkBeforeVerifyOtp({
                    userId: authStore?.user?.UserId,
                    transactionId: props?.data?.id,
                });

            if (checkCorrectOtp) {
                const params = {
                    userId: authStore?.user?.UserId,
                    transactionId: props?.data?.id,
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
                            transactionId: props?.data?.id,
                        },
                    });
                }
            }
        };

        const onReject = async () => {
            try {
                await approveTransactionStore.rejectTransaction(props.data.id);
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        const onChangeDepoAccNo = async (val) => {
            ResetFormCustoms();

            if (!val) return;

            const depoAccNo =
                props?.action === "create"
                    ? await orderStore.getListRegisterAllowed({
                          afacctno: val,
                      })
                    : await orderStore.getListRegisterAllowed_View({
                          afacctno: val,
                      });

            if (!depoAccNo?.length) {
                return;
            }
            setFieldValue("accountName", depoAccNo[0].FULLNAME ?? "");

            setFieldValue("address", depoAccNo[0]?.ADDRESS ?? "");

            setFieldValue("availableBalances", depoAccNo[0]?.TRADEAMT ?? "");
        };

        const onChangeThqCodeNo = async (val) => {
            if (!val) return;

            const detailStock =
                await orderStore.getDetailTransactionRegisterForPay({
                    caid: val,
                });

            if (!detailStock?.length) {
                return;
            }

            setFieldValue("stockCode", detailStock[0]?.SYMBOL ?? "");

            setFieldValue("thqName", detailStock[0]?.CANAME ?? "");

            setFieldValue(
                "registerDate",
                detailStock[0]?.REPORTDATE
                    ? moment(detailStock[0]?.REPORTDATE).format("DD/MM/YYYY")
                    : ""
            );

            setFieldValue(
                "expiredDate",
                moment(detailStock[0]?.REGDUEDATE).format("DD/MM/YYYY") ?? ""
            );

            setFieldValue("purchasePrice", detailStock[0]?.ROPARVALUE ?? "");

            detailStock[0]?.RTOSRATE
                ? setFieldValue("ratio", detailStock[0]?.RTOSRATE ?? "")
                : null;

            orderStore.currentStockAboveRight = detailStock[0]?.RTOSRATE
                ? detailStock[0]?.RTOSRATE.split(":").map((item) =>
                      parseInt(item)
                  )
                : [];

            const detailTransaction =
                props?.action === "create"
                    ? await orderStore.getListRegisterAllowed({
                          afacctno: orderStore?.currentAcount,
                          caid: val,
                      })
                    : await orderStore.getListRegisterAllowed_View({
                          afacctno: orderStore?.currentAcount,
                          caid: val,
                      });

            if (!detailTransaction?.length) {
                return;
            }

            setFieldValue(
                "permissionQuantity",
                detailTransaction[0]?.RIGHTQTTY ?? ""
            );

            if (props?.action === "create") {
                setFieldValue("paidQuantity", detailTransaction[0]?.QTTY_PAID);
            }

            orderStore.currentPermissionQuantity =
                detailTransaction[0]?.AVAILABLE_QTTY;
        };

        const onChangeRegisterPermissionQuantity = (val) => {
            if (props.action !== "create" && props?.action !== "update") {
                return;
            }

            if (!orderStore?.currentStockAboveRight.length) {
                if (val) {
                    setErrors({
                        ratio: `${dataLocale.form.ratio.label} ${t(
                            "validation.required"
                        )}`,
                    });
                }
                setFieldValue("registerPermissionQuantity", 0);

                return;
            }

            if (val < 1) {
                return;
            }

            if (parseInt(val) <= orderStore?.currentPermissionQuantity) {
                const registerStockQuantity = Math.floor(
                    parseInt(val) *
                        (orderStore?.currentStockAboveRight[1] /
                            orderStore?.currentStockAboveRight[0])
                );

                const payAmount =
                    Math.floor(
                        parseInt(val) *
                            (orderStore?.currentStockAboveRight[1] /
                                orderStore?.currentStockAboveRight[0])
                    ) * orderStore?.currnetStockPrice ?? 0;

                setFieldValue("registerPermissionQuantity", parseInt(val));

                setFieldValue("registerStockQuantity", registerStockQuantity);

                setFieldValue("payAmount", payAmount);
            } else if (parseInt(val) > orderStore?.currentPermissionQuantity) {
                const registerStockQuantity =
                    Math.floor(
                        parseInt(orderStore?.currentPermissionQuantity) *
                            (orderStore?.currentStockAboveRight[1] /
                                orderStore?.currentStockAboveRight[0])
                    ) ?? 0;

                const payAmount =
                    Math.floor(
                        parseInt(orderStore?.currentPermissionQuantity) *
                            (orderStore?.currentStockAboveRight[1] /
                                orderStore?.currentStockAboveRight[0])
                    ) * orderStore?.currnetStockPrice ?? 0;

                setFieldValue(
                    "registerPermissionQuantity",
                    orderStore?.currentPermissionQuantity
                );

                setFieldValue("registerStockQuantity", registerStockQuantity);

                setFieldValue("payAmount", payAmount);

                return;
            }
        };

        const onDelete = async (value) => {
            const params = {
                id: props?.data?.id,
            };

            const caBuyingDoDelete = await orderStore.deleteTransaction(params);

            if (caBuyingDoDelete === UNAUTHORIZED_CODE) {
                // router.push({ name: "login" });
                router.push({ name: "sso-login" });
                return;
            }

            onDialogCancel();
        };

        const ResetFormCustoms = () => {
            setFieldValue("stockCode", " ");
            setFieldValue("thqName", " ");
            setFieldValue("expiredDate", " ");
            setFieldValue("registerDate", " ");
            setFieldValue("purchasePrice", 0);
            setFieldValue("permissionQuantity", 0);
            setFieldValue("ratio", " ");
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
            onChangeThqCodeNo,
            onChangeRegisterPermissionQuantity,
            orderStore,
            commonStore,
            ResetFormCustoms,
        };
    },
});
</script>
<style scoped></style>
