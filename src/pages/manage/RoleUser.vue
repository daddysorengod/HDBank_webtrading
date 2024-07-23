<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.roleName.label" />
                <QcInput
                    outlined
                    name="roleName"
                    :placeholder="dataLocale.form.roleName.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.roleType.label" />
                <QcSelect
                    :placeholder="dataLocale.form.roleType.placeholder"
                    name="roleType"
                    :options="roleTypeOptions"
                    map-options
                />
            </div>

            <div class="vpb-filter-group vpb-filter-group--btn">
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn full-width"
                    unelevated
                    @click="onSubmit"
                    >{{ dataLocale.form.btnSearch }}</q-btn
                >
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onReset"
                    >{{ dataLocale.form.btnReset }}</q-btn
                >
            </div>
        </div>

        <div class="vpb-page-content">
            <q-table
                class="qc-table"
                v-model:pagination="roleUserStore.meta"
                :rows="roleUserStore.listRoles"
                :columns="columns"
                :visible-columns="visibleColumns"
                :rows-per-page-options="[]"
                row-key="id"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span class="qc-table-top--title"
                        >{{ roleUserStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
                </template>

                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            {{ col.label }}
                        </q-th>
                        <q-th key="approve">
                            {{ dataLocale.table.colApprove }}
                        </q-th>
                        <q-th key="action">
                            {{ dataLocale.table.colAction }}
                        </q-th>
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            <template v-if="col.name === 'status'">
                                <status-label
                                    :status="col.value"
                                    :key="col.value"
                                />
                            </template>
                            <template v-else-if="col.name === 'roleType'">
                                <type-label
                                    :type="col.value"
                                    :key="col.value"
                                    enum-class="RoleType"
                                />
                            </template>
                            <template v-else>
                                {{ col.value }}
                            </template>
                        </q-td>

                        <q-td align="right" auto-width>
                            <q-btn
                                no-caps
                                flat
                                size="md"
                                color="yellow"
                                @click="approveAction(props.row)"
                            >
                                {{ dataLocale.table.listApproveWaiting }}
                            </q-btn>
                        </q-td>

                        <q-td auto-width>
                            <q-btn
                                flat
                                size="sm"
                                round
                                @click="detailAction(props.row)"
                            >
                                <img src="/icons/vp-eye.svg" />
                            </q-btn>
                            <q-btn
                                flat
                                size="sm"
                                round
                                @click="updateAction(props.row)"
                            >
                                <img src="/icons/vp-pencil.svg" />
                            </q-btn>
                            <q-btn
                                flat
                                size="sm"
                                round
                                @click="decentAction(props.row)"
                            >
                                <img src="/icons/vp-add-user.svg" />
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>
                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="roleUserStore.meta.rowsPerPage"
                        :currentPage="roleUserStore.meta.currentPage"
                        :lastPage="roleUserStore.meta.lastPage"
                        :total="roleUserStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import ApproveWaiting from "components/manage/role-user/ApproveWaiting";
import DetailRoleUser from "components/manage/role-user/DetailRoleUser";
import RoleUserForm from "components/manage/RoleUserForm";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useRoleUserStore } from "stores/roleUser";
import { useForm } from "vee-validate";
import { ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import { getMeta, metaToParams } from "src/common/utils/helper";

export default defineComponent({
    name: "RoleUser",
    mixins: [componentOptionsMixin],
    setup() {
        const { t } = useI18n();

        const roleUserStore = useRoleUserStore();

        const { openDialog } = useOpenDialog(RoleUserForm);

        const { openDialog: openDialogApproveWaiting } =
            useOpenDialog(ApproveWaiting);

        const { openDialog: openDialogDetailRoleUser } =
            useOpenDialog(DetailRoleUser);

        const type = ref(t("commonLabel.all"));

        const dataLocale = {
            form: {
                roleName: {
                    label: t("field.roleName.label"),
                    placeholder: t("field.roleName.placeholder"),
                },
                roleType: {
                    label: t("field.roleType.label"),
                    placeholder: t("field.roleType.placeholder"),
                },
                status: {
                    label: t("field.status.label"),
                    placeholder: t("field.status.placeholder"),
                },
                btnSearch: t("button.search"),
                btnReset: t("button.reset"),
            },
            table: {
                btnAdd: t("button.authorizationUser"),
                colAction: t("title.functional"),
                colApprove: t("title.approve"),
                listApproveWaiting: t("role.listApproveWaiting"),
            },
        };

        const columns = [
            {
                name: "id",
                field: "id",
            },
            {
                name: "roleName",
                required: true,
                label: t("field.roleName.label"),
                field: "roleName",
                align: "left",
                format: (val) => `${val}`,
                sortable: false,
            },
            {
                name: "roleType",
                align: "left",
                label: t("field.roleType.label"),
                field: "roleType",
                sortable: false,
            },
            {
                name: "userQuantity",
                align: "center",
                label: t("field.userQuantity.label"),
                field: "userQuantity",
                sortable: false,
            },
            {
                name: "userApproveWaiting",
                align: "center",
                label: t("field.userApproveWaiting.label"),
                field: "userApproveWaitingQuantity",
                sortable: false,
            },
        ];

        const visibleColumns = columns
            .filter((column) => column.name !== "id")
            .map((column) => column.name);

        const rows = ref([]);

        const {
            handleSubmit,
            values: valForm,
            resetForm,
            setValues,
        } = useForm({
            initialValues: {
                roleName: "",
                roleType: t("commonLabel.all"),
                status: t("commonLabel.all"),
            },
        });

        onMounted(() => {
            onReset();
        });

        const onSubmit = handleSubmit(async (values) => {
            roleUserStore.getList({ ...values, currentPage: 1 });
        });

        const onReset = () => {
            resetForm();

            roleUserStore.getList({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            roleUserStore.meta = getMeta(roleUserStore.meta, val);

            roleUserStore.getList(metaToParams(roleUserStore.meta));
        };

        const decentAction = (role) => {
            openDialog({
                id: role.id,
            });
        };

        const updateAction = (role) => {
            openDialogDetailRoleUser({
                action: "update",
                id: role.id,
            });
        };

        const detailAction = (role) => {
            openDialogDetailRoleUser({
                action: "view",
                id: role.id,
            });
        };

        const approveAction = (role) => {
            openDialogApproveWaiting({
                id: role.id,
            });
        };

        return {
            columns,
            rows,
            type,
            dataLocale,
            openDialog,
            updateAction,
            detailAction,
            approveAction,
            roleUserStore,
            visibleColumns,
            onSubmit,
            onUpdatePagination,
            onReset,
            decentAction,
        };
    },
});
</script>
<style scoped></style>
