import { defineStore } from "pinia";
import { ROWS_PER_PAGE_DEFAULT, SUCCESS_CODE } from "src/common/constant";
import {
    getListTransaction,
    getDetailVSD,
    createVSD,
    editVSD,
    createVPB,
    getDetailVPB,
    deleteTransaction,
    editVPB,
} from "src/api/transDepository";
import {
    formatDate,
    transferBody,
    transferParams,
} from "src/common/utils/helper";
import { transactionDepositoryDto } from "src/dto/transactionDepository";
import TransactionDepositoryType from "src/common/types/transactionDepository";

export const useTransDepositoryStore = defineStore("transactionDepository", {
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
                                  transactionDepositoryDto(item)
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
        async getDetail(id, transactionType) {
            try {
                if (this.transactionId === id) return this.transaction;

                this.transactionId = id;
                this.transaction = null;

                const { data } =
                    transactionType === TransactionDepositoryType.VSD.value
                        ? await getDetailVSD(id)
                        : await getDetailVPB(id);

                if (data.Code === SUCCESS_CODE) {
                    this.transaction = transactionDepositoryDto(
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
                const { data } = await createVSD(transferBody(params));

                if (data.Code !== SUCCESS_CODE) return data;

                this.getList(this.params, "VSD");

                return data;
            } catch (e) {
                throw e;
            }
        },
        async editVSD(params) {
            try {
                const { data } = await editVSD(transferBody(params));

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
