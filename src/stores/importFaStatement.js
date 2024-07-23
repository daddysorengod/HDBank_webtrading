import { defineStore } from "pinia";
import {
    ROWS_PER_PAGE_DEFAULT,
    SUCCESS_CODE,
    DUPLICATE_TRANSACTION,
    EXCEPTION_CODE,
} from "src/common/constant";
import { transferParams } from "src/common/utils/helper";
import {
    deleteStatement,
    getDetailStatement,
    getListStatement,
    importFaStatement,
    addFileExcel,
    importDoValidate,
    approveFundAdmin,
    rejectFundAdmin,
    getActiveCode,
    createFundAdminCode,
    verifyOtpCode,
    checkBeforeVerifyOtpCode,
} from "src/api/importFaStatement";
import {
    importStatementDetailDto,
    importStatementDto,
} from "src/dto/importFaStatement";

export const useImportFaStatementStore = defineStore("importFaStatement", {
    state: () => ({
        listFaStatements: [],
        statement: null,
        statementId: null,
        params: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        },
        meta: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            total: 0,
        },
    }),
    actions: {
        async getListImport(params) {
            try {
                const { orderbyTime, ...otherFilter } = params;

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    orderbyTime: "desc",
                };

                const convertParam = transferParams(this.params);

                let paramFetch = {
                    ...convertParam,
                    status:
                        convertParam.td_status != "commonLabel.all"
                            ? convertParam.td_status
                            : "",
                };
                delete paramFetch.td_status;

                const { data } = await getListStatement(paramFetch);
                if (data.Code === SUCCESS_CODE) {
                    this.listFaStatements =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  importStatementDto(item)
                              )
                            : [];

                    this.meta = {
                        currentPage: parseInt(data.Data.PAGEINDEX),
                        rowsPerPage: parseInt(data.Data.PAGESIZE),
                        total: parseInt(data.Data.TOTAL_RECORDS),
                        lastPage: Math.ceil(
                            data.Data.TOTAL_RECORDS / data.Data.PAGESIZE
                        ),
                    };
                }

                return data;
            } catch (e) {
                this.listFaStatements = [];
                throw e;
            }
        },
        async getListApprove(params) {
            try {
                const { orderbyTime, ...otherFilter } = params;

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    status: "N",
                    orderbyTime: "desc",
                };

                let paramFetch = {
                    ...transferParams(this.params),
                    status: "N",
                };
                delete paramFetch.td_status;

                const { data } = await getListStatement(paramFetch);

                if (data.Code === SUCCESS_CODE) {
                    this.listFaStatements =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  importStatementDto(item)
                              )
                            : [];

                    this.meta = {
                        currentPage: parseInt(data.Data.PAGEINDEX),
                        rowsPerPage: parseInt(data.Data.PAGESIZE),
                        total: parseInt(data.Data.TOTAL_RECORDS),
                        lastPage: Math.ceil(
                            data.Data.TOTAL_RECORDS / data.Data.PAGESIZE
                        ),
                    };
                }

                return data;
            } catch (e) {
                this.listFaStatements = [];
                throw e;
            }
        },
        async getListDetail(params) {
            try {
                const { orderbyTime, ...otherFilter } = params;

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    orderbyTime: "desc",
                };

                const convertParam = transferParams(this.params);

                let paramFetch = {
                    ...convertParam,
                    status:
                        convertParam.td_status != "commonLabel.all"
                            ? convertParam.td_status
                            : "",
                };
                delete paramFetch.td_status;

                const { data } = await getListStatement(paramFetch);

                if (data.Code === SUCCESS_CODE) {
                    this.listFaStatements =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  importStatementDto(item)
                              )
                            : [];

                    this.meta = {
                        currentPage: parseInt(data.Data.PAGEINDEX),
                        rowsPerPage: parseInt(data.Data.PAGESIZE),
                        total: parseInt(data.Data.TOTAL_RECORDS),
                        lastPage: Math.ceil(
                            data.Data.TOTAL_RECORDS / data.Data.PAGESIZE
                        ),
                    };
                }

                return data;
            } catch (e) {
                this.listFaStatements = [];
                throw e;
            }
        },
        async getDetail(id) {
            try {
                if (this.statementId === id) return this.statement;

                this.statementId = id;
                this.statement = null;

                const { data } = await getDetailStatement(id);

                if (data.Code === SUCCESS_CODE) {
                    this.statement = importStatementDetailDto(data.Data);
                }

                return data;
            } catch (e) {
                throw e;
            }
        },
        async importDoValidate(params, type) {
            try {
                const { data } = await importDoValidate(params);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListImport(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
        async importFaStatement(params, batchId) {
            try {
                const { data } = await importFaStatement(params, batchId);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListImport(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
        async deleteStatement(id) {
            try {
                const { data } = await deleteStatement(id);

                if (data.Code !== SUCCESS_CODE) return;

                this.listFaStatements.splice(
                    this.listFaStatements.findIndex((item) => item.id === id),
                    1
                );

                this.meta.total -= 1;

                return data;
            } catch (e) {
                throw e;
            }
        },
        async addFileExcel(params) {
            try {
                const formData = new FormData();
                formData.append("fileUpload", params);
                const { data } = await addFileExcel(formData);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListImport(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },

        async approveFundAdmin(id) {
            try {
                const { data } = await approveFundAdmin(id);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListApprove(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
        async rejectFundAdmin(id) {
            try {
                const { data } = await rejectFundAdmin(id);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListApprove(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },

        async getActiveCodeVerify(params) {
            try {
                const { data } = await getActiveCode(params);

                if (data.Code !== SUCCESS_CODE) {
                    return data;
                }

                this.activeCode = data?.Data?.activationCode;

                const activeCodeRole = LocalStorage.getItem(ACTIVE_CODE);

                if (!activeCodeRole) {
                    LocalStorage.set(ACTIVE_CODE, data?.Data?.activationCode);
                }

                return data;
            } catch (error) {}
        },

        async requestFundAdminCode(params) {
            try {
                const { data } = await createFundAdminCode(params);

                if (data.Code === EXCEPTION_CODE) {
                    return null;
                }

                if (data.Code === DUPLICATE_TRANSACTION) {
                    return data;
                }

                if (data.Code === SUCCESS_CODE) {
                    return data;
                }

                return data;
            } catch (error) {}
        },

        async checkBeforeVerifyOtp(params) {
            try {
                const { data } = await checkBeforeVerifyOtpCode(params);

                if (data?.Code !== SUCCESS_CODE) {
                    return null;
                }

                return data;
            } catch (error) {}
        },

        async verifyOtp(params) {
            try {
                const { data } = await verifyOtpCode(params);

                if (data?.Code === SUCCESS_CODE) {
                    return data;
                }

                return null;
            } catch (error) {}
        },
    },
});
