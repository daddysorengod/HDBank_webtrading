import { createI18n } from "vue-i18n";
import messages from "src/i18n";

const i18n = createI18n({
    legacy: false,
    locale: "vi",
    messages,
});

export default ({ app }) => {
    // Set i18n instance on app
    app.use(i18n);
};

export { i18n };
