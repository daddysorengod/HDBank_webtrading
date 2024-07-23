import { defineStore } from "pinia";
import {
    ACCESS_LIST_AFMASTS,
    ACCESS_TOKEN_KEY,
    SUCCESS_CODE,
    USER_DATA_KEY,
    ACTIVE_CODE,
    PERMISSIONS_KEY,
    TEMP_TOKEN_KEY,
    UNAUTHORIZED_CODE
} from "src/common/constant";
import {
    login,
    ssoLogin,
    resetPassword,
    changePassword,
    changePasswordFistTime,
    logout
} from "src/api/auth";
import { LocalStorage } from "quasar";
import { isArray } from "lodash";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null,
        listDeposAccNo: [],
        listDeposNameById: [],
        listPermissions: [],
        firstLoginToken: null,
    }),
    getters: {
        isAuthenticated: () => {
            return () => !!LocalStorage.has(ACCESS_TOKEN_KEY);
        },
        depoAccNo: (state) => {
            return (account) =>
                state.listDeposAccNo.find((item) => item.Afacctno === account);
        },
    },
    actions: {
        async login(params) {
            try {
                const { data } = await login(params);

                if (data.Code === SUCCESS_CODE) {
                    /// check dk o day
                    if (data.UserInfo?.first_time) {
                        this.firstLoginToken = data.Token;
                        LocalStorage.set(TEMP_TOKEN_KEY, data.Token);
                        return data;
                    }
                    this.user = data.UserInfo;
                    this.token = data.Token;
                    this.listDeposAccNo = data.ListAfmasts;

                    const option = data?.FunctionsInfo.map((item) => item.ID);

                    const permissions =
                        data?.FunctionsInfo && isArray(data.FunctionsInfo)
                            ? data.FunctionsInfo.map((item) => item.ID)
                            : [];

                    this.listPermissions = permissions;
                    LocalStorage.set(ACCESS_TOKEN_KEY, data.Token);
                    LocalStorage.set(ACCESS_LIST_AFMASTS, data.ListAfmasts);
                    LocalStorage.set(USER_DATA_KEY, data.UserInfo);
                    LocalStorage.set(PERMISSIONS_KEY, permissions);
                }
                console.log(data);
                return data;
            } catch (e) {
                throw e;
            }
        },
        async ssoLogin(params) {
            try {
                const { data } = await ssoLogin(params);

                if (data.Code === SUCCESS_CODE) {
                    /// check dk o day
                    if (data.UserInfo?.first_time) {
                        this.firstLoginToken = data.Token;
                        LocalStorage.set(TEMP_TOKEN_KEY, data.Token);
                        return data;
                    }
                    this.user = data.UserInfo;
                    this.token = data.Token;
                    this.listDeposAccNo = data.ListAfmasts;

                    const option = data?.FunctionsInfo.map((item) => item.ID);

                    const permissions =
                        data?.FunctionsInfo && isArray(data.FunctionsInfo)
                            ? data.FunctionsInfo.map((item) => item.ID)
                            : [];

                    this.listPermissions = permissions;
                    LocalStorage.set(ACCESS_TOKEN_KEY, data.Token);
                    LocalStorage.set(ACCESS_LIST_AFMASTS, data.ListAfmasts);
                    LocalStorage.set(USER_DATA_KEY, data.UserInfo);
                    LocalStorage.set(PERMISSIONS_KEY, permissions);
                }
                console.log(data);
                return data;
            } catch (e) {
                throw e;
            }
        },
        async logoutSSO() {
            try {

                const { data } = await logout();

                console.log("DATA.CODE=" + data.Code);

                if (data.Code === SUCCESS_CODE){
                    LocalStorage.remove(ACCESS_TOKEN_KEY);
                    LocalStorage.remove(ACCESS_LIST_AFMASTS);
                    LocalStorage.remove(USER_DATA_KEY);
                    LocalStorage.remove(ACTIVE_CODE);
                    LocalStorage.remove(PERMISSIONS_KEY);
                    return true;
                }
                
                return false;
            } catch (e) {
                throw e;       
            }
        },

        async logout() {

                LocalStorage.remove(ACCESS_TOKEN_KEY);
                LocalStorage.remove(ACCESS_LIST_AFMASTS);
                LocalStorage.remove(USER_DATA_KEY);
                LocalStorage.remove(ACTIVE_CODE);
                LocalStorage.remove(PERMISSIONS_KEY);
            
        },
        userData() {
            const userData = LocalStorage.getItem(USER_DATA_KEY);
            const permissions = LocalStorage.getItem(PERMISSIONS_KEY);

            if (!userData) {
                LocalStorage.remove(ACCESS_TOKEN_KEY);
                throw new Error("Không có thông tin user");
            }

            this.user = userData;
            this.listPermissions = permissions;
        },

        async resetPassword(params) {
            try {
                const { data } = await resetPassword(params);

                if (data.Code !== SUCCESS_CODE) {
                    return null;
                }

                return data;
            } catch (error) {}
        },

        async changePassword(params) {
            try {
                const { data } = await changePassword(params);

                if (data.Code !== SUCCESS_CODE) {
                    return null;
                }

                return data;
            } catch (error) {}
        },
        async changePasswordFistTime(params) {
            try {
                console.log("here")
                const { data } = await changePasswordFistTime(params);
                
                if (data.Code !== SUCCESS_CODE) {
                    return null;
                }

                return data;
            } catch (error) {
                console.log(error)
            }
        },
    },
});
