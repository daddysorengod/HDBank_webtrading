import { api } from "boot/axios";
export const getListTransactionStocks = (params) =>
    api.get("/camast/ca-search-by-td-status", { params });

export const getDetailTransactionRegisterForPay = (params) =>
    api.get("/camast/getCaBuyingList", { params });

export const getListRegisterAllowed = (params) =>
    api.get("/camast/getCaBuyingByAF", { params });
export const getListRegisterAllowed_View = (params) =>
    api.get("/camast/getCaBuyingByAF_View", { params });
export const getDetailTransaction = (params) =>
    api.get("/camast/getRegisterCaByID", { params });

export const createTransaction = (params) =>
    api.post("/camast/CaBuying/DoAdd", { ...params });

export const editTransaction = (params) =>
    api.post("/camast/CaBuying/DoEdit", { ...params });

export const deleteTransaction = (params) =>
    api.post("/regis/dodelete", { ...params });
