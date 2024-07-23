<template>
    <q-expansion-item
        group="menugroup"
        expand-separator
        :icon="route?.meta?.menu?.icon"
        :label="route?.meta?.menu?.title"
        :content-inset-level="0.5"
        v-if="route?.meta?.menu?.hierarchy"
    >
        <q-list dense>
            <q-item
                :key="child.path"
                v-for="child in route.children"
                clickable
                v-close-popup
                :to="{ name: child.name }"
            >
                <q-item-section avatar>
                    <q-icon :name="child?.meta?.menu?.icon" size="xs" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ child?.meta?.menu?.title }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-expansion-item>

    <q-item v-else clickable tag="a" :to="{ name: route?.name }">
        <q-item-section avatar>
            <q-icon left :name="route?.meta?.menu?.icon" />
        </q-item-section>

        <q-item-section>
            <q-item-label>{{ route?.meta?.menu?.title }}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "ItemVerticalMenu",
    props: {
        route: {
            required: true,
            type: Object,
        },
    },
});
</script>

<style scoped></style>
