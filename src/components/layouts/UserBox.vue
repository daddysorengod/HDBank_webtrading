<template>
    <q-item clickable v-ripple>
        <q-item-section class="gt-xs text-right">
            <!-- <q-item-label caption>Quản trị viên</q-item-label> -->
            <q-item-label class="text-title text-dark">{{
                user?.FullName
            }}</q-item-label>
        </q-item-section>

        <q-item-section side>
            <q-avatar
                class="qc-btn--primary-second text-weight-bold"
                rounded
                size="36px"
            >
                {{ standForName }}
                <q-badge
                    color="red"
                    floating
                    transparent
                    v-if="listNotification.length > 0"
                >
                    {{
                        listNotification.length
                            ? listNotification.length > 99
                                ? +99
                                : listNotification.length
                            : ""
                    }}
                </q-badge>
            </q-avatar>
        </q-item-section>

        <q-menu fit v-model="showing">
            <q-list bordered dense>
                <q-item clickable v-ripple v-close-popup>
                    <q-item-section avatar>
                        <q-btn dense round flat icon="o_person" size="md" />
                    </q-item-section>
                    <q-item-section>{{
                        $t(dataLocale.profile)
                    }}</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    @click="onPressGetActiveCode"
                    v-close-popup
                >
                    <q-item-section avatar>
                        <q-btn dense round flat icon="o_qr_code" size="md" />
                    </q-item-section>
                    <q-item-section>{{
                        $t(dataLocale.btnGetActiveCode)
                    }}</q-item-section>
                </q-item>

                <q-item
                    clickable
                    v-ripple
                    @click="onPressViewNotification(listNotification.length)"
                    v-close-popup
                >
                    <q-item-section avatar>
                        <q-btn
                            dense
                            round
                            flat
                            icon="o_notifications"
                            size="md"
                        >
                            <q-badge
                                color="red"
                                floating
                                transparent
                                v-if="listNotification.length > 0"
                            >
                                {{
                                    listNotification.length
                                        ? listNotification.length > 99
                                            ? +99
                                            : listNotification.length
                                        : ""
                                }}
                            </q-badge>
                        </q-btn>
                    </q-item-section>
                    <q-item-section>{{
                        $t(dataLocale.btnNotification)
                    }}</q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="logout" v-close-popup>
                    <q-item-section avatar>
                        <q-btn dense round flat icon="o_logout" size="md" />
                    </q-item-section>
                    <q-item-section>{{ $t(dataLocale.logout) }}</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-item>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth";
import { getStandForName } from "src/common/utils/helper";
import { useI18n } from "vue-i18n";
import { useApproveTransactionStore } from "stores/approveTransaction";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import GetActiveCode from "components/transaction/GetActiveCode.vue";
import Notification from "components/transaction/Notification.vue";
import componentOptionsMixin from "src/common/mixins/componentOptions";

export default defineComponent({
    name: "UserBox",
    mixins: [componentOptionsMixin],
    setup() {
        const { t } = useI18n();

        const router = useRouter();

        const authStore = useAuthStore();
        const approveTransactionStore = useApproveTransactionStore();

        const { openDialog: openDialogGetActiveCode } =
            useOpenDialog(GetActiveCode);

        const { openDialog: openNotificationDialog } =
            useOpenDialog(Notification);

        const onPressGetActiveCode = () => {
            openDialogGetActiveCode();
        };

        const onPressViewNotification = (val) => {
            try {
                if (val && typeof val === "number" && val > 0) {
                    openNotificationDialog();
                }
            } catch (error) {
                console.log(error);
            }
        };

        const dataLocale = {
            logout: "auth.logout.label",
            profile: "user.profile.label",
            btnGetActiveCode: "button.getActiveCode",
            btnNotification: "button.notification",
            changePassword: "auth.changePassword.title",
        };

        const user = computed(() => authStore.user);

        const logout = async () => {
            const handleLogout = await authStore.logoutSSO();
            if (handleLogout) {
                  router.push({ name: "login" });
                // router.push({ name: "sso-login" });
            } else {
            }
        };

        const changePassword = () => {
            router.push({ name: "changePassword" });
        };

        const standForName = computed(() =>
            getStandForName(user?.value?.FullName)
        );

        return {
            logout,
            user,
            dataLocale,
            standForName,
            onPressGetActiveCode,
            onPressViewNotification,
            changePassword,
            showing: ref(false),
        };
    },
});
</script>

<style scoped></style>
