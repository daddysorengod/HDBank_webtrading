<template>
    <div class="inline-block">
        <div class="vpb-status-label" :class="clazz">
            <q-icon size="6px" name="circle" />
            <div class="vpb-status-label--text">{{ $t(statusTitle) }}</div>
        </div>
    </div>
</template>

<script>
import CommonStatus from "src/common/statues/common";
import OwnerPermissionStatus from "src/common/statues/owner-permission";
import { defineComponent, computed } from "vue";
import LookupStatementStatus from "src/common/statues/lookupStatement";
import LookupOwnerPermissionStatus from "src/common/statues/lookupOwnerPermission";

export default defineComponent({
    name: "StatusLabel",
    props: {
        status: {
            type: [String, Number],
            required: true,
        },
        enumClass: {
            type: String,
            default: "CommonStatus",
        },
    },
    setup(props) {
        let clazzDefined = null;
        let statusTitle = null;

        switch (props.enumClass) {
            case "OwnerPermissionStatus":
                clazzDefined = {
                    [OwnerPermissionStatus.CLOSED.value]:
                        "vpb-status-label--closed",
                    [OwnerPermissionStatus.SHARED.value]:
                        "vpb-status-label--shared",
                };

                statusTitle = computed(() => {
                    return OwnerPermissionStatus.getDescription(props.status);
                });
                break;
            case "CommonStatus":
                clazzDefined = {
                    [CommonStatus.WAITING.value]: "vpb-status-label--waiting",
                    [CommonStatus.REJECT.value]: "vpb-status-label--reject",
                    [CommonStatus.APPROVED.value]: "vpb-status-label--approved",
                };

                statusTitle = computed(() => {
                    return CommonStatus.getDescription(props.status);
                });

                break;
            case "LookupStatementStatus":
                clazzDefined = {
                    [LookupStatementStatus.WAITING.value]: "vpb-status-label--waiting",
                    [LookupStatementStatus.REJECT.value]: "vpb-status-label--reject",
                    [LookupStatementStatus.APPROVED.value]: "vpb-status-label--approved",
                    [LookupStatementStatus.WAITING_CONFIRM.value]: "vpb-status-label--waiting",
                    [LookupStatementStatus.WAITING_ACTION.value]: "vpb-status-label--waiting",
                    [LookupStatementStatus.MATCHING.value]: "vpb-status-label--waiting",
                    [LookupStatementStatus.MATCHING_ALL.value]: "vpb-status-label--approved",
                    [LookupStatementStatus.CANCEL.value]: "vpb-status-label--reject",
                    [LookupStatementStatus.PAY.value]: "vpb-status-label--approved",
                    [LookupStatementStatus.EXPIRE.value]: "vpb-status-label--reject",
                };

                statusTitle = computed(() => {
                    return LookupStatementStatus.getDescription(props.status);
                });

                break;
            case "LookupOwnerPermissionStatus":
                clazzDefined = {
                    [LookupOwnerPermissionStatus.WAITING.value]: "vpb-status-label--waiting",
                    [LookupOwnerPermissionStatus.APPROVED.value]: "vpb-status-label--approved",
                    [LookupOwnerPermissionStatus.REPORTED.value]: "vpb-status-label--approved",
                    [LookupOwnerPermissionStatus.RIGHT_ALLOCATED.value]: "vpb-status-label--shared",
                    [LookupOwnerPermissionStatus.RIGHT_REPORTED.value]: "vpb-status-label--approved",
                    [LookupOwnerPermissionStatus.DONE.value]: "vpb-status-label--approved",
                    [LookupOwnerPermissionStatus.ALLOCATION_PENDING.value]: "vpb-status-label--waiting",
                    [LookupOwnerPermissionStatus.COMPLETED.value]: "vpb-status-label--approved",
                    [LookupOwnerPermissionStatus.REJECT.value]: "vpb-status-label--reject",
                    [LookupOwnerPermissionStatus.WAITING_STOCK.value]: "vpb-status-label--waiting",
                    [LookupOwnerPermissionStatus.APPROVED_STOCK.value]: "vpb-status-label--approved",
                };

                statusTitle = computed(() => {
                    return LookupOwnerPermissionStatus.getDescription(props.status);
                });

                break;
            default:
                break;
        }

        const clazz = clazzDefined[props.status];

        return {
            statusTitle,
            clazz,
        };
    },
});
</script>

<style scoped></style>
