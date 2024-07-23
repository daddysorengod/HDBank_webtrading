<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.roleName.label" />
                <QcSelect
                    outlined
                    name="roleName"
                    :placeholder="dataLocale.form.roleName.placeholder"
                    :options="roleStore.listRoleName"
                    use-input
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.roleType.label" />
                <QcSelect
                    :placeholder="dataLocale.form.roleType.placeholder"
                    outlined
                    :options="roleStore.listRoleType"
                    name="roleType"
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
                    @click="onPressSearch"
                    >{{ dataLocale.form.btnSearch }}</q-btn
                >
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width qc-btn qc-btn--primary-second"
                    unelevated
                    @click="resetFilter"
                    >{{ dataLocale.form.btnReset }}</q-btn
                >
            </div>
        </div>

        <div class="vpb-page-content">
            <q-table
                class="qc-table"
                v-model:pagination="roleStore.meta"
                :rows="roleStore.listRole"
                :columns="columns"
                :rows-per-page-options="[]"
                row-key="Id"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span class="qc-table-top--title"
                        >{{ roleStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
                    <q-space />
                    <q-btn flat no-caps color="primary" @click="openDialog">
                        <q-icon left size="18px" name="add" />
                        <div>{{ dataLocale.table.btnAdd }}</div>
                    </q-btn>
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
                        <q-th key="action">
                            {{ dataLocale.table.colAction }}
                        </q-th>
                        <!-- <q-th key="approve">
                            {{ dataLocale.table.colApprove }}
                        </q-th> -->
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            <template v-if="col.name === 'roleType'">
                                <role-label
                                    :role="col.value"
                                    :key="col.value"
                                />
                            </template>
                            <template v-else-if="col.name === 'status'">
                                <status-label
                                    :status="col.value"
                                    :key="col.value"
                                />
                            </template>

                            <template v-else>
                                {{ col.value }}
                            </template>
                        </q-td>

                        <q-td auto-width>
                            <q-btn
                                v-if="showAction(props.row.status, 'detail')"
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
                                v-if="showAction(props.row.status, 'edit')"
                            >
                                <img src="/icons/vp-pencil.svg" />
                            </q-btn>
                            <q-btn
                                flat
                                size="sm"
                                round
                                @click="deleteAction(props.row)"
                                v-if="showAction(props.row.status, 'delete')"
                            >
                                <img src="/icons/vp-trash.svg" />
                            </q-btn>
                        </q-td>

                        <!-- <q-td align="right" auto-width>
                            <q-btn
                                v-if="showAction(props.row.status, 'edit')"
                                flat
                                size="sm"
                                round
                                @click="approveAction(props.row)"
                            >
                                <img src="/icons/vp-check.svg" />
                            </q-btn>
                            <q-btn
                                v-if="showAction(props.row.status, 'edit')"
                                flat
                                size="sm"
                                round
                                @click="approveAction(props.row)"
                            >
                                <img src="/icons/vp-close.svg" />
                            </q-btn>
                        </q-td> -->
                    </q-tr>
                </template>
                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="roleStore.meta.rowsPerPage"
                        :currentPage="roleStore.meta.currentPage"
                        :lastPage="roleStore.meta.lastPage"
                        :total="roleStore.meta.total"
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
import RoleForm from "src/components/manage/RoleForm.vue";
import { useRole } from "src/stores/role";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { getMeta, metaToParams } from "src/common/utils/helper";
import CommonStatus from "src/common/statues/common";

export default defineComponent({
    name: "Role",
    setup() {
        const { t } = useI18n();

        const { openDialog } = useOpenDialog(RoleForm);

        const roleStore = useRole();

        const dataLocale = ref({
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
                btnAdd: t("button.addRole"),
                colAction: t("title.functional"),
                // colApprove: t("title.approve")
            },
        });

        const columns = [
            {
                name: "roleName",
                required: true,
                label: t("field.roleName.label"),
                field: "roleName",
                align: "left",
                format: (val) => `${val}`,
                sortable: false,
                style: "width: 60%",
            },
            {
                name: "roleType",
                align: "left",
                label: t("field.roleType.label"),
                field: "roleType",
                sortable: false,
            },
            {
                name: "status",
                align: "left",
                label: t("field.status.label"),
                field: "status",
                sortable: false,
            },
        ];

        const schema = yup.object({
            roleName: yup
                .string()
                .label(t(dataLocale.value.form.roleName.label)),
            roleType: yup
                .string()
                .label(t(dataLocale.value.form.roleType.label)),
        });

        const {
            handleSubmit,
            resetForm,
            setValues,
            values: valForm,
        } = useForm({
            initialValues: {
                roleName: "",
                roleType: "",
            },
        });

        const onPressSearch = handleSubmit(async (values) => {
            roleStore.getListRole(values);
        });

        onMounted(async () => {
            roleStore.getListRole({});
        });

        const resetFilter = () => {
            resetForm();

            roleStore.getListRole({
                ...valForm,
                pagenumber: 1,
            });
        };

        const onUpdatePagination = (val) => {
            roleStore.meta = getMeta(roleStore.meta, val);

            roleStore.getListRole(metaToParams(roleStore.meta));
        };

        const updateAction = (row) => {
            openDialog({
                action: "update",
                id: row?.id,
                data: {
                    tranid: row?.tranid,
                },
            });
        };

        const detailAction = (row) => {
            openDialog({
                action: "detail",
                id: row?.id,
                data: {
                    tranid: row?.tranid,
                },
            });
        };

        const deleteAction = (row) => {
            openDialog({
                action: "delete",
                id: row?.id,
                data: {
                    tranid: row?.tranid,
                },
            });
        };

        const approveAction = (row) => {
            openDialog({
                action: "approve",
                id: row?.id,
                data: {
                    tranid: row?.tranid,
                },
            });
        };

        const showAction = (status, action) => {
            switch (action) {
                case "detail":
                    return true;
                case "edit":
                    return status === CommonStatus.WAITING.value;
                case "delete":
                    return status === CommonStatus.WAITING.value;
                default:
                    return true;
            }
        };

        return {
            columns,
            dataLocale,
            openDialog,
            updateAction,
            detailAction,
            deleteAction,
            approveAction,
            roleStore,
            onPressSearch,
            resetFilter,
            onUpdatePagination,
            showAction,
        };
    },
});
</script>
<style scoped></style>
