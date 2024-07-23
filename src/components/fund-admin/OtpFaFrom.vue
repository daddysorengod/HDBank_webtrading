<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="5000px"
            height-content="600px"
        ></QcCardSkeleton>
        <q-card style="width: 500px; max-width: 40vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ dataLocale.title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="q-pa-md">
                    <div class="row q-gutter-x-sm justify-center">
                        <q-input
                            for="OTP"
                            autofocus="autofocus"
                            mask="##"
                            outlined
                            v-for="i in length"
                            v-model="fieldValues[i - 1]"
                            v-bind="$attrs"
                            @keyup="onKeyUp($event, i - 1)"
                            @update:model-value="onUpdate($event, i - 1)"
                            :key="i"
                            :ref="(el) => updateFieldRef(el, i - 1)"
                            maxlength="1"
                            input-class="text-center"
                            style="width: 55px; height: 80px"
                        >
                        </q-input>
                    </div>
                </div>
                <div class="vpb-OtpInput">
                    <span class="vpb-OtpLabel">
                        {{ dataLocale.otpLabel1 }}
                        <strong> {{ dataLocale.smartOTP }} </strong>
                        {{ dataLocale.otpLabel2 }}
                        <Br></Br>
                    </span>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, computed, ref, watch, onBeforeUpdate } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useImportFaStatementStore } from "stores/importFaStatement";
import { SUCCESS_CODE } from "src/common/constant";

export default defineComponent({
    name: "OtpFaFrom",
    props: {
        inputLength: {
            type: Number,
            default: 6,
        },
        data: {
            userId: String,
            transactionId: String,
        },
    },
    emits: [...useDialogPluginComponent.emits, "update:modelValue"],
    setup(props, { emit }) {
        const { t } = useI18n();

        const router = useRouter();

        const dataLocale = {
            title: t("verify.confirm"),
            form: {
                btnConfirm: t("button.getActiveCode"),
            },
            otpLabel1: t("verify.otpLabel1"),
            otpLabel2: t("verify.otpLabel2"),
        };

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const importFaStatementStore = useImportFaStatementStore();

        const length = computed(() => props.inputLength);
        const fields = ref([]);
        const fieldValues = ref([]);

        const otpCode = computed(() => {
            const nonNullFields = fieldValues.value.filter((value) => value);
            if (length.value !== nonNullFields.length) {
                return "";
            }
            return nonNullFields.join("");
        });

        watch(otpCode, () => {
            if (otpCode.value) {
                emit("update:modelValue", otpCode.value);
                verifyOTP();
            }
        });

        const verifyOTP = async () => {
            const checkCorrectOtp =
                await importFaStatementStore?.checkBeforeVerifyOtp({
                    userId: props?.data?.userId,
                    transactionId: props?.data?.transactionId,
                });
            if (checkCorrectOtp?.Code !== SUCCESS_CODE) {
                return;
            }

            const params = {
                userId: props?.data?.userId,
                transactionId: props?.data?.transactionId,
                oTPNumber: otpCode.value,
            };

            const requestVerifyOtp = await importFaStatementStore?.verifyOtp(
                params
            );

            if (requestVerifyOtp) {
                try {
                    await importFaStatementStore.approveFundAdmin(
                        props?.data?.transactionId
                    );

                    onDialogCancel();
                } catch (error) {
                    throw error;
                }

                onDialogCancel();
                return;
            }
        };

        onBeforeUpdate(() => {
            fields.value = [];
        });

        const updateFieldRef = (element, index) => {
            if (element) {
                fields.value[index] = element;
            }
        };

        const focus = (index) => {
            if (index >= 0) {
                if (index < length.value) {
                    fields.value[index].select();
                } else {
                    if (otpCode.value) {
                        fields.value[index - 1].blur();
                    }
                }
            }
        };

        const onUpdate = (value, index) => {
            if (value) {
                focus(index + 1);
            }
        };

        const onKeyUp = (evnt, index) => {
            const key = evnt.key;

            if (
                ["Tab", "Shift", "Meta", "Control", "Alt", "Space"].includes(
                    key
                )
            ) {
                return;
            }

            if (["Delete"].includes(key)) {
                return;
            }

            if (key === "ArrowLeft" || key === "Backspace") {
                focus(index - 1);
            } else if (key === "ArrowRight") {
                focus(index + 1);
            }
        };

        return {
            dialogRef,
            dataLocale,
            otpCode,
            fields,
            fieldValues,
            focus,
            length,
            onKeyUp,
            onUpdate,
            updateFieldRef,
            verifyOTP,
        };
    },
});
</script>
