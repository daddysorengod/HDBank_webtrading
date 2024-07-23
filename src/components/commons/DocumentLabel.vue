<template>
    <div class="inline-block" :class="clazz">
        <div class="vpb-status-label">
            <div class="vpb-status-label--text">{{ documentTitle }}</div>
        </div>
    </div>
</template>

<script>
import CommonDocument from "src/common/statues/commonDocument";
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "DocumentLabel",
    props: {
        document: {
            type: String,
            required: true,
        },
        enumClass: {
            type: String,
            default: "CommonDocument",
        },
    },
    setup(props) {
        let clazzDefined = null;
        let documentTitle = null;

        switch (props.enumClass) {
            case "CommonDocument":
                clazzDefined = {};
                documentTitle = computed(() => {
                    return CommonDocument.getDescription(
                        props?.document ?? ""
                    );
                });

                break;
            default:
                break;
        }
        const clazz = clazzDefined[props.document];

        return {
            documentTitle,
            clazz,
        };
    },
});
</script>

<style scoped></style>
