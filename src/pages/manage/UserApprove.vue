<template>
    <q-page>
        <div class="vpb-filter">
            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.username.label" />
                <QcInput
                    outlined
                    name="username"
                    :placeholder="dataLocale.form.username.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.name.label" />
                <QcInput
                    outlined
                    name="name"
                    :placeholder="dataLocale.form.name.label"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.email.label" />
                <QcInput
                    outlined
                    name="email"
                    :placeholder="dataLocale.form.email.placeholder"
                />
            </div>

            <div class="vpb-filter-group">
                <QcLabel :label="dataLocale.form.phone.label" />
                <QcInput
                    outlined
                    name="phone"
                    :placeholder="dataLocale.form.phone.placeholder"
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
                v-model:pagination="roleUserConfirmStore.meta"
                :rows="roleUserConfirmStore.listUserOnline"
                :columns="columns"
                :rows-per-page-options="[]"
                row-key="userId"
                flat
                bordered
            >
                <template v-slot:top>
                    <img src="/icons/ellipse-green.svg" alt="Ellipse Green" />
                    <span class="qc-table-top--title"
                        >{{ roleUserConfirmStore.meta.total }}
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
                    </q-tr>
                </template>

                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td
                            v-for="col in props.cols"
                            :key="col.name"
                            :props="props"
                        >
                            <template v-if="col.name === 'typePaper'">
                                <document-label
                                    :document="col.value"
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

                        <q-td align="right" auto-width>
                            <q-btn
                                flat
                                size="sm"
                                round
                                @click="approveAction(props.row)"
                            >
                                <img src="/icons/vp-check.svg" />
                            </q-btn>
                            <q-btn
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
                        :rowsPerPage="roleUserConfirmStore.meta.rowsPerPage"
                        :currentPage="roleUserConfirmStore.meta.currentPage"
                        :lastPage="roleUserConfirmStore.meta.lastPage"
                        :total="roleUserConfirmStore.meta.total"
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
import UserForm from "src/components/manage/UserForm.vue";
import { useRoleUserConfirmStore } from "stores/roleUserConfirm";
import { getMeta, metaToParams } from "src/common/utils/helper";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import { useForm } from "vee-validate";
import CommonStatus from "src/common/statues/common";

export default defineComponent({
    name: "LookupBalance",
    mixins: [componentOptionsMixin],
    setup() {
        const { t } = useI18n();

        const { openDialog } = useOpenDialog(UserForm);

        const type = ref(t("commonLabel.all"));

        const dataLocale = {
            form: {
                username: {
                    label: t("field.username.label"),
                    placeholder: t("field.username.placeholder"),
                },
                name: {
                    label: t("field.name.label"),
                    placeholder: t("field.name.placeholder"),
                },
                email: {
                    label: t("field.email.label"),
                    placeholder: t("field.email.placeholder"),
                },
                phone: {
                    label: t("field.phone.label"),
                    placeholder: t("field.phone.placeholder"),
                },
                depositoryAccount: {
                    label: t("field.depositoryAccount.label"),
                    placeholder: t("field.depositoryAccount.placeholder"),
                },
                btnSearch: t("button.search"),
                btnReset: t("button.reset"),
            },
            table: {
                btnAdd: t("button.addUser"),
                // colAction: t("title.functional"),
                colApprove: t("title.approve"),
            },
        };

        const columns = [
            {
                name: "username",
                required: true,
                label: t("field.username.label"),
                field: "username",
                align: "left",
                format: (val) => `${val}`,
                sortable: false,
            },
            {
                name: "name",
                align: "left",
                label: t("field.name.label"),
                field: "name",
                sortable: false,
            },
            {
                name: "email",
                align: "left",
                label: t("field.email.label"),
                field: "email",
                sortable: false,
            },
            {
                name: "phone",
                align: "left",
                label: t("field.phone.label"),
                field: "phone",
                sortable: false,
            },
            {
                name: "typePaper",
                align: "left",
                label: t("field.typePaper.label"),
                field: "typePaper",
                sortable: false,
            },
            {
                name: "numberPaper",
                align: "left",
                label: t("field.numberPaper.label"),
                field: "numberPaper",
                sortable: false,
            },
        ];

        const {
            handleSubmit,
            resetForm,
            setValues,
            values: valForm,
        } = useForm({
            initialValues: {
                username: "",
                name: "",
                email: "",
                phone: "",
                transactionDate: "",
            },
        });

        const rows = ref([]);

        const roleUserConfirmStore = useRoleUserConfirmStore();

        onMounted(async () => {
            roleUserConfirmStore.getListOnlineUserTran({});
        });

        const approveAction = (row) => {
            openDialog({
                action: "approve",
                id: row.userId,
                tranId: row.tranId,
            });
        };

        const onUpdatePagination = (val) => {
            roleUserConfirmStore.meta = getMeta(roleUserConfirmStore.meta, val);

            roleUserConfirmStore.getListOnlineUser(
                metaToParams(roleUserConfirmStore.meta)
            );
        };

        const onPressSearch = handleSubmit(async (values) => {
            roleUserConfirmStore.getListOnlineUser({
                ...values,
                currentPage: 1,
            });
        });

        const resetFilter = () => {
            resetForm();

            roleUserConfirmStore.getListOnlineUser({
                ...valForm,
                currentPage: 1,
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
            rows,
            type,
            dataLocale,
            openDialog,
            approveAction,
            roleUserConfirmStore,
            onUpdatePagination,
            onPressSearch,
            resetFilter,
            showAction,
        };
    },
    created: async function () {},
    methods: {},
});
</script>
<style scoped></style>
