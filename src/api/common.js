import { api } from "boot/axios";

export const stockList = (data) => api.get("common/getstocklist");
export const notifyList = (data) => api.get("common/get-notifications");
export const systemParams = (params) =>
    api.get("common/getsysparams", { params });
export const systemCodes = (params) =>
    api.get("common/getallcodebycd", { params });
export const getTransactionTypes = (params) =>
    api.get("common/gettltxcd", { params });
export const getBalanceStock = (params) =>
    api.get("customerbalance/segetblance", { params });
