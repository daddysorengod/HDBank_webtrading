export default function useFilterRoutes(routes, permissions = []) {
    let filteredRoutes = [];

    let nameRouteHome = "";

    filteredRoutes = routes[0].children.filter((route) => !!route?.meta?.menu);

    filteredRoutes = filteredRoutes.filter(
        (route) =>
            !!permissions.filter((permission) =>
                route.meta.permission.includes(`${permission}`)
            ).length
    );

    filteredRoutes = filteredRoutes.map((route) => {
        if (!route?.children || !route.children.length) return route;

        route.children = route.children.filter(
            (child) =>
                child?.meta?.permission &&
                !!permissions.filter((permission) =>
                    child.meta.permission.includes(`${permission}`)
                ).length
        );

        return route;
    });

    if (filteredRoutes && filteredRoutes.length)
        nameRouteHome = filteredRoutes[0].name;

    return {
        filteredRoutes,
        nameRouteHome,
    };
}
