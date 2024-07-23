<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.voucherNumber.label" />
                <QcInput
                    outlined
                    name="voucherNumber"
                    :placeholder="dataLocale.form.voucherNumber.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.importDate.label" />
                <QcDatePicker
                    outlined
                    name="importDate"
                    :placeholder="dataLocale.form.importDate.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.status.label" />
                <QcSelect
                    :placeholder="dataLocale.form.status.placeholder"
                    name="status"
                    :options="
                        statusOptions.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
                    map-options
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.orderbyTime.label" />

                <QcSelect
                    :placeholder="dataLocale.form.orderbyTime.placeholder"
                    name="orderbyTime"
                    :options="
                        orderByTime.map((item) => ({
                            label: $t(item.label),
                            value: item.value,
                        }))
                    "
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
                    >{{ $t(dataLocale.form.btnSearch) }}</q-btn
                >
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onReset"
                    >{{ $t(dataLocale.form.btnReset) }}</q-btn
                >
            </div>
        </div>

        <div class="vpb-page-content">
            <q-table
                class="qc-table"
                v-model:pagination="importStatementStore.meta"
                :rows="importStatementStore.listStatements"
                :columns="columnI18n.columns"
                :visible-columns="columnI18n.visibleColumns"
                :rows-per-page-options="[]"
                row-key="id"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span
                        class="qc-table-top--title"
                        v-if="importStatementStore.meta.total > 1"
                        >{{ importStatementStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="importStatementStore.meta.total <= 1"
                        >{{ importStatementStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
                    <q-space />
                    <q-btn
                        v-if="hasPermissionCreate"
                        flat
                        no-caps
                        color="primary"
                        @click="openDialog"
                    >
                        <q-icon left size="18px" name="add" />
                        <div>{{ $t(dataLocale.table.btnAdd) }}</div>
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
                            {{ $t(dataLocale.table.colAction) }}
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
                                v-if="showAction(props.row.status, 'delete')"
                                flat
                                size="sm"
                                round
                                @click="deleteAction(props.row)"
                            >
                                <img src="/icons/vp-trash.svg" />
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>

                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="importStatementStore.meta.rowsPerPage"
                        :currentPage="importStatementStore.meta.currentPage"
                        :lastPage="importStatementStore.meta.lastPage"
                        :total="importStatementStore.meta.total"
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
import ImportForm from "src/components/transaction/ImportForm.vue";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useForm } from "vee-validate";
import { GROUP_FUNCTION, ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import { getMeta, metaToParams } from "src/common/utils/helper";
import CommonStatus from "src/common/statues/common";
import { useImportStatementStore } from "stores/importStatement";
import useCheckPermission from "src/composables/commons/useCheckPermission";

export default defineComponent({
    name: "ImportStatement",
    mixins: [componentOptionsMixin],
    computed: {
        columnI18n() {
            const columns = [
                {
                    name: "id",
                    field: "id",
                },
                {
                    name: "voucherNumber",
                    align: "left",
                    label: this.$t("field.voucherNumber.label"),
                    field: "voucherNumber",
                    sortable: false,
                },
                {
                    name: "importDate",
                    align: "left",
                    label: this.$t("field.importDate.label"),
                    field: "importDate",
                    sortable: false,
                },
                {
                    name: "status",
                    align: "center",
                    label: this.$t("field.status.label"),
                    field: "status",
                    sortable: false,
                },
            ];
            const visibleColumns = columns
                .filter((column) => column.name !== "id")
                .map((column) => column.name);

            return { columns, visibleColumns };
        },
    },
    setup() {
        const {
            hasPermissionApprove,
            hasPermissionCreate,
            hasPermissionEdit,
            hasPermissionDelete,
        } = useCheckPermission({
            permissionApprove: "",
            permissionCreate: GROUP_FUNCTION.IMPORT_TRANSACTION_ADD,
            permissionEdit: GROUP_FUNCTION.IMPORT_TRANSACTION_MIX,
            permissionDelete: GROUP_FUNCTION.IMPORT_TRANSACTION_DELETE,
        });

        const { t } = useI18n();

        const { openDialog } = useOpenDialog(ImportForm);

        const importStatementStore = useImportStatementStore();

        const dataLocale = {
            form: {
                voucherNumber: {
                    label: "field.voucherNumber.label",
                    placeholder: "field.voucherNumber.placeholder",
                },
                importDate: {
                    label: "field.importDate.label",
                    placeholder: "field.importDate.placeholder",
                },
                status: {
                    label: "field.status.label",
                    placeholder: "field.status.placeholder",
                },
                orderbyTime: {
                    label: "field.orderbyTime.label",
                    placeholder: "field.orderbyTime.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
            },
            table: {
                btnAdd: "button.addImport",
                btnDownloadTemplate: "button.downloadTemplate",
                colAction: "title.functional",
                colApprove: "title.approve",
            },
        };

        const {
            handleSubmit,
            values: valForm,
            resetForm,
            setValues,
        } = useForm({
            initialValues: {
                voucherNumber: "",
                importDate: "",
                // status: t("commonLabel.all"),
                status: "",
            },
        });

        const onSubmit = handleSubmit(async (values) => {
            importStatementStore.getList({ ...values, currentPage: 1 });
        });

        const onReset = () => {
            resetForm();

            importStatementStore.getList({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            importStatementStore.meta = getMeta(importStatementStore.meta, val);

            importStatementStore.getList(
                metaToParams(importStatementStore.meta)
            );
        };

        onMounted(() => {
            onReset();
        });

        const showAction = (status, action) => {
            switch (action) {
                case "detail":
                    return true;
                case "delete":
                    return (
                        hasPermissionDelete.value &&
                        status === CommonStatus.WAITING.value
                    );
                default:
                    return true;
            }
        };

        const detailAction = (row) => {
            openDialog({
                action: "detail",
                id: row.id,
            });
        };

        const deleteAction = (row) => {
            openDialog({
                action: "delete",
                id: row.id,
            });
        };

        const approveAction = () => {
            openDialog({
                action: "approve",
            });
        };

        return {
            dataLocale,
            openDialog,
            detailAction,
            deleteAction,
            approveAction,
            showAction,
            onUpdatePagination,
            importStatementStore,
            onSubmit,
            onReset,
            hasPermissionCreate,
        };
    },
});
</script>
<style scoped></style>
