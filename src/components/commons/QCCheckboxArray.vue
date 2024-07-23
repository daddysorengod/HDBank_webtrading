<template>
    <q-checkbox
        dense
        class="qc-checkbox"
        color="primary"
        keep-color
        v-model="value"
        :val="val"
        :true-value="trueValue"
        :label="label"
        :name="name"
        :disable="disabled"
    />
</template>

<script>
import { defineComponent, watch } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCCheckboxArray",
    props: {
        val: {
            type: [String, Number, Boolean],
            default: false,
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: false,
        },
        label: {
            type: [String],
            default: "",
        },
        name: {
            type: String,
            required: false,
        },
        errorMessage: {
            type: String,
            required: false,
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const { value, errorMessage } = useField(props.name);

        return {
            errorMessage,
            value,
        };
    },
});
</script>

<style scoped></style>
