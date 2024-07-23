import { defineStore } from "pinia";
import { SUCCESS_CODE, UNAUTHORIZED_CODE } from "src/common/constant";
import { getListBalance } from "src/api/lookupBalance";
import { lookupBalanceDepository } from "src/dto/lookupBalanceDepository";
import {
    formatDate,
    transferBody,
    transferParams,
} from "src/common/utils/helper";

export const useOrderListStock = defineStore("lookupBalanceStore", {
    state: () => ({
        listDepositoryAccount: [],
        params: {
            page: 1,
            rowsPerPage: 10,
        },
        meta: {
            page: 1,
            rowsPerPage: 10,
            total: 0,
        },
    }),

    actions: {
        async getList(params) {
            try {
                this.params = {
                    ...this.params,
                    ...params
                };
                const { data } = await getListBalance(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listDepositoryAccount =
                        data?.Data?.DATASOURCE &&
                        Array.isArray(data?.Data?.DATASOURCE)
                            ? data?.Data?.DATASOURCE.map((item) =>
                                  lookupBalanceDepository(item)
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
                this.listDepositoryAccount = [];
                throw error;
            }
        },
    },
});
