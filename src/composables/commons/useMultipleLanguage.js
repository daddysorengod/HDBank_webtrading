import { useI18n } from "vue-i18n";
import { useCommonStore } from "stores/common";
import { LocalStorage } from "quasar";
import { onMounted } from "vue";

export default function useMultipleLanguage() {
    const { locale } = useI18n({useScope: "global"});

    const commonStore = useCommonStore();

    const dataLanguage = {
        vi: {
            icon: '/icons/vp-vietnam.png',
            name: 'Việt Nam',
            locale: 'vi'
        },
        en: {
            icon: '/icons/vp-usa.png',
            name: 'English',
            locale: 'en-US'
        }
    };

    const initLocale = () => {

        const lang = LocalStorage.getItem('lang');

        locale.value = lang ?? 'vi';

        commonStore.setLocale(locale.value);
    }

    const setLocale = (lang) => {

        locale.value = lang;

        commonStore.setLocale(locale.value);
    }

    onMounted(() => {
        initLocale();
    })

    return {
        setLocale,
        commonStore,
        dataLanguage
    };
}
