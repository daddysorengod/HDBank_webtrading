<template>
    <q-img
        :src="preview"
        :ratio="1"
        class="q-mb-md rounded-borders"
        :width="width"
        height="160px"
    />

    <q-file
        filled
        v-model="inputValue"
        label=""
        :style="{ width }"
        :error="!!errorMessage"
        :error-message="errorMessage"
        dense
    >
        <template v-slot:label>
            <p class="text-center text-bold">{{ dataLocale.choosePicture }}</p>
        </template>
    </q-file>
</template>

<script>
import { defineComponent, watch, ref, computed } from "vue";
import { getBase64 } from "src/common/utils/helper";
import { useField } from "vee-validate";
import { useI18n } from "vue-i18n/dist/vue-i18n.esm-bundler";

export default defineComponent({
    name: "QCAvatarUpload",
    props: {
        width: {
            type: String,
            default: "100%",
        },
        name: {
            type: String,
        },
        avatar_url: {
            type: String,
        },
    },
    setup(props, { emit }) {
        const preview_default = "/default-avatar.png";

        const { t } = useI18n();

        const dataLocale = {
            choosePicture: t("function.choosePicture"),
        };

        const file = ref();

        const {
            value: inputValue,
            errorMessage,
            handleChange,
        } = useField(props.name);

        const preview = ref(
            props.avatar_url ? props.avatar_url : preview_default
        );

        watch(inputValue, () => {
            getBase64(inputValue.value)
                .then((res) => (preview.value = res))
                .catch(() => (preview.value = preview_default));
        });

        return {
            file,
            preview,
            inputValue,
            errorMessage,
            handleChange,
            dataLocale,
        };
    },
});
</script>

<style scoped></style>
