<template>
    <div class="inline-block">
        <div :class="clazz">
            <div class="vpb-status-label--text">{{ $t(typeTitle) }}</div>
        </div>
    </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import StatementType from "src/common/types/statement";
import RoleType from "src/common/types/role";

export default defineComponent({
    name: "TypeLabel",
    props: {
        type: {
            type: [String, Number],
            required: true,
        },
        enumClass: {
            type: String,
            required: true
        },
    },
    setup(props) {
        let clazzDefined = null;
        let typeTitle = null;

        switch (props.enumClass) {
            case "StatementType":
                clazzDefined = {
                    [StatementType.BUY.value]:
                        "text-primary",
                    [StatementType.SELL.value]:
                        "text-negative",
                };

                typeTitle = computed(() => {
                    return StatementType.getDescription(props.type);
                });
                break;
            case "RoleType":
                clazzDefined = {
                    [RoleType.ADMIN.value]:
                        "",
                    [RoleType.MAJOR.value]:
                        "",
                };

                typeTitle = computed(() => {
                    return RoleType.getDescription(props.type);
                });
                break;
            default:
                break;
        }

        const clazz = clazzDefined[props.type];

        return {
            typeTitle,
            clazz,
        };
    },
});
</script>

<style scoped></style>
