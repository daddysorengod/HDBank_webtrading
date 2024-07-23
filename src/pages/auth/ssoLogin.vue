<template>
    <div class="q-pa-md"></div>
</template>

<script>
import AuthWrapper from "src/components/auth/AuthWrapper.vue";
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { notifyFail } from "src/common/utils/helper";
import { MAJOR_CODE, SUCCESS_CODE } from "src/common/constant";
import useFilterRoutes from "src/composables/commons/useFilterRoutes";
import routes from "src/router/routes";
import BaseModal from "src/components/transaction/BaseModal.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import { useQuasar } from "quasar";
import { onBeforeUnmount, onMounted } from "vue";

export default {
    components: { AuthWrapper },
    name: "Login",
    setup() {
        const { t } = useI18n();

        const authStore = useAuthStore();

        const router = useRouter();

        let timer;
        const $q = useQuasar();

        $q.loading.show({
            delay: 400, // ms
            spinnerColor: "green",
            backgroundColor: "white",
            spinnerSize: 140,
        });

        onBeforeUnmount(() => {
            if (timer !== void 0) {
                clearTimeout(timer);
                $q.loading.hide();
            }
        });

        onMounted(async () => {
            const $q = useQuasar();

            $q.loading.show({
                delay: 400, // ms
                spinnerColor: "green",
                backgroundColor: "white",
                spinnerSize: 140,
            });
            setTimeout(async () => {
                try {
                    const { HANDSHAKE_VAL } =
                        router.currentRoute.value.query ?? "";
                    // const href = router.currentRoute.value.href;
                    // const HANDSHAKE_VAL = href.replace(
                    //     "/authentication/sso-login?HANDSHAKE_VAL=",
                    //     ""
                    // );
                    if (!HANDSHAKE_VAL){
                        return
                    }
                    const data = await authStore.ssoLogin({
                        _token: encodeURIComponent(HANDSHAKE_VAL),
                    });
                    // const code = HANDSHAKE_VAL;
                    // // console.log(1111, router.currentRoute.value.href);
                    // console.log("code", code);
                    // const encode = encodeURIComponent(code);
                    // const decode = decodeURIComponent(encode);
                    // console.log("encode", encode);
                    // console.log("decode", decode.toString());
                    if (data.Code === SUCCESS_CODE) {
                        $q.loading.hide();
                        const { filteredRoutes, nameRouteHome } =
                            useFilterRoutes(routes, authStore.listPermissions);
                        if (filteredRoutes && filteredRoutes.length)
                            router.push({
                                name: nameRouteHome || "approve-transaction",
                            });
                        else router.push({ name: "403" });
                    } else if (data.Code === MAJOR_CODE) {
                        this.errorExternal = data.Message;
                    } else {
                        notifyFail(data.Message || t("system.messageTryAgain"));
                    }
                } catch (e) {
                    console.log(e);
                    notifyFail(t("system.messageTryAgain"));
                }
            }, 500);
        });
        return {};
    },
};
</script>
