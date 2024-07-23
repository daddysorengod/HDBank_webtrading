import { api } from "boot/axios";

export const getListTransaction = (params) =>
    api.get("regis/regis-search-by-td-status", { params });
export const approveTransaction = (id) => api.post("regis/doapprove", { id });
export const rejectTransaction = (id) => api.post("regis/doreject", { id });
export const getActiveCode = (params) =>
    api.post("/soft-otp/active-code", params);
export const createTransactionCode = (params) =>
    api.post("/soft-otp/create-trans", params);
export const vertifyOtpCode = (params) =>
    api.post("/soft-otp/verify-adv", params);
export const checkBeforeVerifyOtpCode = (params) =>
    api.post("/soft-otp/check-before-verify-adv", params);
