import { api } from "boot/axios";

export const getListTransaction = (params) => api.get("setran/se-desposit-search-by-td-status", {params});

export const getDetailVSD = (id) => api.get("setran/getRegisterSeByID", {params: {registerid: id}});
export const createVSD = (data) => api.post("setran/SeDesposit/DoAdd", data);
export const editVSD = (data) => api.post("setran/SeDesposit/DoEdit", data);
export const getReleaseCode = (symbol) => api.get("setran/GetMaDotPhatHanh", {params: {symbol}})
export const deleteTransaction = (data) => api.post("regis/dodelete", data);

export const createVPB = (data) => api.post("setran/SeOTCDesposit/DoAdd", data);
export const editVPB = (data) => api.post("setran/SeOTCDesposit/DoEdit", data);
export const getDetailVPB = (id) => api.get("setran/getOTCRegisterSeByID", {params: {registerid: id}});
