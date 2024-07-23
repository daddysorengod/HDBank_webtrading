<template>
    <div class="vpb-auth-reset-password">
        <auth-wrapper
            img="images/vp-reset-password.png"
            :title="
                dataResetPassword.success
                    ? dataLocale.success.title
                    : dataLocale.title
            "
            reverse
        >
            <div v-if="!dataResetPassword.success" class="vpb-auth-form">
                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.username.label" />
                    <QcInput
                        outlined
                        name="username"
                        :placeholder="dataLocale.form.username.placeholder"
                    />
                </div>

                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.email.label" />
                    <QcInput
                        outlined
                        name="email"
                        :placeholder="dataLocale.form.email.placeholder"
                    />
                </div>

                <div class="vpb-form-group">
                    <QcLabel :label="dataLocale.form.phone.label" />
                    <QcInput
                        outlined
                        name="phone"
                        :placeholder="dataLocale.form.phone.placeholder"
                    />
                </div>

                <div class="vpb-form-group">
                    <q-btn
                        no-caps
                        color="primary"
                        size="lg"
                        class="full-width q-btn--primary-special"
                        unelevated
                        @click="onSubmit"
                        >{{ $t(dataLocale.btn) }}</q-btn
                    >
                </div>

                <div class="vpb-auth-form-extra">
                    <!-- <router-link
                        :to="{ name: 'login' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.featureLogin) }}</router-link
                    > -->
                    <!-- <router-link
                        :to="{ name: 'sso-login' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.featureLogin) }}</router-link
                    > -->
                    <router-link
                        v-if="isHaveToken.value"
                        :to="{ name: 'changePassword' }"
                        class="vpb-auth-form-extra--item"
                        >{{ $t(dataLocale.featureChangePassword) }}</router-link
                    >
                </div>
            </div>
            <div v-else class="vpb-reset-password-success">
                <p class="vpb-reset-password-success--message">
                    {{ $t(dataLocale.success.message) }}
                </p>
                <q-btn
                    no-caps
                    color="primary"
                    size="lg"
                    class="full-width q-btn--primary-second"
                    unelevated
                    @click="backToLogin"
                    >{{ $t(dataLocale.success.btn) }}</q-btn
                >
            </div>
        </auth-wrapper>
    </div>
</template>

<script>
import AuthWrapper from "src/components/auth/AuthWrapper.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "stores/auth";

export default {
    name: "ResetPassword",
    components: { AuthWrapper },
    setup() {
        const router = useRouter();

        const { t } = useI18n();

        const authStore = useAuthStore();

        const dataLocale = ref({
            title: "auth.resetPassword.title",
            form: {
                username: {
                    label: "auth.resetPassword.username.label",
                    placeholder: "auth.resetPassword.username.placeholder",
                },
                email: {
                    label: "auth.resetPassword.email.label",
                    placeholder: "auth.resetPassword.email.placeholder",
                },
                phone: {
                    label: "auth.resetPassword.phone.label",
                    placeholder: "auth.resetPassword.phone.placeholder",
                },
            },
            btn: "auth.resetPassword.btn",
            featureLogin: "auth.login.title",
            featureChangePassword: "auth.changePassword.title",
            success: {
                title: "auth.resetPassword.success.title",
                message: "auth.resetPassword.success.message",
                btn: "auth.resetPassword.success.btn",
            },
        });

        const isHaveToken = ref(false);

        onMounted(() => {
            if (authStore?.token) {
                isHaveToken.value = true;
            }
        });

        const yupObject = ref({
            username: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.username.label)} ${t(
                        "validation.required"
                    )}`
                ),
            email: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.email.label)} ${t(
                        "validation.required"
                    )}`
                )
                .email(
                    `${t(dataLocale.value.form.email.label)} ${t(
                        "validation.email"
                    )}`
                )
                .label(t(dataLocale.value.form.email.label)),
            phone: yup
                .string()
                .required(
                    `${t(dataLocale.value.form.username.label)} ${t(
                        "validation.required"
                    )}`
                )
                .label(t(dataLocale.value.form.username.label))
                .typeError(
                    `${t(dataLocale.value.form.username.label)} ${t(
                        "validation.required"
                    )}`
                ),
        });

        const schema = yup.object(yupObject.value);

        onMounted(async () => {
            autoFillUserData();
        });

        const {
            handleSubmit,
            setFieldValue,
            values: valForm,
        } = useForm({
            validationSchema: schema,
        });

        const dataResetPassword = ref({
            visiblePwd: false,
            success: false,
        });

        const onSubmit = handleSubmit(async (values) => {
            const params = {
                Email: values.email,
                Username: values.username,
            };
            const requestResetData = await authStore.resetPassword(params);

            if (requestResetData) {
                dataResetPassword.value.success = true;
            }
        });

        const backToLogin = async () => {
            // await router.push({ name: "login" });
            await router.push({ name: "sso-login" });
        };

        const autoFillUserData = async () => {
            setFieldValue("username", authStore?.user?.UserName);
            setFieldValue("email", authStore?.user?.Email);
            setFieldValue("phone", authStore?.user?.Mobile);
        };

        return {
            dataLocale,
            dataResetPassword,
            onSubmit,
            backToLogin,
            autoFillUserData,
            authStore,
            isHaveToken,
        };
    },
};
</script>
