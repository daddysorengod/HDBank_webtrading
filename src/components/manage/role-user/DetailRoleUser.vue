<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="1000px"
            height-content="500px"
        ></QcCardSkeleton>

        <q-card style="width: 1000px; max-width: 80vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ dataLocale.title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row q-mb-md">
                    <div class="col-2 vpb-role-user-label">
                        {{ $t(dataLocale.roleNameLabel) }}
                    </div>
                    <div class="col-3 vpb-role-user-value">
                        {{ roleUserStore.role.roleName }}
                    </div>
                </div>

                <div class="row q-mb-md">
                    <div class="col-2 vpb-role-user-label">
                        {{ $t(dataLocale.roleTypeLabel) }}
                    </div>
                    <div class="col-3 vpb-role-user-value">
                        {{
                            roleType.getDescription(roleUserStore.role.roleType)
                        }}
                    </div>
                </div>

                <q-table
                    class="qc-table my-sticky-header-table"
                    :rows="roleUserStore.listUserInRole"
                    :columns="columns"
                    :visible-columns="visibleColumns"
                    row-key="id"
                    flat
                    bordered
                    hide-bottom
                    virtual-scroll
                    :rows-per-page-options="[0]"
                    style="height: 400px"
                >
                    <template v-slot:top>
                        <img
                            src="/icons/ellipse-green.svg"
                            alt="Ellipse Green"
                        />
                        <span class="qc-table-top--title"
                            >{{ roleUserStore.listUserInRole.length }}
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
                            <q-th v-if="action === 'update'" key="approve">
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
                                {{ col.value }}
                            </q-td>

                            <q-td
                                v-if="action === 'update'"
                                align="right"
                                auto-width
                            >
                                <q-btn
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
                </q-table>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import { useRoleUserStore } from "stores/roleUser";
import RoleType from "src/common/types/role";
import useDialogConfirm from "src/composables/commons/useDialogConfirm";

export default defineComponent({
    name: "DetailRoleUser",
    props: {
        id: Number,
        action: {
            type: String,
            default: "view",
            validator(value) {
                return ["view", "update"].includes(value);
            },
        },
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const roleUserStore = useRoleUserStore();

        const titleByAction = {
            view: t("title.detail"),
            update: t("title.update"),
        };

        const dataLocale = {
            title: titleByAction[props.action],
            roleNameLabel: ("field.roleName.label"),
            roleTypeLabel: ("field.roleType.label"),
            table: {
                colAction: ("title.functional"),
            },
        };

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const skeleton = ref(false);

        const columns = [
            {
                name: "id",
                field: "id",
            },
            {
                name: "name",
                align: "left",
                label: t("field.name.label"),
                field: "name",
                sortable: false,
            },
            {
                name: "phone",
                align: "left",
                label: t("field.phone.label"),
                field: "phone",
                sortable: false,
            },
        ];

        const visibleColumns = columns
            .filter((column) => column.name !== "id")
            .map((column) => column.name);

        onMounted(async () => {
            if (props.id) {
                skeleton.value = true;

                await roleUserStore.getDetail(props.id);

                skeleton.value = false;
            }
        });

        const userSelected = ref(null);

        const deleteAction = (user) => {
            userSelected.value = user;
            dialogConfirm();
        };

        const executeDeleteUser = () => {
            roleUserStore.removeUserFromGroup({
                userId: userSelected.value.id,
                groupId: props.id,
            });
        };

        const { dialogConfirm } = useDialogConfirm(
            t("message.confirmDeleteUserFromRole"),
            executeDeleteUser
        );

        return {
            dialogRef,
            skeleton,
            dataLocale,
            columns,
            deleteAction,
            roleUserStore,
            visibleColumns,
            roleType: RoleType,
            dialogConfirm,
        };
    },
});
</script>
<style scoped></style>
