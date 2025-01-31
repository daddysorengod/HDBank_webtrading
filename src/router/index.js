import { route } from "quasar/wrappers";
import {
    createRouter,
    createMemoryHistory,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { setPageTitle } from "src/common/utils/helper";
import { useAuthStore } from "stores/auth";
import { LocalStorage } from "quasar";
import { getCommonSystem } from "src/middleware/common";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store, ssrContext }) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : process.env.VUE_ROUTER_MODE === "history"
        ? createWebHistory
        : createWebHashHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(
            process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
        ),
    });

    const hasPermission = (route, permissions) => {
        if (!route.meta.permission || !route.meta.permission.length)
            return true;

        return !!permissions.filter((permission) =>
            route.meta.permission.includes(`${permission}`)
        ).length;
    };

    const ignore_list = [
        // "/authentication/sso-login",
        "/authentication/login",
        "/authentication/reset-password",
        "/authentication/change-password",
    ];

    Router.beforeEach(async (to, from, next) => {
        setPageTitle(to.meta?.title);

        const authStore = useAuthStore();

        if (authStore.isAuthenticated()) {
            if (!authStore.user) {
                try {
                    authStore.userData();
                    getCommonSystem();
                    // next();
                } catch (e) {
                    next({ name: "login" });
                    // next({ name: "sso-login" });
                }
            }
            ``;
            const isHasPermission = hasPermission(
                to,
                authStore.listPermissions
            );
            // const isHasPermission = true
            // console.log(from, to.fullPath);

            if (isHasPermission) {
                if (to.name === "login") {
                    // if (to.name === "sso-login") {
                    next({ name: "lookupBalance" });
                } else {
                    getCommonSystem();
                    next();
                }
            } else {
                next({ name: "403" });
            }
        } else {
            if (
                ignore_list.indexOf(to.path) !== -1 ||
                to.path.includes("login") ||
                to.path.includes("sso-login") ||
                to.path.includes("changePassword")
            )
                next();
            else next({ name: "login" });
            // else next({ name: "sso-login" });
        }
    });
    return Router;
});
