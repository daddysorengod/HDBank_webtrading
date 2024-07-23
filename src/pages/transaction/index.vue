<template>
    <router-view></router-view>
</template>

<script>
import useFilterTabs from "src/composables/commons/useFilterTabs";
import routes from "src/router/routes";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

export default {
    name: "transaction",

    setup() {
        const authStore = useAuthStore();

        const router = useRouter();

        const { filterTabs, nameTabsHome } = useFilterTabs(
            routes[0].children[4],
            authStore.listPermissions
        );

        if (filterTabs && filterTabs.length) {
            router.replace({
                name: nameTabsHome || "orderTransaction",
            });
        } else router.push({ name: "403" });
    },
};
</script>
