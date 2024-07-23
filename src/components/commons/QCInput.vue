<template>
    <template v-if="disabled">
        <q-input
            v-model="value"
            class="q-field-disabled row no-wrap items-start q-field--outlined q-input q-field--with-bottom"
            :placeholder="$t(placeholder)"
            :error="!!errorMessage || !!errorExternal"
            :error-message="errorMessage ? $t(errorMessage) :'' || errorExternal ? $t(errorExternal):''"
            :dense="dense"
            :disable="disabled"
            :mask="mask"
        >
            <template v-slot:append>
                <slot name="append"></slot>
            </template>
        </q-input>
    </template>

    <template v-else>
        <q-input
            v-model="value"
            class="q-field row no-wrap items-start q-field--outlined q-input q-field--with-bottom"
            :placeholder="$t(placeholder)"
            :error="!!errorMessage || !!errorExternal"
            :error-message="errorMessage ? $t(errorMessage) :'' || errorExternal ? $t(errorExternal):''"
            :dense="dense"
            :disable="disabled"
            :mask="mask"
        >
            <template v-slot:append>
                <slot name="append"></slot>
            </template>
        </q-input>
    </template>
</template>

<script>
import { defineComponent, watch } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCInput",
    props: {
        name: {
            required: true,
            type: String,
        },
        dense: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
        errorExternal: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        mask: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const { value, errorMessage } = useField(props.name);

        watch(value, (value) => {
            emit("change", value);
        });

        return {
            value,
            errorMessage,
        };
    },
});
</script>

<style scoped></style>
