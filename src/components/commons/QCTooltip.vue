<template>
    <q-tooltip >
        {{ value }}
    </q-tooltip>
</template>

<script>
import { defineComponent, watch } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCTooltip",
    props: {
        name: {
            required: true,
            type: String,
        },
    },
    
    setup(props, { emit }) {
        const { value } = useField(props.name);
        
        watch(value, (value) => {
            emit("change", value);
        });

        return {
            value,
        };
    },
});
</script>

<style scoped></style>
