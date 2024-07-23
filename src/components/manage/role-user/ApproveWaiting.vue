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
                <q-table
                    class="qc-table"
                    style="height: 400px"
                    :rows="roleUserStore.listWaitingUsers"
                    :columns="columns"
                    :visible-columns="visibleColumns"
                    row-key="id"
                    flat
                    bordered
                    hide-bottom
                    virtual-scroll
                    :rows-per-page-options="[0]"
                >
                    <template v-slot:top>
                        <img
                            src="/icons/ellipse-green.svg"
                            alt="Ellipse Green"
                        />
                        <span class="qc-table-top--title"
                            >{{ roleUserStore.listWaitingUsers.length }}
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
                                {{ col.value }}
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
                                    @click="rejectAction(props.row)"
                                >
                                    <img src="/icons/vp-close.svg" />
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
import useDialogConfirm from "src/composables/commons/useDialogConfirm";

export default defineComponent({
    name: "ApproveWaiting",
    props: {
        id: Number,
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const roleUserStore = useRoleUserStore();

        const dataLocale = {
            title: t("role.listApproveWaiting"),
            table: {
                colApprove: t("title.approve"),
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

        const approveAction = (user) => {
            userSelected.value = user;
            dialogApprove();
        };

        const rejectAction = (user) => {
            userSelected.value = user;
            dialogReject();
        };

        const executeApproveUser = () => {
            roleUserStore.approveUser({
                userId: userSelected.value.id,
                groupId: props.id,
                tranId: userSelected.value.tranId,
            });
        };

        const executeRejectUser = () => {
            roleUserStore.rejectUser({
                userId: userSelected.value.id,
                groupId: props.id,
                tranId: userSelected.value.tranId,
            });
        };

        const { dialogConfirm: dialogApprove } = useDialogConfirm(
            t("message.confirmApproveUserToRole"),
            executeApproveUser
        );
        const { dialogConfirm: dialogReject } = useDialogConfirm(
            t("message.confirmRejectUserToRole"),
            executeRejectUser
        );

        return {
            dialogRef,
            skeleton,
            dataLocale,
            columns,
            approveAction,
            rejectAction,
            roleUserStore,
            visibleColumns,
        };
    },
});
</script>
<style scoped></style>
