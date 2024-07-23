import { api } from "boot/axios";

export const getListStatement = (params) =>
    api.get("import-trans/get-batch-transaction-by-cifno", { params });

export const getDetailStatement = (id) =>
    api.get("import-trans/get-import-data-by-batchid", {
        params: { batchId: id },
    });
export const importFaStatement = (data, batchId) =>
    api.post(`import-trans/import-data?batchId=${batchId}`, data);
export const importDoValidate = (data) =>
    api.post("import-trans/do-validate", data);
export const deleteStatement = (id) =>
    api.post(`import-trans/delete?batchId=${id}`);

export const addFileExcel = (formData) => {
    return api.post("import-trans/save-files", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const approveFundAdmin = (id) =>
    api.post(`import-trans/approve?batchId=${id}`);
export const rejectFundAdmin = (id) =>
    api.post(`import-trans/reject?batchId=${id}`);
export const getActiveCode = (params) =>
    api.post("/soft-otp/active-code", params);
export const createFundAdminCode = (params) =>
    api.post("/soft-otp/create-trans", params);
export const verifyOtpCode = (params) =>
    api.post("/soft-otp/verify-adv", params);
export const checkBeforeVerifyOtpCode = (params) =>
    api.post("/soft-otp/check-before-verify-adv", params);
