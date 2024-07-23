<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated class="bg-white">
            <q-toolbar class="header-top">
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    color="grey-9"
                    class="lt-md"
                    @click="toggleLeftDrawer"
                />

                <Logo />

                <q-tabs
                    v-model="nameRouteActive"
                    class="qc-tab header-menu"
                    no-caps
                    narrow-indicator
                    active-color="primary"
                >
                    <q-route-tab
                        :to="{ name: route.name }"
                        class="text-dark-gray"
                        :key="route.path"
                        v-for="route in filteredRoutes"
                        :name="route.name"
                        :label="$t(route?.meta?.menu?.title)"
                    />
                </q-tabs>

                <q-space />

                <multiple-language />

                <UserBox />
            </q-toolbar>

            <q-toolbar class="header-page-title gt-sm">
                <img
                    :src="routeActive?.meta?.menu?.icon"
                    alt="Icon Page Title"
                />

                <span class="header-page-title--text">
                    {{ $t(routeActive?.meta?.menu?.title) }}
                </span>

                <q-space />

                <img
                    srcSet="images/vp-image-page-title.png 2x"
                    alt="Background Page Title"
                />
            </q-toolbar>

            <q-separator />

            <q-toolbar
                v-if="routeChildren && routeChildren.length"
                class="header-bottom"
            >
                <q-tabs
                    v-model="nameRouteChildActive"
                    class="qc-tab-sub"
                    no-caps
                    active-color="primary"
                >
                    <q-route-tab
                        :to="{ name: route.name }"
                        class="text-dark-gray"
                        :key="route.path"
                        v-for="route in routeChildren"
                        :name="route.name"
                        :label="$t(route?.meta?.menu?.title)"
                    />
                </q-tabs>
            </q-toolbar>
        </q-header>

        <!-- <q-drawer
            class="side-menu"
            behavior="mobile"
            v-model="leftDrawerOpen"
            show-if-above
            bordered
        >
            <q-list>
                <q-item-label header> VPBANK</q-item-label>

                <ItemVerticalMenu
                    :key="route.path"
                    v-for="route in filteredRoutes"
                    :route="route"
                />
            </q-list>
        </q-drawer> -->

        <q-page-container>
            <q-page padding>
                <router-view />
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import Notify from "components/layouts/Notify";
import UserBox from "components/layouts/UserBox";
import Logo from "components/layouts/Logo";
import ItemHorizonMenu from "components/layouts/ItemHorizonMenu";
import ItemVerticalMenu from "components/layouts/ItemVerticalMenu";
import useFilterRoutes from "src/composables/commons/useFilterRoutes";
import routes from "src/router/routes";
import MultipleLanguage from "components/layouts/MultipleLanguage";
import { useAuthStore } from "stores/auth";

export default defineComponent({
    name: "MainLayout",

    components: {
        MultipleLanguage,
        ItemVerticalMenu,
        ItemHorizonMenu,
        Logo,
        UserBox,
        Notify,
    },

    setup() {
        const routeActive = useRoute();

        const authStore = useAuthStore();

        const leftDrawerOpen = ref(false);

        const { filteredRoutes } = useFilterRoutes(
            routes,
            authStore.listPermissions
        );

        const nameRouteActive = ref("");
        const nameRouteChildActive = ref("");
        const routeChildren = ref([]);

        if (routeActive.meta.parent) {
            nameRouteActive.value = routeActive.name;
        } else {
            nameRouteChildActive.value = routeActive.name;
        }

        watch(nameRouteActive, () => {
            routeChildren.value = filteredRoutes.find(
                (item) => item.name === nameRouteActive.value
            )?.children;
        });

        onMounted(() => {
            const { filteredRoutes } = useFilterRoutes(
                routes,
                authStore.listPermissions
            );
            routeChildren.value = filteredRoutes.find(
                (item) => item.name === nameRouteActive.value
            )?.children;
        });

        return {
            leftDrawerOpen,
            filteredRoutes,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
            nameRouteActive,
            nameRouteChildActive,
            routeActive,
            routeChildren,
        };
    },
});
</script>
