import { api } from "boot/axios";

export const getListStatement = (params) =>
    api.get("odmast/od-import-search-by-td-status", { params });

export const getDetailStatement = (id) =>
    api.get("odmast/odImportGetByID", { params: { registerid: id } });
export const importStatementLv1 = (data) =>
    api.post("odmast/importOdLevel1/DoAdd", data);
export const importStatementLv2 = (data) =>
    api.post("odmast/importOdLevel2/DoAdd", data);
export const deleteStatement = (data) => api.post("regis/dodelete", data);
