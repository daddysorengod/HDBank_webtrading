import { defineStore } from "pinia";
import {
    ROWS_PER_PAGE_DEFAULT,
    SUCCESS_CODE,
    ACTIVE_CODE,
    WRONG_OTP,
    EXCEPTION_CODE,
    DUPLICATE_TRANSACTION,
    EXPIRE_CODE,
    OUTOFTIME,
} from "src/common/constant";
import { transferParams } from "src/common/utils/helper";
import {
    approveTransaction,
    getListTransaction,
    rejectTransaction,
    getActiveCode,
    createTransactionCode,
    vertifyOtpCode,
    checkBeforeVerifyOtpCode,
} from "src/api/approveTransaction";
import {
    approveTransactionDto,
    lookupTransactionDto,
} from "src/dto/approveTransaction";
import CommonStatus from "src/common/statues/common";
import { LocalStorage } from "quasar";

export const useApproveTransactionStore = defineStore("approveTransaction", {
    state: () => ({
        listTransactions: [],
        transaction: null,
        transactionId: null,
        params: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        },
        meta: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            total: 0,
        },
        currentActionTransaction: null,
        currentTransaction: null,
        currentActionTransactionVertify: false, /// bo
        activeCode: "",
        currentTransactionId: "",

        listVerifyTransaction: [],
    }),
    actions: {
        async getList(params) {
            try {
                const { orderbyTime, ...otherFilter } = params;

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    orderbyTime: orderbyTime ? orderbyTime : "desc",
                };

                const { data } = await getListTransaction({
                    ...transferParams(this.params),
                    td_status: CommonStatus.WAITING.value,
                });

                if (data.Code === SUCCESS_CODE) {
                    this.listTransactions =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  approveTransactionDto(item)
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
                this.listTransactions = [];
                throw e;
            }
        },

        async getListLookupTransaction(params) {
            try {
                const { orderbyTime, ...otherFilter } = params;

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    orderbyTime: orderbyTime ? orderbyTime : "desc",
                };

                const { data } = await getListTransaction({
                    ...transferParams(this.params),
                });

                if (data.Code === SUCCESS_CODE) {
                    this.listTransactions =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  lookupTransactionDto(item)
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
                this.listTransactions = [];
                throw e;
            }
        },

        async approveTransaction(id) {
            try {
                const { data } = await approveTransaction(id);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getList(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
        async rejectTransaction(id) {
            try {
                const { data } = await rejectTransaction(id);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getList(this.params);

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

        async requestTransactionCode(params) {
            try {
                const { data } = await createTransactionCode(params);

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

        async vertifyOtp(params) {
            try {
                const { data } = await vertifyOtpCode(params);

                if (data?.Code === SUCCESS_CODE) {
                    return data;
                }

                return null;
            } catch (error) {}
        },
    },
});
