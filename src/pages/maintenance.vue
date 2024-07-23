<template>
    <div
        class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
    >
        <div>
                <q-icon style="padding-left: 70px;" size="40vh" name="engineering" />
            <div class="text-h4" style="opacity: 0.4">
                {{ $t(dataLocale.maintenanceTitle) }}
            </div>

            <q-btn
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
import { defineComponent,onMounted } from "vue";
import { useRouter } from 'vue-router';
import useFilterRoutes from "src/composables/commons/useFilterRoutes";
import { useAuthStore } from "stores/auth";
import routes from "src/router/routes";

export default defineComponent({
    name: "maintenance",
    setup() {
        const authStore = useAuthStore();

        const { filteredRoutes, nameRouteHome } = useFilterRoutes(routes, authStore.listPermissions);

        const router = useRouter();

        const dataLocale = {
            maintenanceTitle: 'maintenancePage.title',
            maintenanceDes: 'errorPage.forbidden.titleNothing',
            btnGoHome: 'button.goHome',
            btnLogout: 'button.logout'
        }

        const goHome = () => {
            router.push({ name: nameRouteHome })
        }

        const logout = () => {

            authStore.logout();
            router.push({ name: "sso-login" });
        };

        onMounted(async () => {
            console.log("Bao tri --- ")
        });

        return {
            dataLocale,
            goHome,
            nameRouteHome,
            logout
        }
    },
    
});
</script>