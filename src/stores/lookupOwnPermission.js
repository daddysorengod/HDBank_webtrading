import { defineStore } from "pinia";
import { ROWS_PER_PAGE_DEFAULT, SUCCESS_CODE } from "src/common/constant";
import { transferParams } from "src/common/utils/helper";
import { getLookupOwnPermission } from "src/api/lookupOwnPermission";
import { lookupOwnPermissionDto } from "src/dto/lookupOwnPermission";

export const useLookupOwnPermissionStore = defineStore("lookupOwnPermission", {
    state: () => ({
        listOwnPermissions: [],
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
        async getList(params) {
            try {
                const {orderbyTime,...otherFilter} = params

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    orderbyTime:orderbyTime?orderbyTime:"desc"
                };

                const { data } = await getLookupOwnPermission(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listOwnPermissions =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  lookupOwnPermissionDto(item)
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
                this.listOwnPermissions = [];
                throw e;
            }
        },
    },
});