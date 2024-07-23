import { useQuasar } from "quasar";

export default function useDialogConfirm(message, callback) {
    const $q = useQuasar();

    const dialogConfirm = () => {
        $q.dialog({
            title: "Xác nhận",
            message: typeof message === "string" ? message : message.value,
            persistent: true,
            ok: {
                label: "Đồng ý",
                dense: true,
                noCaps: true,
                color: "negative",
            },
            cancel: {
                label: "Hủy",
                dense: true,
                noCaps: true,
                color: "secondary",
            },
        }).onOk(callback);
    };

    return { dialogConfirm };
}
