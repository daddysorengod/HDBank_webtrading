<template>
    <q-dialog class="qc-dialog" ref="dialogRef">
        <QcCardSkeleton
            v-if="skeleton"
            width="1000px"
            height-content="800px"
        ></QcCardSkeleton>
        <q-card style="width: 1000px; max-width: 70vw" v-else>
            <div>
                <q-card-section class="qc-card__title row items-center">
                    <div>{{ dataLocale.title }}</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
            </div>
            <q-separator />
            <div>
                <q-card-section class="q-pb-md">
                    <div class="col-5">
                        <div class="row q-col-gutter-sm items-center">
                            <div class="col- vpb-form-group">
                                <QcLabel
                                    :label="
                                        dataLocale.form.depositoryAccountNumber
                                            .label
                                    "
                                />
                                <QcInput
                                    outlined
                                    :placeholder="
                                        dataLocale.form.depositoryAccountNumber
                                            .placeholder
                                    "
                                    name="depositoryAccountNumber"
                                    map-options
                                />
                            </div>

                            <div class="col-4 vpb-form-group">
                                <QcLabel
                                    :label="
                                        dataLocale.form.depositoryAccount.label
                                    "
                                />
                                <QcInput
                                    outlined
                                    :placeholder="
                                        dataLocale.form.depositoryAccount
                                            .placeholder
                                    "
                                    name="depositoryAccount"
                                    map-options
                                />
                            </div>

                            <div class="col-2 q-pl-sm">
                                <q-btn
                                    no-caps
                                    color="primary"
                                    size="lg"
                                    class="qc-btn full-width"
                                    unelevated
                                    @click="searching"
                                    >{{ dataLocale.form.btnSearch }}</q-btn
                                >
                            </div>
                            <div class="col-2 q-pl-sm">
                                <q-btn
                                    no-caps
                                    color="primary"
                                    size="lg"
                                    class="full-width qc-btn qc-btn--primary-second"
                                    unelevated
                                    @click="onPressReset"
                                    >{{ dataLocale.form.btnReset }}</q-btn
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-5">
                        <q-table
                            class="qc-table qc-table-selection-multiple my-sticky-header-table"
                            style="height: 450px"
                            :rows="rows"
                            :columns="columns"
                            row-key="depositoryAccountNumber"
                            flat
                            bordered
                            hide-bottom
                            selection="multiple"
                            virtual-scroll
                            :rows-per-page-options="[0]"
                            v-model:selected="depositoryAccountSelected"
                        >
                            <template v-slot:top>
                                <img
                                    src="/icons/ellipse-green.svg"
                                    alt="Ellipse Green"
                                />
                                <span class="qc-table-top--title"
                                    >{{
                                        roleUserConfirmStore.listUserSearch
                                            .length
                                    }}
                                    {{ $t("system.result") }}</span
                                >
                            </template>
                        </q-table>
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
                        >{{ dataLocale.form.btnConfirm }}
                    </q-btn>
                </q-card-actions>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, onMounted, computed, ref, watch } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRoleUserConfirmStore } from "stores/roleUserConfirm";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "stores/auth";
import { LocalStorage } from "quasar";
import { ACCESS_LIST_AFMASTS } from "src/common/constant";

export default defineComponent({
    name: "SearchAfmastId",
    props: {
        id: Number,
        // action:{
        //   type:String.
        //   default:""
        // }
    },
    emits: [...useDialogPluginComponent.emits],
    setup(props) {
        const { t } = useI18n();

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();

        const dataLocale = {
            title: t("title.sreachAfmast"),
            form: {
                depositoryAccountNumber: {
                    label: t("field.depositoryAccountNumber.label"),
                    placeholder: t("field.depositoryAccountNumber.placeholder"),
                },
                depositoryAccount: {
                    label: t("field.name.label"),
                    placeholder: t("field.name.placeholder"),
                },
                btnSearch: t("button.search"),
                btnReset: t("button.reset"),
                btnConfirm: t("button.confirm"),
            },
        };

        const {
            values: valForm,
            handleSubmit,
            resetForm,
        } = useForm({
            initialValues: {
                depositoryAccountNumber: "",
                depositoryAccount: "",
            },
        });

        const roleUserConfirmStore = useRoleUserConfirmStore();

        const depositoryAccountSelected = ref([]);

        const rows = ref([]);

        const isSubmitting = ref(false);

        const columns = [
            {
                name: "depositoryAccount",
                align: "left",
                label: t("field.name.label"),
                field: "depositoryAccount",
                sortable: false,
            },
            {
                name: "depositoryAccountNumber",
                align: "left",
                label: t("field.depositoryAccountNumber.label"),
                field: "depositoryAccountNumber",
                sortable: false,
            },
        ];

        const authStore = useAuthStore();

        const skeleton = ref(false);

        onMounted(async () => {
            skeleton.value = true;

            roleUserConfirmStore.listRelatedUser =
                 authStore?.listDeposNameById;
            rows.value =  authStore?.listDeposNameById;

            skeleton.value = false;
        });

        watch(
            depositoryAccountSelected,
            (val) => {
                console.log(val);
            },
            { deep: true }
        );

        const searching = handleSubmit((values) => {
            if (
                !values?.depositoryAccount &&
                !values?.depositoryAccountNumber
            ) {
                rows.value = roleUserConfirmStore.listRelatedUser;
                return;
            }
            if (values?.depositoryAccount) {
                const nameNeedle = values?.depositoryAccount?.toLowerCase();

                rows.value = roleUserConfirmStore.listRelatedUser.filter(
                    (Account) =>
                        Account?.depositoryAccount
                            ?.toLowerCase()
                            .indexOf(nameNeedle) > -1
                );
            }
            if (values?.depositoryAccountNumber) {
                const nameNeedle =
                    values?.depositoryAccountNumber?.toLowerCase();

                rows.value = roleUserConfirmStore.listRelatedUser.filter(
                    (Account) =>
                        Account?.depositoryAccountNumber
                            ?.toLowerCase()
                            .indexOf(nameNeedle) > -1
                );
            }
        });

        const onPressReset = async () => {
            rows.value = roleUserConfirmStore.listRelatedUser;
            resetForm();
        };

        const onSubmit = async () => {
            try {
                const dataFilter = depositoryAccountSelected.value
                    .map((item) => item?.depositoryAccountNumber)
                    .join(", ");

                const dataIdFilter = depositoryAccountSelected.value
                    .map((item) => item?.depositoryAccountId)
                    .join(", ");

                roleUserConfirmStore.currentListUserChoose = dataFilter;
                
                roleUserConfirmStore.currentListUserChooseId = dataIdFilter;
                onDialogCancel();
            } catch (error) {}
        };

        return {
            dialogRef,
            dataLocale,
            skeleton,
            searching,
            depositoryAccountSelected,
            rows,
            columns,
            roleUserConfirmStore,
            onPressReset,
            isSubmitting,
            onSubmit,
        };
    },
});
</script>
