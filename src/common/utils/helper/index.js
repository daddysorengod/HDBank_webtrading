import { i18n } from "boot/i18n";
import { Notify } from "quasar";
import * as constant from "src/common/constant";
import {
    EXCEPTION_CODE,
    MAJOR_CODE,
    MAP_FIELD_BODY,
    MAP_FIELD_PARAMS,
    SUCCESS_CODE,
    DUPLICATE_TRANSACTION,
    EXPIRE_CODE,
    NOTFOUND_CODE,
    WRONG_OTP,
    OUTOFTIME,
    PACKAGE_ERROR,
    UNAUTHORIZED_CODE,
    INTERNAL_SERVER_ERROR,
} from "src/common/constant";
import moment from "moment";
import { useAuthStore } from "stores/auth";
import { invert } from "lodash";
import { cloneDeep } from "lodash";

const freeze = (obj) => Object.freeze(obj);

const translate = (path) => i18n.global?.t(path);

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const handleResponseNotify = (response) => {
    const authStore = useAuthStore();

    if (
        [200, 201].includes(response.status) &&
        response.config.method !== "get"
    ) {
        if (
            response?.data?.Code === SUCCESS_CODE
            // && response?.data?.Message
        )
            Notify.create({
                type: "positive",
                message:
                    response?.data?.Message ||
                    translate("responseMessage.success"),
                position: "bottom-right",
            });
        else if (
            response?.data?.Code === EXCEPTION_CODE ||
            response?.data?.Code === MAJOR_CODE
        ) {
            Notify.create({
                type: "negative",
                message:
                    response?.data?.Message ||
                    translate("responseMessage.tryAgainLater"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === DUPLICATE_TRANSACTION) {
            Notify.create({
                type: "negative",
                message:
                    response?.data?.Message ||
                    translate("responseMessage.tryAgainLater"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === EXPIRE_CODE) {
            Notify.create({
                type: "negative",
                message: translate("responseMessage.expiredOTP"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === NOTFOUND_CODE) {
            Notify.create({
                type: "negative",
                message:
                    response?.data?.Message ||
                    translate("responseMessage.tryAgainLater"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === WRONG_OTP) {
            Notify.create({
                type: "negative",
                message: translate("responseMessage.otpFail"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === OUTOFTIME) {
            Notify.create({
                type: "negative",
                message: translate("responseMessage.otpFail"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === PACKAGE_ERROR) {
            Notify.create({
                type: "negative",
                message: translate("responseMessage.errorOccurred"),
                position: "bottom-right",
            });
        } else if (response?.data?.Code === INTERNAL_SERVER_ERROR) {
            Notify.create({
                type: "negative",
                message:
                    response?.data?.Message ||
                    translate("responseMessage.errorOccurred"),
                position: "bottom-right",
            });
        }
    } else if (response.status === 401) {
        Notify.create({
            type: "negative",
            message: translate("responseMessage.loginToContinue"),
            position: "bottom-right",
        });
        authStore.logout();
        window.location.reload();
    } else if (response.status === 601) {
        Notify.create({
            type: "warning",
            message: translate("maintenancePage.des"),
            position: "bottom-right",
        });
        window.location.replace("/maintenance");
    } else if (![200, 201, 401].includes(response.status)) {
        Notify.create({
            type: "negative",
            message: translate("responseMessage.tryAgainLater2"),
            position: "bottom-right",
        });
    }
};

const notifySuccess = (message) => {
    Notify.create({
        type: "positive",
        message: message,
        position: "bottom-right",
    });
};

const notifyFail = (message) => {
    Notify.create({
        type: "negative",
        message: message,
        position: "bottom-right",
    });
};

const buildFormData = (data) => {
    const form_data = new FormData();

    for (const key in data) {
        if (data.hasOwnProperty(key) && data[key])
            form_data.append(key, data[key]);
    }

    return form_data;
};

const buildConfigMultipartForm = () => {
    return {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
};

const formatDate = (
    date,
    formatTo = constant.FORMAT_SYSTEM_DATE,
    formatFrom = "DD/MM/YYYY"
) => {
    try {
        return moment(date, formatFrom).format(formatTo);
    } catch (e) {
        console.log(e);
        return date;
    }
};

const formatDateV2 = (
    date,
    formatTo = constant.FORMAT_SYSTEM_DATE_V2,
    formatFrom = "YYYY-MM-DDTHH:mm:ss"
) => {
    try {
        return moment(date, formatFrom).format(formatTo);
    } catch (e) {
        console.log(e);
        return date;
    }
};

const objectToQueryString = (obj) => new URLSearchParams(obj).toString();

const metaToParams = (meta) => {
    return meta;
};

const getMeta = (oldVal, newVal) => {
    const meta = { ...oldVal, ...newVal };

    if (newVal.hasOwnProperty("rowsPerPage")) {
        meta.currentPage = 1;
    }

    return meta;
};

const transferParams = (params) => {
    const cloneParams = cloneDeep(params);
    Object.keys(cloneParams).forEach((key) => {
        if (MAP_FIELD_PARAMS[key]) {
            cloneParams[MAP_FIELD_PARAMS[key]] =
                cloneParams[key] &&
                cloneParams[key] !== "Tất cả" &&
                cloneParams[key] !== "All"
                    ? cloneParams[key]
                    : "";
            delete cloneParams[key];
        }
    });
    return cloneParams;
};

const transferBody = (params, invertMap = false) => {
    let MAP_FIELD = invertMap ? invert(MAP_FIELD_BODY) : MAP_FIELD_BODY;

    Object.keys(params).forEach((key) => {
        if (MAP_FIELD[key]) {
            params[MAP_FIELD[key]] =
                params[key] && params[key] !== "Tất cả" && params[key] !== "All"
                    ? params[key]
                    : "";
            delete params[key];
        }
    });

    return params;
};

const setPageTitle = (title = "VPBank Securities Services") =>
    (document.title = title ?? "VPBank Securities Services");

const getStandForName = (name) => {
    if (!name) return name;

    const splitName = name.split(" ");

    if (splitName.length === 1) return splitName[0][0].toUpperCase();

    return `${splitName[0][0]}${
        splitName[splitName.length - 1][0]
    }`.toUpperCase();
};

export {
    freeze,
    translate,
    getBase64,
    handleResponseNotify,
    notifyFail,
    notifySuccess,
    buildFormData,
    buildConfigMultipartForm,
    formatDate,
    objectToQueryString,
    metaToParams,
    getMeta,
    setPageTitle,
    transferParams,
    transferBody,
    getStandForName,
    formatDateV2,
};
