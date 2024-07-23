<template>
    <div class="inline-block" :class="clazz">
        <div class="vpb-status-label">
            <div class="vpb-status-label--text">{{ roleTitle }}</div>
        </div>
    </div>
</template>

<script>
import CommonRole from "src/common/statues/commomRole";
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "RoleLabel",
    props: {
        role: {
            type: String,
            required: true,
        },
        enumClass: {
            type: String,
            default: "CommonRole",
        },
    },
    setup(props) {
        let clazzDefined = null;
        let roleTitle = null;

        switch (props.enumClass) {
            case "CommonRole":
                clazzDefined = {};
                roleTitle = computed(() => {
                    return CommonRole.getDescription(
                        props?.role?.charAt(0) ?? ""
                    );
                });

                break;
            default:
                break;
        }
        const clazz = clazzDefined[props.status];

        return {
            roleTitle,
            clazz,
        };
    },
});
</script>

<style scoped></style>
