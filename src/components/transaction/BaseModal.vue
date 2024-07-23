<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="5000px"
            height-content="600px"
        ></QcCardSkeleton>
        <q-card style="width: 500px; max-width: 40vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ $t(title) }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <!-- <q-card-section> -->
            <div class="vpb-baseModalLabel">
                <span class="vpb-baseModalText">
                    {{ $t(description) }}
                </span>
            </div>
            <!-- </q-card-section> -->

            <q-card-actions class="qc-card-actions--center">
                <q-btn
                    v-if="onCancelText"
                    padding="12px 31.5px"
                    no-caps
                    color="negative"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onCancel"
                    v-close-popup
                    >{{ $t(onCancelText) }}
                </q-btn>
                <q-btn
                    v-if="onOkText"
                    padding="12px 31.5px"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onSubmit"
                    v-close-popup
                    >{{ $t(onOkText) }}
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
    name: "BaseModal",
    props: {
        title: {
            type: String,
            required: false,
        },
        onOk: {
            // type: ()=> null,
            type: String,
            required: false,
        },
        onOkPress:{
            type: String,
            required: false,
        },
        onCancel: {
            // type: ()=> null,
            required: false,
        },
        onOkText: {
            type: String,
            required: false,
        },
        onCancelText: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const router = useRouter();

        const approveTransactionStore = useApproveTransactionStore();
        const authStore = useAuthStore();

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const onSubmit = async () => {
            if (props.onOkPress) {
                router.push({
                    name: props.onOkPress,
                });
            }
        };

        return {
            dialogRef,
            onSubmit,
        };
    },
});
</script>
