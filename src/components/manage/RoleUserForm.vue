<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="1000px"
            height-content="500px"
        ></QcCardSkeleton>

        <q-card style="width: 1190px; max-width: 80vw" v-else>
            <q-card-section class="qc-card__title row items-center">
                <div>{{ dataLocale.title }}</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row q-mb-md">
                    <div class="col-5">
                        <div class="row no-wrap items-center">
                            <div class="col-9">
                                <div class="vpb-form-group">
                                    <QcLabel
                                        :label="dataLocale.form.name.label"
                                    />
                                    <QcInput
                                        outlined
                                        name="name"
                                        :placeholder="
                                            dataLocale.form.name.placeholder
                                        "
                                        @keyup.enter="searching"
                                    />
                                </div>
                            </div>
                            <div class="col-3 q-pl-sm">
                                <q-btn
                                    no-caps
                                    color="primary"
                                    size="lg"
                                    class="qc-btn full-width"
                                    unelevated
                                    @click="searching"
                                    >{{ dataLocale.btnSearch }}</q-btn
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-md">
                    <div class="col-5">
                        <q-table
                            class="qc-table qc-table-selection-multiple my-sticky-header-table"
                            style="height: 400px"
                            :rows="rows"
                            :columns="columns"
                            row-key="id"
                            flat
                            bordered
                            hide-bottom
                            selection="multiple"
                            virtual-scroll
                            :rows-per-page-options="[0]"
                            v-model:selected="userSelected"
                        >
                            <template v-slot:top>
                                <img
                                    src="/icons/ellipse-green.svg"
                                    alt="Ellipse Green"
                                />
                                <span class="qc-table-top--title"
                                    >{{
                                        roleUserStore.listUserNotInRole.length
                                    }}
                                    {{ $t("system.result") }}</span
                                >
                            </template>
                        </q-table>
                    </div>
                    <div class="col-2 flex items-center justify-center">
                        <img src="/icons/double_arrow.svg" alt="" />
                    </div>
                    <div class="col-5">
                        <q-table
                            class="qc-table qc-table-selection-multiple my-sticky-header-table"
                            :rows="userSelected"
                            :columns="columns"
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
                                    >{{ userSelected.length }}
                                    {{ $t("system.result") }}</span
                                >
                            </template>
                        </q-table>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions>
                <q-btn
                    padding="12px 31.5px"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn"
                    unelevated
                    @click="onSubmit"
                    :loading="isSubmitting"
                    >{{ dataLocale.btnConfirm }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import { useRoleUserStore } from "stores/roleUser";
import { useForm } from "vee-validate";

export default defineComponent({
    name: "RoleUserForm",
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

        const userSelected = ref([]);

        const isSubmitting = ref(false);

        const dataLocale = {
            title: t("menu.manageRoleUser"),
            form: {
                name: {
                    label: t("field.name.label"),
                    placeholder: t("field.name.placeholder"),
                },
                roleName: {
                    label: t("field.roleName.label"),
                    placeholder: t("field.roleName.placeholder"),
                },
            },
            table: {
                colAction: t("title.functional"),
            },
            btnSearch: t("button.search"),
            btnConfirm: t("button.confirm"),
        };

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const { values: valForm, handleSubmit } = useForm({
            initialValues: {
                name: "",
            },
        });

        const skeleton = ref(false);

        const columns = [
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
            {
                name: "roleQuantity",
                align: "center",
                label: t("field.roleQuantity.label"),
                field: "roleQuantity",
                sortable: false,
            },
        ];

        const rows = ref([]);

        const searching = handleSubmit((values) => {
            const nameNeedle = values?.name?.toLowerCase();
            rows.value = roleUserStore.listUserNotInRole.filter(
                (user) => user?.name?.toLowerCase().indexOf(nameNeedle) > -1
            );
        });

        onMounted(async () => {
            if (props.id) {
                skeleton.value = true;

                await roleUserStore.getListUserNotInRole(props.id);

                rows.value = roleUserStore.listUserNotInRole;

                skeleton.value = false;
            }
        });

        watch(
            userSelected,
            (val) => {
                console.log(val);
            },
            { deep: true }
        );

        const onSubmit = async () => {
            try {
                const data = {
                    strLstUser: userSelected.value
                        .map((user) => user.id)
                        .join(", "),
                    strlstgroup: `${props.id}`,
                };

                await roleUserStore.addUserToGroup(data);

                onDialogCancel();
            } catch (e) {
                console.log(e);
            }
        };

        return {
            dialogRef,
            skeleton,
            dataLocale,
            rows,
            columns,
            userSelected,
            onSubmit,
            isSubmitting,
            roleUserStore,
            searching,
        };
    },
});
</script>
<style lang="scss"></style>
