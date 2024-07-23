import { defineStore } from "pinia";
import { SUCCESS_CODE, ROWS_PER_PAGE_DEFAULT } from "src/common/constant";
import {
    getListTransactionStocks,
    getDetailTransactionRegisterForPay,
    getListRegisterAllowed,
    getListRegisterAllowed_View,
    getDetailTransaction,
    editTransaction,
    createTransaction,
    deleteTransaction,
} from "src/api/order";
import { orderTransactionStock } from "src/dto/orderTransactionStock";
import {
    formatDate,
    transferBody,
    transferParams,
} from "src/common/utils/helper";

export const useOrderListStock = defineStore("order", {
    state: () => ({
        listTransactions: [],
        params: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        },
        meta: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            total: 0,
        },
        currentListStock: [],
        currentAcount: "",
        currnetStockPrice: "",
        currentPermissionQuantity: 0,
        currentPaidQuantity: 0,
        currentStockQuantity: 0,
        transactionDate: "",
        currentRightRate: 1,
        currentStockRatio: 1,
        currentStockAboveRight: [],
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
                // this.params = {
                //     ...this.params,
                //     ...otherFilter,
                //     orderby: !!!orderbyTime
                //         ? "id desc"
                //         : orderbyTime === "asc"
                //         ? ""
                //         : "id desc",
                // };

                const { data } = await getListTransactionStocks(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listTransactions =
                        data?.Data?.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data?.Data?.DATASOURCE.map((item, index) =>
                                  orderTransactionStock(
                                      item,
                                      index,
                                      this.params.currentPage ?? 1,
                                      this.params.rowsPerPage
                                  )
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
            } catch (error) {
                this.listTransactions = [];
                throw error;
            }
        },

        async getDetailTransactionRegisterForPay(params) {
            try {
                const { data } = await getDetailTransactionRegisterForPay(
                    params
                );

                if (data.Code !== SUCCESS_CODE) {
                    return null;
                }

                if (data?.Data[0].ROPARVALUE) {
                    this.currnetStockPrice = data?.Data[0].ROPARVALUE;
                }
                return data.Data;
            } catch (error) {}
        },

        async getListRegisterAllowed(params) {
            try {
                this.currentAcount = params.afacctno;

                const { data } = await getListRegisterAllowed(params);

                if (data.Code === SUCCESS_CODE) {
                    if (params?.afacctno && params?.caid) {
                        this.currentPermissionQuantity =
                            data?.Data[0].RIGHTQTTY;
                        this.currentPaidQuantity = data?.Data[0].EXERIGHTQTTY;
                    } else {
                        const tmp = [];

                        data.Data.map((item) => {
                            tmp.push(item.CAID);
                        });

                        this.currentListStock = tmp;
                    }
                }
                return data?.Data;
            } catch (error) {}
        },

        async getListRegisterAllowed_View(params) {
            try {
                this.currentAcount = params.afacctno;

                const { data } = await getListRegisterAllowed_View(params);

                if (data.Code === SUCCESS_CODE) {
                    if (params?.afacctno && params?.caid) {
                        this.currentPermissionQuantity =
                            data?.Data[0].RIGHTQTTY;
                        this.currentPaidQuantity = data?.Data[0].EXERIGHTQTTY;
                    } else {
                        const tmp = [];

                        data.Data.map((item) => {
                            tmp.push(item.CAID);
                        });

                        this.currentListStock = tmp;
                    }
                }
                return data?.Data;
            } catch (error) {}
        },

        async getDetailTransaction(params) {
            try {
                const { data } = await getDetailTransaction(params);

                if (data.Code === SUCCESS_CODE) {
                }
                return data?.Data;
            } catch (error) {}
        },

        async createTransaction(params) {
            try {
                const { data } = await createTransaction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.meta.total = this.meta.total + 1;

                    this.getList(this.params);
                }

                return data?.Code;
            } catch (error) {}
        },

        async editTransaction(params) {
            try {
                const { data } = await editTransaction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.getList(this.params);
                }

                this.getList(this.params);

                return data?.Code;
            } catch (error) {}
        },

        async deleteTransaction(params) {
            try {
                const { data } = await deleteTransaction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.meta.total = this.meta.total - 1;
                    this.getList(this.params);
                }

                this.getList(this.params);

                return data?.Code;
            } catch (error) {}
        },
    },
});
