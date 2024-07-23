import { api } from "boot/axios";

export const getListTransaction = (params) => api.get("setran/se-withdraw-search-by-td-status", {params});

export const getDetailVSD = (id) => api.get("setran/getWithDrawRegisterSeByID", {params: {registerid: id}});
export const createVSD = (data) => api.post("setran/SeWithDraw/DoAdd", data);
export const editVSD = (data) => api.post("setran/SeWithDraw/DoEdit", data);
export const deleteTransaction = (data) => api.post("regis/dodelete", data);

export const createVPB = (data) => api.post("setran/SeOTCWithDraw/DoAdd", data);
export const editVPB = (data) => api.post("setran/SeOTCWithDraw/DoEdit", data);
export const getDetailVPB = (id) => api.get("setran/getOTCWithDrawRegisterSeByID", {params: {registerid: id}});

export const getListOTC = (params) => api.get('setran/se-otc-withdrawdesposit-search', {params});
