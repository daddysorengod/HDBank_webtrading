<template>
    <q-option-group v-model="value" :options="options"></q-option-group>
</template>

<script>
import { defineComponent } from "vue";
import CommonStatus from "src/common/statues/common";
import { useField } from "vee-validate";

export default defineComponent({
    name: "StatusRadio",
    props: {
        name: {
            required: true,
            type: String,
        },
    },
    setup(props) {
        const options = CommonStatus.toOptions();

        const { value } = useField(props.name, null, {
            initialValue: CommonStatus.ACTIVE.value,
        });

        return {
            value,
            options,
        };
    },
});
</script>

<style scoped></style>
