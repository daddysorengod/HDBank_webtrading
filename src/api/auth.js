import { api } from "boot/axios";
import axios from "axios";
import { getQueryURL } from "src/helpers/getQueryURL";
import { TEMP_TOKEN_KEY } from "src/common/constant";
import { LocalStorage } from "quasar";

export const login = (data) => api.post("login/GeneratetokenV2", data);

//DUYNT - 20230804
export const logout = () => api.post("logout");

export const ssoLogin = (data) => api.post(getQueryURL("SSO_LOGIN", data));
export const userData = () => api.get("v1/user-data");
export const resetPassword = (params) =>
    api.post(getQueryURL("/change-pass", params));
export const changePassword = (params) =>
    api.post(getQueryURL("customerbalance/change-password", params));
export const changePasswordFistTime = async (params) => {
    const headers = {
        Authorization: `Bearer ${LocalStorage.getItem(TEMP_TOKEN_KEY)}`,
        Accept: "application/json",
    };
    const res = await axios
        .post(
            getQueryURL(
                `${process.env.VUE_APP_API}customerbalance/change-password`,
                params
            ),
            {},
            { headers }
        )
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log(error);
        });
    return res;
};
