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

            <q-card-section class="q-pb-md">
                <div class="row q-col-gutter-lg">
                    <div class="col-3">
                        <div class="vpb-form-group">
                            <QcLabel :label="dataLocale.form.name.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="name"
                                :placeholder="dataLocale.form.name.label"
                            />
                        </div>
                        <div class="vpb-form-group vpb-form-group__bottom">
                            <QcLabel :label="dataLocale.form.username.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="username"
                                :placeholder="dataLocale.form.username.label"
                            />
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="vpb-form-group">
                            <QcLabel :label="dataLocale.form.email.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="email"
                                :placeholder="dataLocale.form.email.placeholder"
                            />
                        </div>
                        <div class="vpb-form-group vpb-form-group__bottom">
                            <QcLabel :label="dataLocale.form.password.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="password"
                                :placeholder="
                                    dataLocale.form.password.placeholder
                                "
                                :type="
                                    !dataForm.visiblePwd ? 'password' : 'text'
                                "
                                :error-external="dataForm.errorExternal"
                            >
                                <template v-slot:append>
                                    <q-icon
                                        :name="
                                            dataForm.visiblePwd
                                                ? 'visibility'
                                                : 'visibility_off'
                                        "
                                        class="cursor-pointer"
                                        @click="
                                            dataForm.visiblePwd =
                                                !dataForm.visiblePwd
                                        "
                                    />
                                </template>
                            </QcInput>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="vpb-form-group">
                            <QcLabel :label="dataLocale.form.phone.label" />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="phone"
                                :placeholder="dataLocale.form.phone.placeholder"
                            />
                        </div>
                        <div class="vpb-form-group vpb-form-group__bottom">
                            <QcLabel
                                :label="dataLocale.form.numberPaper.label"
                            />
                            <QcInput
                                :disabled="inputDisabled"
                                outlined
                                name="numberPaper"
                                :placeholder="
                                    dataLocale.form.numberPaper.placeholder
                                "
                            />
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="vpb-form-group">
                            <QcLabel
                                :label="dataLocale.form.depositoryAccount.label"
                            />
                            <QcInput
                                v-model="
                                    roleUserConfirmStore.currentListUserChoose
                                "
                                :disabled="inputDisabled"
                                outlined
                                name="depositoryAccount"
                                :placeholder="
                                    dataLocale.form.depositoryAccount
                                        .placeholder
                                "
                            >
                                <template v-slot:append>
                                    <q-btn
                                        flat
                                        no-caps
                                        color="primary"
                                        size="sm"
                                        round
                                        @click="addDepositoryAccount"
                                    >
                                        <q-icon
                                            name="add_circle_outline"
                                        ></q-icon>
                                    </q-btn>
                                </template>
                            </QcInput>
                            <q-tooltip
                                v-if="
                                    roleUserConfirmStore.currentListUserChoose
                                "
                            >
                                {{ roleUserConfirmStore.currentListUserChoose }}
                            </q-tooltip>
                        </div>
                        <div class="vpb-form-group vpb-form-group__bottom">
                            <QcLabel :label="dataLocale.form.typePaper.label" />
                            <QcSelect
                                :disabled="inputDisabled"
                                :placeholder="
                                    dataLocale.form.typePaper
                                        .placeholder
                                "
                                name="typePaper"
                                :options="documentOption"
                                map-options
                            />
                        </div>
                    </div>
                </div>
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
                            ? dataLocale.form.btnConfirm
                            : dataLocale.form.btnSave
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
                    >{{ dataLocale.form.btnDelete }}
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
                    @click="onReject"
                    :loading="isSubmitting"
                    >{{ dataLocale.form.btnReject }}
                </q-btn>
                <q-btn
                    padding="12px 31.5px"
                    icon="check"
                    no-caps
                    color="primary"
                    size="lg"
                    class="qc-btn qc-btn--primary-second"
                    unelevated
                    @click="onApprove"
                    :loading="isSubmitting"
                    >{{ dataLocale.form.btnApprove }}
                </q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import {
    defineComponent,
    onMounted,
    computed,
    onBeforeMount,
    watch,
    ref,
} from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useDialogPluginComponent } from "quasar";
import { useI18n } from "vue-i18n";
import SearchAfmastId from "src/components/manage/SearchAfmastIdForm.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";
import { useRoleUserConfirmStore } from "stores/roleUserConfirm";
import componentOptionsMixin from "src/common/mixins/componentOptions";
import CommonDocument from "src/common/statues/commonDocument";

export default defineComponent({
    name: "UserForm",
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
        tranId: Number,
    },
    emits: [...useDialogPluginComponent.emits],
    mixins: [componentOptionsMixin],
    setup(props) {
        const { t } = useI18n();

        const { dialogRef, onDialogCancel } = useDialogPluginComponent();
        const { openDialog: openDialogSearchAfmastId } =
            useOpenDialog(SearchAfmastId);

        const titleByAction = {
            create: t("title.addUser"),
            detail: t("title.detail"),
            update: t("title.update"),
            delete: t("title.delete"),
            approve: t("title.approve"),
        };

        const dataLocale = {
            title: titleByAction[props.action],
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
                password: {
                    label: t("field.password.label"),
                    placeholder: "field.password.placeholder",
                },
                phone: {
                    label: t("field.phone.label"),
                    placeholder: t("field.phone.placeholder"),
                },
                depositoryAccount: {
                    label: t("field.depositoryAccount.label"),
                    placeholder: t("field.depositoryAccount.placeholder"),
                },
                typePaper: {
                    label: t("field.typePaper.label"),
                    placeholder: t("field.typePaper.placeholder"),
                },
                numberPaper: {
                    label: t("field.numberPaper.label"),
                    placeholder: t("field.numberPaper.placeholder"),
                },
                autoApprove: {
                    label: t("user.approveAutoLabel"),
                    placeholder: t("field.numberPaper.placeholder"),
                },
                btnConfirm: t("button.confirm"),
                btnSave: t("button.save"),
                btnDelete: t("button.delete"),
                btnReject: t("button.reject"),
                btnApprove: t("button.approve"),
            },
        };

        const inputDisabled = computed(() => {
            return ["delete", "detail", "approve"].includes(props.action);
        });

        const roleUserConfirmStore = useRoleUserConfirmStore();

        const dataForm = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const skeleton = ref(false);

        const autoApprove = ref(false);

        const yupObject = {
            name: yup
                .string()
                .required(
                    `${dataLocale.form.name.label} ${t("validation.required")}`
                )
                .label(dataLocale.form.name.label)
                .typeError(
                    `${dataLocale.form.name.label} ${t("validation.required")}`
                ),
            username: yup
                .string()
                .required(
                    `${dataLocale.form.username.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.username.label)
                .typeError(
                    `${dataLocale.form.username.label} ${t(
                        "validation.required"
                    )}`
                ),
            email: yup
                .string()
                .required(
                    `${dataLocale.form.email.label} ${t("validation.required")}`
                )
                .email()
                .label(dataLocale.form.email.label)
                .typeError(
                    `${dataLocale.form.email.label} ${t("validation.required")}`
                ),
            password: yup
                .string()
                .required(
                    `${dataLocale.form.password.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.password.label)
                .typeError(
                    `${dataLocale.form.password.label} ${t(
                        "validation.required"
                    )}`
                ),
            phone: yup
                .string()
                .required(
                    `${dataLocale.form.phone.label} ${t("validation.required")}`
                )
                .label(dataLocale.form.phone.label)
                .typeError(
                    `${dataLocale.form.phone.label} ${t("validation.required")}`
                ),
            numberPaper: yup
                .string()
                .required(
                    `${dataLocale.form.numberPaper.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.numberPaper.label)
                .typeError(
                    `${dataLocale.form.numberPaper.label} ${t(
                        "validation.required"
                    )}`
                ),
            typePaper: yup
                .string()
                .required(
                    `${dataLocale.form.typePaper.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.typePaper.label)
                .typeError(
                    `${dataLocale.form.typePaper.label} ${t(
                        "validation.required"
                    )}`
                ),
            depositoryAccount: yup
                .string()
                .required(
                    `${dataLocale.form.depositoryAccount.label} ${t(
                        "validation.required"
                    )}`
                )
                .label(dataLocale.form.depositoryAccount.label)
                .typeError(
                    `${dataLocale.form.depositoryAccount.label} ${t(
                        "validation.required"
                    )}`
                ),
        };

        onMounted(async () => {
            if (props.action === "create") {
                return;
            }

            roleUserConfirmStore.currentListUserChoose = "";

            getDetailUser();
        });

        watch(
            () => roleUserConfirmStore.currentListUserChoose,
            () => {
                setFieldValue(
                    "depositoryAccount",
                    roleUserConfirmStore.currentListUserChoose
                );
            }
        );

        const getDetailUser = async () => {
            const requestData =
                props?.action !== "approve"
                    ? await roleUserConfirmStore.getDetailUsersOnline(props?.id)
                    : await roleUserConfirmStore.getDetailUsersOnlineTrans(
                          props?.tranId
                      );
            if (!requestData) {
                onDialogCancel();
            }
            filterDataUser(roleUserConfirmStore.currentUserDetail);
        };

        const paperID = {
            CMND: "01",
            "Hộ chiếu": "02",
            "Giấy CN ĐKKD": "01",
            GPTL: "03",
        };

        const filterDataUser = (data) => {
            setFieldValue("username", data?.userName);
            setFieldValue("name", data?.STAFF_NAME);
            setFieldValue("email", data?.EMAIL);
            setFieldValue("password", "      ");
            setFieldValue("phone", data?.PHONE);
            setFieldValue(
                "depositoryAccount",
                data?.lstAfmast.toString() ?? " "
            );
            setFieldValue(
                "typePaper",
                CommonDocument.getDescription(data?.IDTYPE)
            );
            setFieldValue("numberPaper", data?.IDCODE);
        };

        if (props.id) {
            yupObject.password = yup
                .string()
                .nullable()
                .label(t("field.password.label"));

            yupObject.depositoryAccount = yup
                .string()
                .nullable()
                .label(t("field.depositoryAccount.label"));
        }

        const schema = yup.object(yupObject);

        const {
            handleSubmit,
            isSubmitting,
            setValues,
            setFieldValue,
            values: valForm,
        } = useForm({
            validationSchema: schema,
        });

        const onSubmit = handleSubmit(async (values) => {
            const params = {
                userName: values?.name,
                STAFF_NAME: values?.username,
                PHONE: values?.phone,
                EMAIL: values?.email,
                IDTYPE: values?.typePaper,
                IDCODE: values?.numberPaper,
                strAfmastID: roleUserConfirmStore.currentListUserChooseId,
            };

            try {
                if (props?.action === "create") {
                    const createNewUser =
                        roleUserConfirmStore?.addNewUserAccount(params);

                    if (createNewUser) {
                        roleUserConfirmStore.currentListUserChooseId = "";
                    }

                    onDialogCancel();
                } else if (props?.action === "update") {
                    const createNewUser = roleUserConfirmStore?.editUserAccount(
                        {
                            ...params,
                            id: props?.id,
                            // IDTYPE: paperID[params.IDTYPE],
                            IDTYPE: paperID[params.IDTYPE]
                                ? paperID[params.IDTYPE]
                                : params.IDTYPE,
                        }
                    );

                    if (createNewUser) {
                        roleUserConfirmStore.currentListUserChooseId = "";
                    }
                }
            } catch (error) {
                throw error;
            }
        });

        const onApprove = async () => {
            const params = {
                id: props?.id,
                tranid: props?.tranId,
            };
            const requestApprove =
                await roleUserConfirmStore?.requestApproveUser(params);

            if (requestApprove) {
                onDialogCancel();
            }
        };

        const onReject = async () => {
            const requestReject = await roleUserConfirmStore?.requestRejectUser(
                props?.tranId
            );

            if (requestReject) {
                onDialogCancel();
            }
            onDialogCancel();
        };

        const onDelete = async () => {
            const requestDelete = await roleUserConfirmStore.deleteUsersOnline(
                props?.id
            );

            onDialogCancel();
        };

        const addDepositoryAccount = () => {
            openDialogSearchAfmastId();
        };

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
            onApprove,
            onReject,
            onDelete,
            addDepositoryAccount,
            roleUserConfirmStore,
        };
    },
});
</script>
<style scoped></style>
