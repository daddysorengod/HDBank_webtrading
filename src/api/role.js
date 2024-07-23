import { api } from "src/boot/axios";
import { getQueryURL } from "src/helpers/getQueryURL";

export const getAllGroupFunction = (params) =>
    api.get("/group-function/find-group-function", { params });

export const addGroupFunction = (params) =>
    api.post("/group-function/add-group-function", params);

export const getDetailRoleById = (params) =>
    api.get(getQueryURL("/group-function/detail-group-function-tran", params));

export const getDetailRoleApproverById = (params) =>
    api.get(getQueryURL("/group-function/detail-group-function-tran", params));

export const deleteGroupRole = (params) =>
    api.post(`/group-function/delete-group-function?id=${params}`);

export const repairGroupFunction = (params) =>
    api.post("/group-function/edit-group-function", params);

export const approveGroupFunction = (params) =>
    api.post(getQueryURL("/group-function/approve-group-function", params));

export const rejectGroupFunction = (params) =>
    api.post(getQueryURL("/group-function/reject-group-function", params));
