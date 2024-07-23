<template>
    <q-card :style="{ width: width, 'min-height': '150px' }">
        <q-card-section>
            <q-skeleton type="rect"></q-skeleton>
        </q-card-section>

        <q-separator />

        <q-skeleton :height="heightContent"></q-skeleton>

        <q-card-actions align="right" class="q-gutter-sm">
            <q-skeleton type="QBtn"></q-skeleton>
            <q-skeleton type="QBtn"></q-skeleton>
        </q-card-actions>
    </q-card>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: "QCCardSkeleton",
    props: {
        width: String,
        heightContent: String,
    },
});
</script>

<style scoped></style>
