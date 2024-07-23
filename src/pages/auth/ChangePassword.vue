<template>
    <div class="vpb-auth-change-password">
        <auth-wrapper
            img="images/vp-login.png"
            :title="
                dataChangePassword.success
                    ? dataLocale.success.title
                    : dataLocale.title
            "
        >
            <div v-if="!dataChangePassword.success" class="vpb-auth-form">
                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.passwordCurrent.label" />
                    <QcInput
                        outlined
                        name="passwordCurrent"
                        :placeholder="
                            dataLocale.form.passwordCurrent.placeholder
                        "
                        :type="
                            !dataChangePassword.visiblePwdCurrent
                                ? 'password'
                                : 'text'
                        "
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="
                                    dataChangePassword.visiblePwdCurrent
                                        ? 'visibility'
                                        : 'visibility_off'
                                "
                                class="cursor-pointer"
                                @click="
                                    dataChangePassword.visiblePwdCurrent =
                                        !dataChangePassword.visiblePwdCurrent
                                "
                            />
                        </template>
                    </QcInput>
                </div>

                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.passwordNew.label" />
                    <QcInput
                        outlined
                        name="passwordNew"
                        :placeholder="dataLocale.form.passwordNew.placeholder"
                        :type="
                            !dataChangePassword.visiblePwdNew
                                ? 'password'
                                : 'text'
                        "
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="
                                    dataChangePassword.visiblePwdNew
                                        ? 'visibility'
                                        : 'visibility_off'
                                "
                                class="cursor-pointer"
                                @click="
                                    dataChangePassword.visiblePwdNew =
                                        !dataChangePassword.visiblePwdNew
                                "
                            />
                        </template>
                    </QcInput>
                </div>

                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.passwordRepeat.label" />
                    <QcInput
                        outlined
                        name="passwordRepeat"
                        :placeholder="
                            dataLocale.form.passwordRepeat.placeholder
                        "
                        :type="
                            !dataChangePassword.visiblePwdRepeat
                                ? 'password'
                                : 'text'
                        "
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="
                                    dataChangePassword.visiblePwdRepeat
                                        ? 'visibility'
                                        : 'visibility_off'
                                "
                                class="cursor-pointer"
                                @click="
                                    dataChangePassword.visiblePwdRepeat =
                                        !dataChangePassword.visiblePwdRepeat
                                "
                            />
                        </template>
                    </QcInput>
                </div>

                <div class="vpb-form-group">
                    <q-btn
                        no-caps
                        color="primary"
                        size="lg"
                        class="full-width q-btn--primary-special"
                        unelevated
                        @click="onSubmit"
                        >{{ $t(dataLocale.btn) }}
                    </q-btn>
                </div>

                <div class="vpb-auth-form-extra">
                    <!-- <router-link
                        :to="{ name: 'login' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.featureLogin) }}
                    </router-link> -->
                    <router-link
                        :to="{ name: 'sso-login' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.featureLogin) }}
                    </router-link>
                    <router-link
                        :to="{ name: 'resetPassword' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.featureResetPassword) }}
                    </router-link>
                </div>
            </div>
            <div v-else class="vpb-change-password-success">
                <p class="vpb-change-password-success--message">
                    {{ $t(dataLocale.success.message) }}
                </p>
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width q-btn--primary-second"
                    unelevated
                    @click="backToLogin"
                    >{{ $t(dataLocale.success.btn) }}
                </q-btn>
            </div>
        </auth-wrapper>
    </div>
</template>

<script>
import AuthWrapper from "src/components/auth/AuthWrapper.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";
import { useForm } from "vee-validate";
import { useAuthStore } from "stores/auth";
import { LocalStorage } from "quasar";
import { ACCESS_TOKEN_KEY, TEMP_TOKEN_KEY } from "src/common/constant";
import BaseModal from "src/components/transaction/BaseModal.vue";
import useOpenDialog from "src/composables/commons/useOpenDialog";

export default {
    components: { AuthWrapper },
    name: "ChangePassword",

    setup() {
        const router = useRouter();

        const { t } = useI18n();

        const authStore = useAuthStore();

        const { openDialog: openModal } = useOpenDialog(BaseModal);

        const dataLocale = ref({
            title: "auth.changePassword.title",
            form: {
                passwordCurrent: {
                    label: "auth.changePassword.passwordCurrent.label",
                    placeholder:
                        "auth.changePassword.passwordCurrent.placeholder",
                },
                passwordNew: {
                    label: "auth.changePassword.passwordNew.label",
                    placeholder: "auth.changePassword.passwordNew.placeholder",
                },
                passwordRepeat: {
                    label: "auth.changePassword.passwordRepeat.label",
                    placeholder:
                        "auth.changePassword.passwordRepeat.placeholder",
                },
            },
            btn: "auth.changePassword.btn",
            featureLogin: "auth.login.title",
            featureResetPassword: "auth.resetPassword.title",
            success: {
                title: "auth.changePassword.success.title",
                message: "auth.changePassword.success.message",
                btn: "auth.changePassword.success.btn",
            },
            featureBack: "button.back",
        });

        const yupObject = ref({
            passwordCurrent: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.passwordCurrent.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(t(dataLocale.value.form.passwordCurrent.label))
                .typeError(
                    `${t(dataLocale.value.form.passwordCurrent.label)} ${t(
                        "validation.required"
                    )}`
                )
                .min(
                    8,
                    `${t(dataLocale.value.form.passwordCurrent.label)} ${t(
                        "validation.passwordLength"
                    )}`
                ),
            passwordNew: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.passwordNew.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(t(dataLocale.value.form.passwordNew.label))
                .typeError(
                    `
                    ${t(dataLocale.value.form.passwordNew.label)}
                    ${t("validation.required")}`
                )
                .min(
                    8,
                    `${t(dataLocale.value.form.passwordCurrent.label)} ${t(
                        "validation.passwordLength"
                    )}`
                )
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&^+,:;=|'<>.()\-\[\]\{\}\\/~`\"_])[A-Za-z\d@$#!%*?&^+,:;=|'<>.()\-\[\]\{\}\\/~`\"_]{8,}$/,
                    // ${t(dataLocale.value.form.passwordNew.label)}
                    ` ${t("validation.passwordValidate")}`
                ),
            passwordRepeat: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.passwordRepeat.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(t(dataLocale.value.form.passwordRepeat.label))
                .typeError(
                    `${t(dataLocale.value.form.passwordRepeat.label)} ${t(
                        "validation.required"
                    )}`
                )
                .min(
                    8,
                    `${t(dataLocale.value.form.passwordCurrent.label)} ${t(
                        "validation.passwordLength"
                    )}`
                )
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&^+,:;=|'<>.()\-\[\]\{\}\\/~`\"_])[A-Za-z\d@$#!%*?&^+,:;=|'<>.()\-\[\]\{\}\\/~`\"_]{8,}$/,
                    // ${t(dataLocale.value.form.passwordNew.label)}
                    ` ${t("validation.passwordValidate")}`
                )
                .oneOf(
                    [yup.ref("passwordNew"), null],
                    t("validation.passwordRepeat")
                ),
        });

        const schema = yup.object(yupObject.value);

        const {
            handleSubmit,
            setFieldValue,
            values: valForm,
        } = useForm({
            validationSchema: schema,
        });

        const dataChangePassword = ref({
            visiblePwdCurrent: false,
            visiblePwdNew: false,
            visiblePwdRepeat: false,
            success: false,
        });

        const onSubmit = handleSubmit(async (values) => {
            const params = {
                password: values.passwordCurrent,
                newPassword: values.passwordNew,
                checkNewPassword: values.passwordRepeat,
            };

            const isAuthenticated = !!LocalStorage.has(TEMP_TOKEN_KEY);
            if (isAuthenticated) {
                const requestResetData = await authStore.changePasswordFistTime(
                    params
                );
                if (requestResetData) {
                    LocalStorage.remove(TEMP_TOKEN_KEY);
                    dataChangePassword.value.success = true;
                    openModal({
                        title: "changePasswordAtFirstTime.successTitle",
                        onOkText: "changePasswordAtFirstTime.onOkText",
                        description: "changePasswordAtFirstTime.successDes",
                        // onOkPress: "login",
                        onOkPress: "sso-login",
                    });
                }
                return;
            }

            const requestResetData = await authStore.changePassword(params);

            if (requestResetData) {
                dataChangePassword.value.success = true;
            }
        });

        const backToLogin = async () => {
            // await router.push({ name: "login" });
            await router.push({ name: "sso-login" });
        };

        return {
            dataLocale,
            dataChangePassword,
            onSubmit,
            backToLogin,
        };
    },
};
</script>
