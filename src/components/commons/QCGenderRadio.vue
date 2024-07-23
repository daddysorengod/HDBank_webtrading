<template>
    <q-option-group
        v-model="value"
        class="q-custom-option-group"
        :options="options"
    ></q-option-group>
</template>

<script>
import { defineComponent } from "vue";
import { useField } from "vee-validate";
import GenderType from "src/common/types/gender";

export default defineComponent({
    name: "QCGenderRadio",
    props: {
        name: {
            default: "gender",
            type: String,
        },
    },
    setup(props) {
        const options = GenderType.toOptions();

        const { value } = useField(props.name, undefined, {
            initialValue: GenderType.MALE.value,
        });

        return {
            value,
            options,
        };
    },
});
</script>

<style scoped></style>
