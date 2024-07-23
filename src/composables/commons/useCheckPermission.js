import { useAuthStore } from "stores/auth";
import { computed } from "vue";

export default function useCheckPermission({permissionCreate, permissionEdit, permissionDelete, permissionApprove}) {

    const authStore = useAuthStore();

    const hasPermissionCreate = computed(() =>
        permissionCreate &&
        authStore.listPermissions
        && authStore.listPermissions.length
        && authStore.listPermissions.includes(parseInt(permissionCreate)));

    const hasPermissionEdit = computed(() =>
        permissionEdit &&
        authStore.listPermissions
        && authStore.listPermissions.length
        && authStore.listPermissions.includes(parseInt(permissionEdit)));

    const hasPermissionDelete = computed(() =>
        permissionDelete &&
        authStore.listPermissions
        && authStore.listPermissions.length
        && authStore.listPermissions.includes(parseInt(permissionDelete)));

    // const hasPermissionApprove = computed(() =>
    //     permissionApprove &&
    //     authStore.listPermissions
    //     && authStore.listPermissions.length
    //     && authStore.listPermissions.includes(parseInt(permissionApprove)));


    // const hasPermissionCreate = computed(() => true);
    // const hasPermissionEdit = computed(() => true);
    // const hasPermissionDelete = computed(() => true);
    const hasPermissionApprove = computed(() => true);

    return {
        hasPermissionCreate,
        hasPermissionEdit,
        hasPermissionDelete,
        hasPermissionApprove
    };
}
