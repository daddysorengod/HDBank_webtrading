<template>
    <q-btn no-caps type="primary"
           text-color="primary" outline
           @click="setLocale(commonStore.locale === 'vi' ? dataLanguage.en.locale : dataLanguage.vi.locale)">
        <img style="width: 22px; margin-right: 5px;"
             :src="commonStore.locale === 'vi' ? dataLanguage.en.icon : dataLanguage.vi.icon" alt="icon" />
        <div>
            {{ commonStore.locale === 'vi' ? dataLanguage.en.name : dataLanguage.vi.name }}
        </div>
    </q-btn>
</template>

<script>
import { defineComponent } from "vue";
import useMultipleLanguage from "src/composables/commons/useMultipleLanguage";

export default defineComponent({
    name: "MultipleLanguage",
    setup() {
        const {commonStore, dataLanguage, setLocale} = useMultipleLanguage();

        return {
            commonStore,
            dataLanguage,
            setLocale
        }
    }
});
</script>

<style scoped>

</style>
