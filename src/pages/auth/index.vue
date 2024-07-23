<template>
    <q-card style="width: 30%">
        <q-card-section>
            <q-avatar
                color="primary"
                class="absolute-center shadow-10"
                size="80px"
            >
                <img
                    src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
                />
            </q-avatar>
        </q-card-section>

        <q-card-section class="q-mt-lg q-gutter-y-md">
            <QCInput filled name="username" label="Tài khoản" :dense="false" />
            <QCInput
                filled
                name="password"
                label="Mật khẩu"
                type="password"
                :dense="false"
            />
            <q-btn
                label="Đăng nhập"
                color="primary"
                class="full-width"
                :loading="isSubmitting"
                @click="onSubmit"
            />
        </q-card-section>

        <q-card-section class="social">
            <div class="flex justify-between">
                <q-separator />
                <p class="text-subtitle1 text-center">Đăng nhập bằng</p>
                <q-separator />
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import QCInput from "components/commons/QCInput";

export default defineComponent({
    name: "Auth",
    components: { QCInput },
    setup(props, {}) {
        const social = {
            gg: "google",
            fb: "facebook",
        };
        const router = useRouter();

        const schema = yup.object({
            username: yup.string().required().label("Tài khoản"),
            password: yup.string().required().label("Mật khẩu"),
        });

        const { handleSubmit, isSubmitting } = useForm({
            validationSchema: schema,
        });

        const onSubmit = handleSubmit(async (values) => {
            await router.push({ name: "home" });
        });

        return {
            isSubmitting,
            onSubmit,
        };
    },
});
</script>

<style scoped></style>
