import { boot } from "quasar/wrappers";
import axios from "axios";
import { LoadingBar } from "quasar";
import { handleResponseNotify } from "src/common/utils/helper";
import { LocalStorage } from "quasar";
import { ACCESS_TOKEN_KEY } from "src/common/constant";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.VUE_APP_API });

const errorHandler = (error) => {
    LoadingBar.stop();

    handleResponseNotify(error.response);

    return Promise.reject(error);
};

api.interceptors.request.use((config) => {
    LoadingBar.start();

    config.headers = {
        Authorization: `Bearer ${LocalStorage.getItem(ACCESS_TOKEN_KEY)}`,
        Accept: "application/json",
    };

    return config;
}, errorHandler);

api.interceptors.response.use((response) => {
    LoadingBar.stop();

    handleResponseNotify(response);

    return response;
}, errorHandler);

export default boot(({ app }) => {
    // for use inside Vue files (Options API) through this.$axios and this.$api

    app.config.globalProperties.$axios = axios;
    // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
    //       so you won't necessarily have to import axios in each vue file

    app.config.globalProperties.$api = api;
    // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
    //       so you can easily perform requests against your app's API
});

export { api };
