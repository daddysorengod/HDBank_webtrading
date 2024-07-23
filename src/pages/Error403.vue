<template>
    <div
        class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
    >
        <div>
            <div style="font-size: 30vh">403</div>

            <div class="text-h4" style="opacity: 0.4">
                <template v-if="nameRouteHome">{{ $t(dataLocale.forbidden) }}</template>
                <template v-else>{{ $t(dataLocale.forbiddenNothing) }}</template>
            </div>

            <q-btn
                v-if="nameRouteHome"
                class="q-mt-xl"
                color="white"
                text-color="blue"
                unelevated
                :label="$t(dataLocale.btnGoHome)"
                no-caps
                @click="goHome"
            />
            <q-btn
                v-else
                class="q-mt-xl"
                color="white"
                text-color="blue"
                unelevated
                :label="$t(dataLocale.btnLogout)"
                no-caps
                @click="logout"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';
import useFilterRoutes from "src/composables/commons/useFilterRoutes";
import { useAuthStore } from "stores/auth";
import routes from "src/router/routes";

export default defineComponent({
    name: "Error403",
    setup() {
        const authStore = useAuthStore();

        const { filteredRoutes, nameRouteHome } = useFilterRoutes(routes, authStore.listPermissions);

        const router = useRouter();

        const dataLocale = {
            forbidden: 'errorPage.forbidden.title',
            forbiddenNothing: 'errorPage.forbidden.titleNothing',
            btnGoHome: 'button.goHome',
            btnLogout: 'button.logout'
        }

        const goHome = () => {
            router.push({ name: nameRouteHome })
        }

        const logout = () => {

            authStore.logout();

            // router.push({ name: "login" });
            router.push({ name: "sso-login" });
        };

        return {
            dataLocale,
            goHome,
            nameRouteHome,
            logout
        }
    }
});
</script>