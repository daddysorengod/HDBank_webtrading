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

            <!-- <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.approveDate.label" />
                <QcDatePicker
                    outlined
                    name="approveDate"
                    :placeholder="dataLocale.form.approveDate.placeholder"
                />
            </div> -->

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.note.label" />
                <QcInput
                    outlined
                    name="note"
                    :placeholder="dataLocale.form.note.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.createdBy.label" />
                <QcInput
                    outlined
                    name="createdBy"
                    :placeholder="dataLocale.form.createdBy.placeholder"
                />
            </div>

            <!-- <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.approveDenyBy.label" />
                <QcInput
                    outlined
                    name="approveDenyBy"
                    :placeholder="dataLocale.form.approveDenyBy.placeholder"
                />
            </div> -->

            <!-- <div class="vpb-filter-group">
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
            </div> -->

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
                v-model:pagination="importFaStatementStore.meta"
                :rows="importFaStatementStore.listFaStatements"
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
                        v-if="importFaStatementStore.meta.total > 1"
                        >{{ importFaStatementStore.meta.total }}
                        {{ $t("system.results") }}</span
                    >
                    <span
                        class="qc-table-top--title"
                        v-if="importFaStatementStore.meta.total <= 1"
                        >{{ importFaStatementStore.meta.total }}
                        {{ $t("system.result") }}</span
                    >
                    <q-space />
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
                        <q-th key="downloadFileImportFa">
                            {{ $t(dataLocale.table.bttDownloadFile) }}
                        </q-th>
                        <q-th key="action">
                            {{ $t(dataLocale.table.colAction) }}
                        </q-th>
                        <q-th key="approve">
                            {{ $t(dataLocale.table.colApprove) }}
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

                        <q-td align="center" auto-width>
                            <q-btn
                                v-if="props.row.fileName"
                                flat
                                size="sm"
                                square
                                no-caps
                                color="primary"
                                @click="onDownloadFile(props.row.fileName)"
                            >
                                <q-icon
                                    center
                                    size="18px"
                                    name="file_download"
                                />
                                <div class="center">
                                    {{ $t(dataLocale.table.bttDownloadFile) }}
                                </div>
                            </q-btn>
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
                        </q-td>

                        <q-td auto-width>
                            <q-btn
                                v-if="showAction(props.row.status, 'detail')"
                                flat
                                size="sm"
                                round
                                @click="approveAction(props.row)"
                            >
                                <img src="/icons/vp-check.svg" />
                            </q-btn>
                            <q-btn
                                v-if="showAction(props.row.status, 'detail')"
                                flat
                                size="sm"
                                round
                                @click="approveAction(props.row)"
                            >
                                <img src="/icons/vp-close.svg" />
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>

                <template v-slot:pagination>
                    <QcPagination
                        :rowsPerPage="importFaStatementStore.meta.rowsPerPage"
                        :currentPage="importFaStatementStore.meta.currentPage"
                        :lastPage="importFaStatementStore.meta.lastPage"
                        :total="importFaStatementStore.meta.total"
                        @change-pagination="onUpdatePagination"
                    />
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import ImportFaForm from "src/components/fund-admin/ImportFaForm.vue";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useForm } from "vee-validate";
import { GROUP_FUNCTION, ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import { getMeta, metaToParams } from "src/common/utils/helper";
import CommonStatus from "src/common/statues/common";
import { useImportFaStatementStore } from "stores/importFaStatement";
import useCheckPermission from "src/composables/commons/useCheckPermission";
import { saveAs } from "file-saver";

export default defineComponent({
    name: "FundAdminApprove",
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
                    align: "center",
                    label: this.$t("field.voucherNumber.label"),
                    field: "voucherNumber",
                    sortable: false,
                },
                {
                    name: "importDate",
                    align: "center",
                    label: this.$t("field.importDate.label"),
                    field: "importDate",
                    sortable: false,
                },
                // {
                //     name: "approveDate",
                //     align: "center",
                //     label: this.$t("field.approveDate.label"),
                //     field: "approveDate",
                //     sortable: false,
                // },
                {
                    name: "note",
                    align: "left",
                    label: this.$t("field.note.label"),
                    field: "note",
                    sortable: false,
                },
                {
                    name: "status",
                    align: "center",
                    label: this.$t("field.status.label"),
                    field: "status",
                    sortable: false,
                },
                {
                    name: "createdBy",
                    align: "left",
                    label: this.$t("field.createdBy.label"),
                    field: "createdBy",
                    sortable: false,
                },
                // {
                //     name: "approveDenyBy",
                //     align: "left",
                //     label: this.$t("field.approveDenyBy.label"),
                //     field: "approveDenyBy",
                //     sortable: false,
                // },
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

        const { openDialog } = useOpenDialog(ImportFaForm);

        const importFaStatementStore = useImportFaStatementStore();

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
                // approveDate: {
                //     label: "field.approveDate.label",
                //     placeholder: "field.approveDate.placeholder",
                // },
                status: {
                    label: "field.status.label",
                    placeholder: "field.status.placeholder",
                },
                note: {
                    label: "field.note.label",
                    placeholder: "field.note.placeholder",
                },
                createdBy: {
                    label: "field.createdBy.label",
                    placeholder: "field.createdBy.placeholder",
                },
                // approveDenyBy: {
                //     label: "field.approveDenyBy.label",
                //     placeholder: "field.approveDenyBy.placeholder",
                // },
                orderbyTime: {
                    label: "field.orderbyTime.label",
                    placeholder: "field.orderbyTime.placeholder",
                },
                btnSearch: "button.search",
                btnReset: "button.reset",
            },
            table: {
                btnAdd: "button.faImport",
                btnDownloadTemplate: "button.downloadTemplate",
                colAction: "title.functional",
                colApprove: "title.approve",
                bttDownloadFile: "button.downloadFileImportFa",
            },
        };

        const {
            handleSubmit,
            values: valForm,
            resetForm,
        } = useForm({
            initialValues: {
                voucherNumber: "",
                importDate: "",
                // approveDate: "",
                status: "",
                note: "",
                createdBy: "",
                // approveDenyBy: "",
            },
        });

        const onSubmit = handleSubmit(async (values) => {
            importFaStatementStore.getListApprove({
                ...values,
                currentPage: 1,
            });
        });

        const onReset = () => {
            resetForm();

            importFaStatementStore.getListApprove({
                ...valForm,
                currentPage: 1,
                rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            });
        };

        const onUpdatePagination = (val) => {
            importFaStatementStore.meta = getMeta(
                importFaStatementStore.meta,
                val
            );

            importFaStatementStore.getListApprove(
                metaToParams(importFaStatementStore.meta)
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

        const approveAction = (row) => {
            openDialog({
                action: "approve",
                id: row.id,
            });
        };

        const onDownloadFile = (fileName) => {
            if (!fileName) return;
            saveAs(
                `${process.env.VUE_APP_API}${process.env.VUE_APP_LINK_DOWNLOAD_FILE_IMPORT_FUND_ADMIN}/${fileName}`
            );
        };

        return {
            dataLocale,
            openDialog,
            detailAction,
            deleteAction,
            approveAction,
            showAction,
            onUpdatePagination,
            importFaStatementStore,
            onSubmit,
            onReset,
            hasPermissionCreate,
            onDownloadFile,
        };
    },
});
</script>
<style scoped></style>
