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
                <img
                    alt="Background 1"
                    srcset="images/vpb-active-code.png"
                    class="vpb-getActiveCode"
                />
                <div class="vpb-getActiveCodeLabel">
                    <span class="vpb-getActiveCodeText">
                        {{ dataLocale.activeCodeLabel }}
                        <Br></Br>
                        <strong> {{ dataLocale.smartOTP }} </strong>
                    </span>
                </div>
            </q-card-section>

            <q-card-actions class="qc-card-actions--center">
                <q-btn
                    padding="12px 31.5px"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onSubmit"
                    >{{ dataLocale.form.btnConfirm }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, computed, onBeforeMount, ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useApproveTransactionStore } from "stores/approveTransaction";
import { useAuthStore } from "stores/auth";
import { removeVietnameseTones } from "src/helpers/removeVietnameseTones";

export default defineComponent({
    name: "GetActiveCode",
    props: {},
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const router = useRouter();

        const approveTransactionStore = useApproveTransactionStore();
        const authStore = useAuthStore();

        const dataLocale = {
            title: "Active Code",
            form: {
                btnConfirm: t("button.understand"),
            },
            activeCodeLabel: t("verify.activeCodeLabel"),
            smartOTP: t("verify.smartOTP"),
        };

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const onSubmit = async () => {
            const params = {
                userId: authStore?.user?.UserId,
                aidVersion: "99",
                customerName: removeVietnameseTones(authStore?.user?.FullName),
                customerCode: "",
                phoneNumber: authStore?.user?.Mobile,
                branchCode: "DSB",
                customerType: "1", // Fix cứng là 1
                // emailAddress: authStore?.user?.Email,
                userName: authStore?.user?.UserName,
            };

            const requestGetCode =
                await approveTransactionStore?.getActiveCodeVerify(params);

            if (requestGetCode) {
                onDialogCancel();
            }
        };

        return {
            dialogRef,
            dataLocale,
            onSubmit,
        };
    },
});
</script>
