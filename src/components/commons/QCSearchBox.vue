<template>
    <q-input
        outlined
        bottom-slots
        dense
        class="q-pb-none"
        placeholder="Tìm kiếm"
        hide-bottom-space
    >
        <template v-slot:append>
            <q-icon name="search" />
        </template>
    </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "QCSearchBox",
});
</script>

<style scoped></style>
