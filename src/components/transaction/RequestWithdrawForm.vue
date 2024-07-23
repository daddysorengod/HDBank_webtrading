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
                        <QcLabel :label="dataLocale.form.withdrawPlace.label" />
                        <QcSelect
                            :key="withdrawPlaceKey"
                            :disabled="action !== 'create'"
                            :placeholder="
                                dataLocale.form.withdrawPlace.placeholder
                            "
                            name="withdrawPlace"
                            :options="placeWithdrawOptions"
                            map-options
                        />
                    </div>
                </div>

                <template
                    v-if="valForm.withdrawPlace === placeWithdrawType.VPB.value"
                >
                    <RequestWithdrawVPB
                        :id="id"
                        ref="refVpbForm"
                        :step="step"
                        :action="action"
                    />
                </template>
                <template
                    v-else-if="
                        valForm.withdrawPlace === placeWithdrawType.VSD.value
                    "
                >
                    <RequestWithdrawVSD :id="id" ref="refVsdForm" />
                </template>
            </q-card-section>
            <template
                v-if="
                    placeWithdrawType
                        .getValues()
                        .includes(valForm.withdrawPlace)
                "
            >
                <q-card-actions
                    v-if="
                        ((action === 'create' && step === 1) ||
                            (action === 'update' && passStateEditFirst <= 2)) &&
                        valForm.withdrawPlace === placeWithdrawType.VPB.value
                    "
                >
                    <q-btn
                        padding="12px 31.5px"
                        no-caps
                        color="primary"
                        size="lg"
                        class="qc-btn qc-btn--primary-second"
                        unelevated
                        @click="onNext"
                        >{{
                            action === "create" ||
                            (action === "update" && passStateEditFirst > 1)
                                ? dataLocale.form.btnNext
                                : dataLocale.form.btnNextUpdate
                        }}
                    </q-btn>
                </q-card-actions>
                <q-card-actions
                    v-else-if="
                        (action === 'create' || action === 'update') &&
                        (step === 2 ||
                            valForm.withdrawPlace ===
                                placeWithdrawType.VSD.value)
                    "
                >
                    <q-btn
                        v-if="
                            valForm.withdrawPlace ===
                                placeWithdrawType.VPB.value && step === 2
                        "
                        padding="12px 31.5px"
                        no-caps
                        color="primary"
                        size="lg"
                        class="qc-btn qc-btn--primary-second"
                        unelevated
                        @click="onBack"
                        >{{ dataLocale.form.btnBack }}
                    </q-btn>
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
            </template>
        </q-card>
    </q-dialog>
</template>

<script>
import {
    defineComponent,
    computed,
    watch,
    ref,
    onBeforeMount,
    provide,
    onMounted,
    nextTick,
} from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import RequestWithdrawVPB from "components/transaction/RequestWithdraw/RequestWithdrawVPB";
import RequestWithdrawVSD from "components/transaction/RequestWithdraw/RequestWithdrawVSD";
import { useTransWithdrawStore } from "stores/transactionWithdraw";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import PlaceWithdrawType from "src/common/types/placeWithdraw";
import { useApproveTransactionStore } from "stores/approveTransaction";
import { useAuthStore } from "stores/auth";
import { DUPLICATE_TRANSACTION, NOTFOUND_CODE } from "src/common/constant";
import OtpFrom from "components/transaction/OtpFrom.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import { LocalStorage } from "quasar";
import { ACTIVE_CODE } from "src/common/constant";

export default defineComponent({
    name: "RequestWithdrawForm",
    mixins: [componentOptionsMixin],
    components: { RequestWithdrawVSD, RequestWithdrawVPB },
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
        const withdrawPlaceKey = ref("1");

        const transactionWithdrawStore = useTransWithdrawStore();
        const approveTransactionStore = useApproveTransactionStore();
        const authStore = useAuthStore();

        const step = ref(1);

        const passStateEditFirst = ref(1);

        const titleByAction = {
            create: t("title.addRequestWithdraw"),
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
                withdrawPlace: {
                    label: t("field.withdrawPlace.label"),
                    placeholder: t("field.withdrawPlace.placeholder"),
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
                btnNext: t("button.next"),
                btnNextUpdate: t("button.nextUpdate"),
                btnApprove: t("button.approve"),
                btnBack: t("button.back"),
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
                withdrawPlace:
                    props.action === "create" ? "" : props.transactionType,
            },
        });

        watch(
            valForm,
            (val) => {
                step.value = 1;
            },
            { deep: true }
        );

        const onSubmit = async (values) => {
            let submitSuccess = false;

            if (valForm.withdrawPlace === PlaceWithdrawType.VPB.value)
                submitSuccess = await refVpbForm.value.onSubmit();
            else submitSuccess = await refVsdForm.value.onSubmit();

            if (submitSuccess) onDialogCancel();
        };

        onMounted(async () => {
            if (props.id) {
                skeleton.value = true;

                valForm.withdrawPlace = props.transactionType;

                setTimeout(() => {
                    withdrawPlaceKey.value = "2";
                });

                step.value = 2;

                skeleton.value = false;
            }
        });

        const onNext = () => {
            if (props.action === "update" && passStateEditFirst.value === 1) {
                passStateEditFirst.value = 2;
                step.value--;
            } else if (
                props.action === "update" &&
                passStateEditFirst.value === 2
            ) {
                passStateEditFirst.value = 3;
                step.value++;
            } else {
                step.value++;
            }
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
                await transactionWithdrawStore.deleteVSD(props.id);
            } catch (e) {
                console.log(e);
            }

            onDialogCancel();
        };

        const onBack = () => {
            step.value--;
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
            step,
            onNext,
            refVsdForm,
            refVpbForm,
            passStateEditFirst,
            onBack,
            placeWithdrawType: PlaceWithdrawType,
            withdrawPlaceKey,
        };
    },
});
</script>
<style scoped></style>
