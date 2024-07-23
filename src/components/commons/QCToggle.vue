<template>
    <div class="qc-toggle" v-if="isShowToggle">
        <span v-if="label" class="qc-toggle--label">{{ label }}</span>
        <q-toggle
            dense
            :val="val"
            :true-value="trueValue"
            v-model="value"
            color="primary"
        />
    </div>
    <div v-else></div>
</template>

<script>
import { defineComponent, computed, watch,ref } from "vue";
import { useField } from "vee-validate";

export default defineComponent({
    name: "QCToggle",
    props: {
        label: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            required: false,
        },
        val: {
            type: [String, Number, Boolean],
            default: false,
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        key: {
            type: [String, Number, Boolean],
            default: null,
        },
        permissionValue: {
            type: [String, Number, Boolean],
            default: null,
        },
    },
    setup(props, { emit }) {
        const { value, errorMessage } = useField(props.name);

        const isShowToggle = ref(false)

        watch(value, () => {
            if (Object.values(value.value).includes(props?.permissionValue)) {
                isShowToggle.value= true
            }else{
                isShowToggle.value= false
            }
        });
        return {
            value,
            errorMessage,
            isShowToggle
        };
    },
});
</script>

<style scoped></style>
