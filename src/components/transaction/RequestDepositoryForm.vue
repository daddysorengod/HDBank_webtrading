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
                <div class="row q-col-gutter-sm">
                    <div class="col-3 vpb-form-group">
                        <QcLabel
                            :label="dataLocale.form.depositoryPlace.label"
                        />
                        <QcSelect
                            :key="depositoryPlaceKey"
                            :disabled="action !== 'create'"
                            :placeholder="
                                dataLocale.form.depositoryPlace.placeholder
                            "
                            name="depositoryPlace"
                            :options="placeDepositoryOptions"
                            map-options
                        />
                    </div>
                </div>

                <template
                    v-if="
                        valForm.depositoryPlace ===
                        placeDepositoryType.VPB.value
                    "
                >
                    <RequestDepositoryVPB
                        :id="id"
                        ref="refVpbForm"
                        :action="action"
                    />
                </template>
                <template
                    v-else-if="
                        valForm.depositoryPlace ===
                        placeDepositoryType.VSD.value
                    "
                >
                    <RequestDepositoryVSD :id="id" ref="refVsdForm" />
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
import { defineComponent, computed, onMounted, ref, provide } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import RequestDepositoryVPB from "components/transaction/RequestDepository/RequestDepositoryVPB";
import RequestDepositoryVSD from "components/transaction/RequestDepository/RequestDepositoryVSD";
import { useTransDepositoryStore } from "stores/transactionDepository";
import PlaceDepositoryType from "src/common/types/placeDepository";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useApproveTransactionStore } from "stores/approveTransaction";
import OtpFrom from "components/transaction/OtpFrom.vue";
import { useAuthStore } from "stores/auth";

export default defineComponent({
    name: "RequestDepositoryForm",
    mixins: [componentOptionsMixin],
    components: { RequestDepositoryVSD, RequestDepositoryVPB },
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
        transactionType: {
            type: String,
            default: "",
        },
        vertifyOTP: Boolean,
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        provide("action", props.action);
        provide("transactionType", props.transactionType);

        const { t } = useI18n();

        const refVsdForm = ref(null);
        const refVpbForm = ref(null);
        const depositoryPlaceKey = ref("1");

        const transactionDepositoryStore = useTransDepositoryStore();
        const approveTransactionStore = useApproveTransactionStore();
        const authStore = useAuthStore();

        const { openDialog: openDialogOtpFrom } = useOpenDialog(OtpFrom);

        const placeDepositoryType = PlaceDepositoryType;

        const titleByAction = {
            create: t("title.addRequestDepository"),
            update: t("title.update"),
            detail: t("title.detail"),
            delete: t("title.delete"),
            approve: t("title.approve"),
        };

        const dataLocale = {
            title: titleByAction[props.action],
            userTitle: t("transaction.userTitle"),
            infoTHQTitle: t("transaction.infoTHQTitle"),
            infoRegisterTitle: t("transaction.infoRegisterTitle"),
            form: {
                depositoryPlace: {
                    label: t("field.depositoryPlace.label"),
                    placeholder: t("field.depositoryPlace.placeholder"),
                },
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
                    placeholder: "field.transactionDate.placeholder",
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
                permissionQuantity: {
                    label: t("field.permissionQuantity.label"),
                    placeholder: t("field.permissionQuantity.placeholder"),
                },
                paidQuantity: {
                    label: t("field.paidQuantity.label"),
                    placeholder: t("field.paidQuantity.placeholder"),
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
                .required(
                    `${dataLocale.form.paidQuantity.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.paidQuantity.label),
            registerPermissionQuantity: yup
                .number()
                .required(
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
                .label(dataLocale.form.registerStockQuantity.label),
            payAmount: yup
                .number()
                .required(
                    `${dataLocale.form.payAmount.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.payAmount.label),
            note: yup
                .string()
                .required(
                    `${dataLocale.form.note.label} ${t("validation.required")}`
                )
                .label(dataLocale.form.note.label),
        };

        const schema = yup.object(yupObject);

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            values: valForm,
        } = useForm({
            validationSchema: schema,
            initialValues: {
                depositoryPlace: props.action === "create" ? "" : props.type,
            },
        });

        const onSubmit = async (values) => {
            let submitSuccess = false;

            if (valForm.depositoryPlace === placeDepositoryType.VPB.value)
                submitSuccess = await refVpbForm.value.onSubmit();
            else submitSuccess = await refVsdForm.value.onSubmit();

            if (submitSuccess) onDialogCancel();
        };

        onMounted(async () => {
            if (props.id) {
                skeleton.value = true;

                valForm.depositoryPlace = props.transactionType;

                setTimeout(() => {
                    depositoryPlaceKey.value = "2";
                });

                skeleton.value = false;
            }
        });

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
                await transactionDepositoryStore.deleteVSD(props.id);
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
            refVsdForm,
            refVpbForm,
            placeDepositoryType,
            depositoryPlaceKey,
            approveTransactionStore,
        };
    },
});
</script>
<style scoped></style>
