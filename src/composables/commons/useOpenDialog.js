import { useQuasar } from "quasar";
import QCAvatarUpload from "components/commons/QCAvatarUpload";

export default function useOpenDialog(component) {
    const $q = useQuasar();

    return {
        openDialog: (props) => {
            $q.dialog({
                component,
                componentProps: props,
            });
        },
    };
}
