<template>
    <q-card>
        <q-card-section class="text-bold"> Trạng thái </q-card-section>
        <q-card-section class="q-pt-none">
            <q-option-group
                :model-value="modelValue"
                @update:model-value="$emit('update:modelValue', $event)"
                :options="options"
                v-bind="$attrs"
            ></q-option-group>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "QCStatusFilterCard",
    props: {
        options: Array,
        modelValue: [String, Number, Boolean],
    },
    emits: ["update:modelValue"],
});
</script>

<style scoped></style>
