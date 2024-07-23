import { defineStore } from "pinia";
import { ROWS_PER_PAGE_DEFAULT, SUCCESS_CODE } from "src/common/constant";
import {
    getListTransaction,
    getDetailVSD,
    createVSD,
    editVSD,
    getListOTC,
    createVPB,
    getDetailVPB,
    deleteTransaction,
    editVPB,
} from "src/api/transWidthdraw";
import { OTCDto, transactionWithdrawDto } from "src/dto/transactionWithdraw";
import {
    formatDate,
    transferBody,
    transferParams,
} from "src/common/utils/helper";
import { cloneDeep } from "lodash";
import TransactionWithdrawType from "src/common/types/transactionWithdraw";

export const useTransWithdrawStore = defineStore("transactionWithdraw", {
    state: () => ({
        listTransactions: [],
        transaction: null,
        transactionId: null,
        transactionType: null,
        listOTC: [],
        selectedOTC: null,
        selectedOTCId: null,
        params: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        },
        meta: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            total: 0,
        },
        OTCParams: {
            page: 1,
            rowsPerPage: 5,
        },
        OTCMeta: {
            page: 1,
            rowsPerPage: 5,
            total: 0,
        },
        currentActions: null,
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

                const { data } = await getListTransaction(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listTransactions =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  transactionWithdrawDto(item)
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
        async getDetail(id, transactionType, currentAction) {
            try {
                if (this.transactionId === id) return this.transaction;

                this.transactionId = id;
                this.transaction = null;
                this.currentActions = currentAction;

                const { data } =
                    transactionType === TransactionWithdrawType.VSD.value
                        ? await getDetailVSD(id)
                        : await getDetailVPB(id);

                if (data.Code === SUCCESS_CODE) {
                    this.transaction = transactionWithdrawDto(
                        data.Data,
                        this.transactionType
                    );
                }

                return data;
            } catch (e) {
                throw e;
            }
        },
        async createVSD(params) {
            try {
                const { data } = await createVSD(params);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getList(this.params, "VSD");

                return data;
            } catch (e) {
                throw e;
            }
        },
        async editVSD(params) {
            try {
                const { data } = await editVSD(params);

                this.transactionId = null;
                this.transaction = null;

                if (data.Code !== SUCCESS_CODE) return data;

                const indexItem = this.listTransactions.findIndex(
                    (item) => item.id === params.Id
                );

                this.listTransactions.splice(indexItem, 1, {
                    ...this.listTransactions[indexItem],
                    ...transferBody(params, true),
                    transactionDate: formatDate(
                        params.transactionDate,
                        "DD/MM/YYYY",
                        "YYYY-MM-DD"
                    ),
                });

                return data;
            } catch (e) {
                throw e;
            }
        },
        async deleteVSD(id) {
            try {
                const { data } = await deleteTransaction({
                    Id: id,
                });

                if (data.Code !== SUCCESS_CODE) return;

                this.listTransactions.splice(
                    this.listTransactions.findIndex((item) => item.id === id),
                    1
                );

                this.meta.total -= 1;

                return data;
            } catch (e) {
                throw e;
            }
        },
        async getListOTC(params, refresh = false) {
            try {
                this.OTCParams = { ...this.OTCParams, ...params };

                if (refresh) {
                    this.OTCParams = {
                        page: 1,
                        rowsPerPage: 5,
                    };
                }

                const { data } = await getListOTC(
                    transferParams(this.OTCParams)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listOTC =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) => OTCDto(item))
                            : [];

                    this.OTCMeta = {
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
                this.listOTC = [];
                throw e;
            }
        },
        async createVPB(params) {
            try {
                const { data } = await createVPB(transferBody(params));

                if (data.Code !== SUCCESS_CODE) return data;

                this.getList(this.params, "VPB");

                return data;
            } catch (e) {
                throw e;
            }
        },
        async editVPB(params) {
            try {
                const { data } = await editVPB(transferBody(params));

                this.transactionId = null;
                this.transaction = null;

                if (data.Code !== SUCCESS_CODE) return data;

                const indexItem = this.listTransactions.findIndex(
                    (item) => item.id === params.Id
                );

                this.listTransactions.splice(indexItem, 1, {
                    ...this.listTransactions[indexItem],
                    ...transferBody(params, true),
                    transactionDate: formatDate(
                        params.transactionDate,
                        "DD/MM/YYYY",
                        "YYYY-MM-DD"
                    ),
                });

                return data;
            } catch (e) {
                throw e;
            }
        },
    },
});
