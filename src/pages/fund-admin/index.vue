<template>
    <router-view></router-view>
</template>

<script>
import useFilterTabs from "src/composables/commons/useFilterTabs";
import routes from "src/router/routes";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

export default {
    name: "fund-admin",

    setup() {
        const authStore = useAuthStore();

        const router = useRouter();

        const { filterTabs, nameTabsHome } = useFilterTabs(
            routes[0].children[6],
            authStore.listPermissions
        );

        if (filterTabs && filterTabs.length) {
            router.replace({
                name: nameTabsHome || "fundAdminImport",
            });
        } else router.push({ name: "403" });
    },
};
</script>
