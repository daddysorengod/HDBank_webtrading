import { api } from "src/boot/axios";
import { getQueryURL } from "src/helpers/getQueryURL";

export const getUserOnline = (params) =>
    api.get("/useronline/find-useronline", { params });

export const addNewUser = (params) =>
    api.post("/useronline/insert-useronline", params);

export const getDetailUserOnline = (id) =>
    api.get("/useronline/detail-useronline", { params: { id: id } });

export const editUserDetail = (params) =>
    api.post("/useronline/edit-useronline", params);

export const deleteUser = (id) =>
    api.post(`/useronline/delete-useronline?id=${id}`);

export const approveUser = (params) =>
    api.post(getQueryURL("/useronline/approve-useronline", params));

export const rejectUser = (tranid) =>
    api.post(`/useronline/reject-useronline?tranid=${tranid}`);

/// tran  /useronline/detail-useronline-tran

export const getUserOnlineTran = (params) =>
    api.get("/useronline/find-useronline-tran", { params });

export const getDetailUserTrans = (id) =>
    api.get("/useronline/detail-useronline-tran", { params: { tranid: id } });

export const getDetailUserOnlineTrans = (id) =>
    api.get("/useronline/detail-useronline-tran", { params: { tranid: id } });
