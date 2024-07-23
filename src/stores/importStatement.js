import { defineStore } from "pinia";
import { ROWS_PER_PAGE_DEFAULT, SUCCESS_CODE } from "src/common/constant";
import { transferBody, transferParams } from "src/common/utils/helper";
import { transactionDepositoryDto } from "src/dto/transactionDepository";
import {
    deleteStatement,
    getDetailStatement,
    getListStatement,
    importStatementLv1,
    importStatementLv2,
} from "src/api/importStatement";
import StatementImportType from "src/common/types/statementImport";
import {
    importStatementDetailDto,
    importStatementDto,
} from "src/dto/importStatement";

export const useImportStatementStore = defineStore("importStatement", {
    state: () => ({
        listStatements: [],
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
        async getList(params) {
            try {
                const { orderbyTime, ...otherFilter } = params;

                this.params = {
                    ...this.params,
                    ...otherFilter,
                    orderbyTime: orderbyTime ? orderbyTime : "desc",
                };

                const { data } = await getListStatement(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listStatements =
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
                this.listStatements = [];
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
        async importStatement(params, type) {
            try {
                const { data } =
                    type === StatementImportType.CUSTOMER_1.value
                        ? await importStatementLv1(params)
                        : await importStatementLv2(params);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getList(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
        async deleteStatement(id) {
            try {
                const { data } = await deleteStatement({
                    Id: id,
                });

                if (data.Code !== SUCCESS_CODE) return;

                this.listStatements.splice(
                    this.listStatements.findIndex((item) => item.id === id),
                    1
                );

                this.meta.total -= 1;

                return data;
            } catch (e) {
                throw e;
            }
        },
    },
});
