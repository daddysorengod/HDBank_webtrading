<template>
    <q-file
        outlined
        ref="QCFile"
        v-model="inputValue"
        :style="{ width }"
        :error="!!errorMessage"
        :error-message="errorMessage"
    >
        <template v-slot:append>
            <q-btn no-caps color="primary" @click="$refs.QCFile.pickFiles()">
                <q-icon name="download" size="18px"></q-icon>
                {{ placeholder }}
            </q-btn>
        </template>
    </q-file>
</template>

<script>
import { defineComponent, watch, ref, computed } from "vue";
import { getBase64 } from "src/common/utils/helper";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCFileUpload",
    props: {
        width: {
            type: String,
            default: "100%",
        },
        name: {
            type: String,
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit }) {
        const {
            value: inputValue,
            errorMessage,
            handleChange,
        } = useField(props.name);

        watch(inputValue, (val) => {
            emit("change", val);
        });

        return {
            inputValue,
            errorMessage,
            handleChange,
        };
    },
});
</script>

<style scoped></style>
