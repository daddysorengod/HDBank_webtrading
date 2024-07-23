<template>
    <template v-if="!disabled">
        <q-select
            class="qc-select"
            v-model="value"
            outlined
            :options="realOptions"
            :error="!!errorMessage || !!errorExternal"
            :error-message="errorMessage || errorExternal"
            :dense="dense"
            :disable="disabled"
            emit-value
            :map-options="mapOptions"
            :use-input="useInput"
            @filter="filterFn"
            :label="$t(placeholder)"
        />
    </template>

    <template v-else>
        <q-select
            class="qc-select-disabled"
            v-model="value"
            outlined
            :options="realOptions"
            :error="!!errorMessage || !!errorExternal"
            :error-message="errorMessage || errorExternal"
            :dense="dense"
            :disable="disabled"
            emit-value
            :map-options="mapOptions"
            :use-input="useInput"
            @filter="filterFn"
            :label="$t(placeholder)"
        />
    </template>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCSelect",
    props: {
        name: {
            required: true,
            type: String,
        },
        dense: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
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
        mapOptions: {
            type: Boolean,
            default: false,
        },
        useInput: {
            type: Boolean,
            default: false,
        },
        enableInputValue: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const { value, errorMessage } = useField(props.name);

        const realOptions = ref(props.options);

        watch(value, (value) => {
            emit("change", value);
        });

        const filterFn = (val, update) => {
            if (props.enableInputValue) {
                if (!val) return;
                update(() => {
                    realOptions.value = [val];
                });
                return;
            }

            if (val === "") {
                update(() => {
                    realOptions.value = props.options;
                });
                return;
            }

            update(() => {
                const needle = val.toLowerCase();
                realOptions.value = props.options.filter(
                    (v, i) =>
                        i !== 0 &&
                        (v.label.toLowerCase().indexOf(needle) > -1 ||
                            v.value.toLowerCase().indexOf(needle) > -1 ||
                            (v.subLabel &&
                                v.subLabel.toLowerCase().indexOf(needle) > -1))
                );
            });
        };

        return {
            value,
            errorMessage,
            filterFn,
            realOptions,
        };
    },
});
</script>

<style scoped></style>
