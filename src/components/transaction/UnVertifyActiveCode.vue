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
                    srcset="images/vpb-un-vertify.png"
                    style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 auto;
                    "
                />
                <div
                    style="
                        padding: 25px 25% 0px 25%;
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        color: #33383f;
                    "
                >
                    <span
                        style="
                            font-style: normal;
                            font-weight: 600;
                            font-size: 13.9736px;
                            line-height: 20px;
                            letter-spacing: -0.01em;
                        "
                    >
                        Không thể duyệt giao dịch do bạn chưa nhập active code
                    </span>
                </div>
            </q-card-section>

            <q-card-actions class="qc-card-actions--center">
                <!-- v-if="action === 'create' || action === 'update'" -->
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn full-width"
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
    name: "UnVertifyActiveCode",
    props: {},
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const router = useRouter();

        const dataLocale = {
            title: "Không thể duyệt",
            form: {
                btnConfirm: t("button.getActiveCode"),
            },
        };

        const approveTransactionStore = useApproveTransactionStore();
        const authStore = useAuthStore();

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const onSubmit = async () => {
            const params = {
                userId: authStore?.user?.UserId,
                aidVersion: "99",
                customerName: removeVietnameseTones(authStore?.user?.FullName),
                customerCode: "",
                phoneNumber: "",
                branchCode: "B2B",
                customerType: "1", // Fix cứng là 1
                emailAddress: "",
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
