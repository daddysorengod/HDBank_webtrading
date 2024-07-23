<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="1000px"
            height-content="500px"
        ></QcCardSkeleton>

        <q-card style="width: 1000px; max-width: 80vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ $t(dataLocale.title) }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row q-col-gutter-lg items-center">
                    <div class="col-6">
                        <div class="vpb-form-group">
                            <QcLabel :label="dataLocale.form.roleName.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="roleName"
                                :placeholder="dataLocale.form.roleName.label"
                            />
                        </div>
                    </div>
                    <div
                        :key="`role_type_${i}`"
                        v-for="(roleType, i) in roleTypes"
                        class="col-3 flex justify-between"
                    >
                        <QcCheckboxArray
                            :val="roleType.value"
                            :true-value="roleType.value"
                            :label="$t(roleType.label)"
                            name="roleType"
                        />
                    </div>
                </div>

                <h4 class="vpb-title-in-form">
                    I. {{ $t(dataLocale.chooseTitle) }}
                </h4>

                <div class="row q-col-gutter-lg justify-between">
                    <div
                        :key="`permission_${groupLookup.value}`"
                        v-for="(groupLookup, i) in groupPermissions.groupLookup"
                        class="col-3"
                    >
                        <QcCheckboxArray
                            :val="groupLookup.value"
                            :true-value="groupLookup.value"
                            :label="$t(groupLookup.label)"
                            name="permissions"
                        />
                    </div>
                </div>

                <q-card flat bordered class="vpb-role--list">
                    <q-card-section class="vpb-role--list__title">
                        {{ $t("menu.manage") }}
                    </q-card-section>

                    <q-card-section
                        :key="`permission_${groupManage.value}`"
                        v-for="(groupManage, i) in groupPermissions.groupManage"
                        class="row vpb-role--item"
                    >
                        <div class="col-6 flex items-center">
                            <QcCheckboxArray
                                :val="groupManage.value"
                                :true-value="[groupManage.value]"
                                :label="$t(groupManage.label)"
                                name="permissions"
                            />
                        </div>
                        <!-- :true-value="[groupManage.value]" -->

                        <div class="col-6 flex items-center justify-between">
                            <QcToggle
                                :key="`action_permission_${permission.value}`"
                                :permissionValue="groupManage.value"
                                v-for="(
                                    permission, i
                                ) in groupManage.permissions"
                                name="permissions"
                                :val="permission.value"
                                :true-value="permission.value"
                                :label="$t(permission.label)"
                            />
                        </div>

                        <!-- :true-value="permission.value" -->
                    </q-card-section>
                </q-card>

                <q-card flat bordered class="vpb-role--list">
                    <q-card-section class="vpb-role--list__title">
                        {{ $t("menu.transaction") }}
                    </q-card-section>

                    <q-card-section
                        :key="`permission_${groupTransaction.value}`"
                        v-for="(
                            groupTransaction, i
                        ) in groupPermissions.groupTransaction"
                        class="row vpb-role--item"
                    >
                        <div class="col-6 flex items-center">
                            <QcCheckboxArray
                                :val="groupTransaction.value"
                                :true-value="groupTransaction.value"
                                :label="$t(groupTransaction.label)"
                                name="permissions"
                            />
                        </div>

                        <div class="col-6 flex items-center justify-between">
                            <QcToggle
                                :key="`action_permission_${permission.value}`"
                                v-for="(
                                    permission, i
                                ) in groupTransaction.permissions"
                                name="permissions"
                                :val="permission.value"
                                :true-value="permission.value"
                                :label="$t(permission.label)"
                                :permissionValue="groupTransaction.value"
                            />
                        </div>
                    </q-card-section>
                </q-card>
            </q-card-section>

            <q-card-actions v-if="action === 'create' || action === 'update'">
                <q-btn
                    padding="12px 31.5px"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onSubmit"
                    :loading="isSubmitting"
                    >{{
                        action === "create"
                            ? $t(dataLocale.form.btnConfirm)
                            : $t(dataLocale.form.btnSave)
                    }}
                </q-btn>
            </q-card-actions>
            <q-card-actions
                class="qc-card-actions--end"
                v-else-if="action === 'delete'"
            >
                <q-btn
                    padding="12px 31.5px"
                    no-caps
                    color="negative"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onDelete"
                    :loading="isSubmitting"
                    >{{ $t(dataLocale.form.btnDelete) }}
                </q-btn>
            </q-card-actions>
            <q-card-actions
                v-else-if="action === 'approve'"
                class="qc-card-actions--center"
            >
                <q-btn
                    padding="12px 31.5px"
                    icon="close"
                    no-caps
                    color="negative"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onPressReject"
                    :loading="isSubmitting"
                    >{{ $t(dataLocale.form.btnReject) }}
                </q-btn>
                <q-btn
                    padding="12px 31.5px"
                    icon="check"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onPressApprove"
                    :loading="isSubmitting"
                    >{{ $t(dataLocale.form.btnApprove) }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, computed, onBeforeMount, ref, onMounted } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import RoleType from "src/common/types/role";
import { groupPermissions } from "src/roles/group-role";
import {
    mapPremissionApproveReject,
    mapRoleToDetail,
} from "src/roles/permission";
import { useRouter } from "vue-router";
import { useRole } from "src/stores/role";
import { SUCCESS_CODE, UNAUTHORIZED_CODE } from "src/common/constant";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";

export default defineComponent({
    name: "RoleForm",
    props: {
        id: Number,
        action: {
            type: String,
            default: "create",
            validator(value) {
                return ["create", "update", "detail", "approve"].includes(
                    value
                );
            },
        },
        data: {
            tranid: Number,
        },
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const titleByAction = {
            create: t("title.addRole"),
            detail: t("title.detail"),
            update: t("title.update"),
            delete: t("title.delete"),
            approve: t("title.approve"),
        };

        const router = useRouter();

        const roleStore = useRole();

        const dataLocale = {
            title: titleByAction[props.action],
            chooseTitle: ("role.roleChooseTitle"),
            form: {
                roleName: {
                    label: ("field.roleName.label"),
                    placeholder: ("field.roleName.placeholder"),
                },
                autoApprove: {
                    label: ("field.autoApprove.label"),
                    placeholder: ("field.autoApprove.placeholder"),
                },
                roleType: {
                    label: ("field.roleType.label"),
                    placeholder: ("field.roleType.placeholder"),
                },
                btnConfirm: ("button.confirm"),
                btnSave: ("button.save"),
                btnDelete: ("button.delete"),
                btnReject: ("button.reject"),
                btnApprove: ("button.approve"),
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(props.action);
        });

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const permissions = ref([]);

        onMounted(async () => {
            if (props.action === "create") {
                return;
            }
            if (
                props.action === "detail" ||
                props.action === "delete" ||
                props.action === update
            ) {
                const detailRoleById = await roleStore.getDetailRoleById({
                    tranid: props?.data?.tranid,
                });
                setFieldValue(
                    "roleName",

                    roleStore?.currentGroupName
                );

                if (detailRoleById && Array.isArray(detailRoleById)) {
                    permissions.value = detailRoleById;
                } else permissions.value = [];

                setFieldValue("permissions", detailRoleById);
                setFieldValue("roleType", roleStore?.currentGroupType);
            } else if (props.action === "") {
                const detailRoleById = await roleStore.getDetailRoleApproveById(
                    {
                        tranid: props?.data?.tranid,
                    }
                );
                setFieldValue(
                    "roleName",

                    roleStore?.currentGroupName
                );

                if (detailRoleById && Array.isArray(detailRoleById)) {
                    permissions.value = detailRoleById;
                } else permissions.value = [];

                setFieldValue("permissions", detailRoleById);
                setFieldValue("roleType", roleStore?.currentGroupType);
            }
        });

        const yupObject = ref({
            roleName: yup
                .string()
                .required(
                    `${dataLocale.form.roleName.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.roleName.label),
            roleType: yup
                .array()
                .nullable()
                .label(dataLocale.form.roleType.label),
            permissions: yup
                .array()
                .nullable()
                .label(dataLocale.form.roleType.label),
        });

        const schema = yup.object(yupObject.value);

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            setFieldValue,
            values: valForm,
        } = useForm({
            validationSchema: schema,
            initialValues: {
                roleType: [],
                permissions: [],
            },
        });

        const onSubmit = handleSubmit(async (values) => {
            if (props?.action === "create") {
                const role = defineRoleType(values?.roleType);

                const permissions = defineRolePermissions(values?.permissions);

                const ipv4 = await publicIpv4();

                if (!role || !permissions || !ipv4) {
                    return;
                }

                const params = {
                    Name: values?.roleName,
                    Name_En: values?.roleName,
                    Note: "",
                    Ips: ipv4 ? ipv4 : "",
                    strLstFunction: permissions,
                    GROUP_TYPE: role,
                };

                const createGroupRole = await roleStore?.addGroupFunction(
                    params
                );

                if (createGroupRole === UNAUTHORIZED_CODE) {
                    // router.push({ name: "login" });
                    router.push({ name: "sso-login" });
                    return;
                }

                if (createGroupRole === SUCCESS_CODE) {
                    onDialogCancel();
                } else {
                    return;
                }
            } else if (props?.action === "update") {
                const role = defineRoleType(values?.roleType);

                const permissions = defineRolePermissions(values?.permissions);

                const ipv4 = await publicIpv4();

                const idGroupFunction = props?.id;

                console.log(ipv4, permissions, role);

                if (!idGroupFunction || !permissions || !ipv4 || !role) {
                    return;
                }

                const params = {
                    Name: values?.roleName,
                    Name_En: values?.roleName,
                    Note: "",
                    Ips: ipv4 ? ipv4 : "",
                    strLstFunction: permissions,
                    Id: idGroupFunction,
                    GROUP_TYPE: role,
                };

                const repairGroupRole = await roleStore?.repairGroupFunction(
                    params
                );

                if (repairGroupRole === UNAUTHORIZED_CODE) {
                    // router.push({ name: "login" });
                    router.push({ name: "sso-login" });
                    return;
                }

                if (repairGroupRole === SUCCESS_CODE) {
                    onDialogCancel();
                } else {
                    return;
                }
            }
        });

        const defineRoleType = (roles) => {
            return roles[0] ?? "";
        };

        const defineRolePermissions = (permissions) => {
            // const listPermission = permissions?.filter(
            //     (item) => typeof item === "number"
            // );

            const currentPermission = permissions?.filter(
                (item) => typeof item === "string"
            );

            const tempListPermission = [1000, 1001, 1002, 1003, 1017];

            currentPermission.map((item) => {
                tempListPermission.push(...mapRoleToDetail[item]);
            });

            const intersection = permissions.filter((element) =>
                Object.keys(mapPremissionApproveReject).includes(
                    element.toString()
                )
            );

            const listPermission = permissions?.filter((item) =>
                tempListPermission.includes(item)
            );

            intersection.forEach((item) => {
                listPermission.push(
                    mapPremissionApproveReject[item.toString()]
                );
            });

            return listPermission.toString();
        };

        const onChangeGroupName = async (val) => {
            if (!val || roleStore?.currentGroupListFunctions) {
                return;
            }
            console.log(roleStore?.currentGroupListFunctions);
        };

        const onDelete = async () => {
            const groupRoleDoDelete = await roleStore?.deleteGroupRole(
                props?.id
            );

            if (groupRoleDoDelete === UNAUTHORIZED_CODE) {
                // router.push({ name: "login" });
                router.push({ name: "sso-login" });
                return;
            }

            if (groupRoleDoDelete === SUCCESS_CODE) {
                onDialogCancel();
            }

            onDialogCancel();
        };

        const onPressApprove = async () => {
            if (props?.action !== "approve") {
                return;
            }

            const approveGroup = await roleStore?.approveGroupFunction({
                id: props?.id,
                tranid: props?.data?.tranid,
            });

            if (approveGroup === UNAUTHORIZED_CODE) {
                // router.push({ name: "login" });
                router.push({ name: "sso-login" });
                return;
            }

            if (approveGroup === SUCCESS_CODE) {
                onDialogCancel();
            }

            onDialogCancel();
        };

        const onPressReject = async () => {
            if (props?.action !== "approve") {
                return;
            }

            const rejectGroup = await roleStore?.rejectGroupFunction({
                tranid: props?.data?.tranid,
            });

            if (rejectGroup === UNAUTHORIZED_CODE) {
                // router.push({ name: "login" });
                router.push({ name: "sso-login" });
                return;
            }

            if (rejectGroup === SUCCESS_CODE) {
                onDialogCancel();
            }

            onDialogCancel();
        };

        const onChangeRoleType = () => {
            // setFieldValue()
            console.log(valForm);
        };

        const valueToggle = ref(false);

        const roleTypes = RoleType.toOptions();

        return {
            dialogRef,
            isSubmitting,
            skeleton,
            onSubmit,
            valForm,
            dataLocale,
            dataForm,
            inputDisabled,
            autoApprove,
            onDelete,
            valueToggle,
            roleTypes,
            // testCheckbox,
            permissions,
            groupPermissions,
            roleStore,
            onChangeRoleType,
            onPressApprove,
            onPressReject,
        };
    },
});
</script>
<style scoped></style>
