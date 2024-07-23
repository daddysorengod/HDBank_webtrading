<template>
    <template v-if="disabled">
        <q-field
            outlined
            v-model="value"
            class="q-field-disabled row no-wrap items-start q-field--outlined q-input q-field--with-bottom"
            :placeholder="$t(placeholder)"
            :error="!!errorMessage || !!errorExternal"
            :error-message="errorMessage || errorExternal"
            :dense="dense"
            :disable="disabled"
        >
            <template
                v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
            >
                <money3
                    :id="id"
                    :disabled="disabled"
                    class="q-field__input"
                    :model-value="modelValue"
                    @update:model-value="emitValue"
                    v-bind="moneyFormatForComponent"
                    v-show="floatingLabel"
                />
            </template>
        </q-field>
    </template>
    <template v-else>
        <q-field
            outlined
            v-model="value"
            class="q-field row no-wrap items-start q-field--outlined q-input q-field--with-bottom"
            :placeholder="$t(placeholder)"
            :error="!!errorMessage || !!errorExternal"
            :error-message="errorMessage || errorExternal"
            :dense="dense"
            :disable="disabled"
        >
            <template
                v-slot:control="{ id, floatingLabel, modelValue, emitValue }"
            >
                <money3
                    :id="id"
                    :disabled="disabled"
                    class="q-field__input"
                    :model-value="modelValue"
                    @update:model-value="emitValue"
                    v-bind="moneyFormatForComponent"
                    v-show="floatingLabel"
                />
            </template>
        </q-field>
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

        const moneyFormatForComponent = {
            decimal: "",
            thousands: ",",
            prefix: "",
            suffix: "",
            precision: 0,
            min: 0,
            masked: false,
            modelModifiers: {
                number: true,
            },
        };

        return {
            value,
            errorMessage,
            moneyFormatForComponent,
        };
    },
});
</script>

<style scoped></style>
