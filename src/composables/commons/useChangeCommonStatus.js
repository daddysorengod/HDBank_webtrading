import CommonStatus from "src/common/statues/common";
import { computed } from "vue";
import useDialogConfirm from "src/composables/commons/useDialogConfirm";

export default function useChangeCommonStatus(data, target, callback) {
    const label = computed(() =>
        data.value.status === CommonStatus.ACTIVE.value
            ? "Ngừng hoạt động"
            : "Cho phép hoạt động"
    );

    const color = computed(() =>
        data.value.status === CommonStatus.ACTIVE.value ? "negative" : "primary"
    );

    const message = computed(
        () => `Bạn có chắc chắn muốn ${label.value} ${target} này ?`
    );

    const { dialogConfirm: handleChangeStatus } = useDialogConfirm(
        message,
        callback
    );

    return {
        label,
        color,
        handleChangeStatus,
    };
}
