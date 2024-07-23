<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="5000px"
            height-content="600px"
        ></QcCardSkeleton>
        <q-card style="width: 400px; max-width: 40vw; max-height: 600px" v-else>
            <div class="vpb-stickyTitle">
                <q-card-section class="qc-card__title row items-center">
                    <div>{{ $t(dataLocale.title) }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-separator />
            </div>

            <q-card-section
                :key="`role_type_${i}`"
                v-for="(item, i) in listNotification"
                class="vpb-notifyContent"
            >
                <div class="vpb-notifyContainer">
                    <span class="vpb-notifyTitle">
                        <strong> {{ item.message }} </strong>
                    </span>
                    <Br></Br>
                    <div class="vpb-dateContainer">
                        <span class="vpb-dateLabel">
                            {{ $t(dataLocale.from) }}:
                            {{ formatDateV2(item.fromTime) }}
                        </span>

                        <span class="vpb-dateLabel">
                            {{ $t(dataLocale.to) }}:
                            {{ formatDateV2(item.toTime) }}
                        </span>
                    </div>
                </div>
            </q-card-section>
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
import { formatDateV2 } from "src/common/utils/helper";
import componentOptionsMixin from "src/common/mixins/componentOptions";

export default defineComponent({
    name: "Notification",
    props: {},
    mixins: [componentOptionsMixin],
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const dataLocale = {
            title: "title.notify",
            from: "title.from",
            to: "title.to",
        };

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        return {
            dialogRef,
            dataLocale,
            formatDateV2,
        };
    },
});
</script>
