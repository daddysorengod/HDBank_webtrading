import routes from "src/router/routes";
import { useAuthStore } from "src/stores/auth";
// const tabs = routes[0].children[4]

//     const permissions = authStore.listPermissions

export default function useFilterTabs(tabs, permissions = []) {
    let filterTabs = [];

    let nameTabsHome = "";

    filterTabs = tabs.children.filter((tab) => tab?.name);

    if (filterTabs && filterTabs.length) {
        nameTabsHome = filterTabs[0].name;
    }

    return {
        filterTabs,
        nameTabsHome,
    };
}
