<template>
    <div class="vpb-auth-login">
        <auth-wrapper img="images/vp-login.png" :title="dataLocale.title">
            <div class="vpb-auth-form">
                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.username.label" />
                    <QcInput
                        outlined
                        name="username"
                        :placeholder="dataLocale.form.username.placeholder"
                    />
                </div>

                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.password.label" />
                    <QcInput
                        outlined
                        name="password"
                        :placeholder="dataLocale.form.password.placeholder"
                        :type="!dataLogin.visiblePwd ? 'password' : 'text'"
                        :error-external="dataLogin.errorExternal"
                        @keyup.enter="onSubmit"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="
                                    dataLogin.visiblePwd
                                        ? 'visibility'
                                        : 'visibility_off'
                                "
                                class="cursor-pointer"
                                @click="
                                    dataLogin.visiblePwd = !dataLogin.visiblePwd
                                "
                            />
                        </template>
                    </QcInput>
                </div>

                <div class="vpb-form-group">
                    <q-btn
                        :loading="isSubmitting"
                        no-caps
                        color="primary"
                        size="lg"
                        class="full-width qc-btn--primary-special"
                        unelevated
                        @click="onSubmit"
                        >{{ $t(dataLocale.btn) }}</q-btn
                    >
                </div>

                <div class="vpb-auth-form-extra">
                    <router-link
                        :to="{ name: 'resetPassword' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.resetPassword) }}</router-link
                    >
                </div>
            </div>
        </auth-wrapper>
    </div>
</template>

<script>
import AuthWrapper from "src/components/auth/AuthWrapper.vue";
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { notifyFail } from "src/common/utils/helper";
import { MAJOR_CODE, SUCCESS_CODE } from "src/common/constant";
import useFilterRoutes from "src/composables/commons/useFilterRoutes";
import routes from "src/router/routes";
import BaseModal from "src/components/transaction/BaseModal.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";

export default {
    components: { AuthWrapper },
    name: "Login",
    setup() {
        const { t } = useI18n();

        const authStore = useAuthStore();

        const router = useRouter();

        const dataLocale = ref({
            title: "auth.login.title",
            form: {
                username: {
                    label: "auth.login.username.label",
                    placeholder: "auth.login.username.placeholder",
                },
                password: {
                    label: "auth.login.password.label",
                    placeholder: "auth.login.password.placeholder",
                },
            },
            changePassword: "auth.changePassword.title",
            resetPassword: "auth.resetPassword.title",
            btn: "auth.login.btn",
        });

        const { openDialog: openModal } = useOpenDialog(BaseModal);

        const dataLogin = ref({
            visiblePwd: false,
            errorExternal: "",
        });

        const schema = yup.object({
            username: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.username.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(t(dataLocale.value.form.username.label)),
            password: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.password.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(t(dataLocale.value.form.password.label)),
        });

        const { handleSubmit, isSubmitting } = useForm({
            validationSchema: schema,
        });

        const onSubmit = handleSubmit(async (values) => {
            try {
                const data = await authStore.login({
                    UserName: values.username,
                    Password: values.password,
                    IdCardNo: "1",
                    IsListedSecAcct: "Y",
                    Ip: "12345",
                });
                if (data.UserInfo?.first_time) {
                    openModal({
                        title: "changePasswordAtFirstTime.requestTitle",
                        // onCancelText: "changePasswordAtFirstTime.cancelText",
                        onOkText: "changePasswordAtFirstTime.onOkText",
                        description: "changePasswordAtFirstTime.requestDes",
                        onOkPress: "changePassword",
                    });
                    // onOk: onOkPress(),
                    // onOk: () => {
                    //     console.log(1);
                    //     router.push({
                    //         name: "changePassword",
                    //     });
                    // },
                    return;
                }
                if (data.Code === SUCCESS_CODE) {
                    const { filteredRoutes, nameRouteHome } = useFilterRoutes(
                        routes,
                        authStore.listPermissions
                    );
                    if (filteredRoutes && filteredRoutes.length)
                        router.push({
                            name: nameRouteHome || "approve-transaction",
                        });
                    else router.push({ name: "403" });
                } else if (data.Code === MAJOR_CODE) {
                    this.errorExternal = data.Message;
                } else {
                    notifyFail(data.Message || t("system.messageTryAgain"));
                }
            } catch (e) {
                console.log(e);
                notifyFail(t("system.messageTryAgain"));
            }
        });

        const onOkPress = () => {
            router.push({
                name: "changePassword",
            });
        };

        return {
            dataLocale,
            dataLogin,
            onSubmit,
            isSubmitting,
        };
    },
};
</script>
