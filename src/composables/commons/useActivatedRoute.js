import { computed } from "vue";
import { useRoute } from "vue-router";

export default function useActivatedRoute(route) {
    const currentRoute = useRoute();
    const activated = computed(() => {
        if (route?.meta?.menu?.hierarchy)
            return route.children.some(
                (child) => child.name === currentRoute.name
            );
        else return route.children[0].name === currentRoute.name;
    });

    return {
        activated,
    };
}
