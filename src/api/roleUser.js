import { api } from "src/boot/axios";
import { getQueryURL } from "src/helpers/getQueryURL";

export const getRoles = (params) =>
    api.get("group-function/find-group-function", { params });

export const getDetailRole = (id) =>
    api.get('group-function/detail-group-function', { params: {id} });

export const getUsersNotInRole = (roleId) =>
    api.get('authorize/user-not-in-group', { params: {groupId: roleId} });

export const addUserToGroup = (params) =>
    api.post('authorize/add-user-to-group', params);

export const removeUserFromGroup = (params) =>
    api.post(getQueryURL('authorize/delete-user-from-group', params));

export const approveUser = (params) =>
    api.post(getQueryURL("/authorize/approve-add-user-to-group", params));

export const rejectUser = (params) =>
    api.post(getQueryURL("/authorize/reject-add-user-to-group", params));
