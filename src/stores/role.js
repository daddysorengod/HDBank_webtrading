import { defineStore } from "pinia";
import { SUCCESS_CODE, UNAUTHORIZED_CODE } from "src/common/constant";
import {
    deleteGroupRole,
    getAllGroupFunction,
    getDetailRoleById,
    addGroupFunction,
    repairGroupFunction,
    approveGroupFunction,
    rejectGroupFunction,
    getDetailRoleApproverById
} from "src/api/role";
import { listGroupFunction } from "src/dto/role";
import {
    formatDate,
    transferBody,
    transferParams,
} from "src/common/utils/helper";

export const useRole = defineStore("role", {
    state: () => ({
        listUser: [],
        listRole: [],
        listRoleName: [],
        params: {
            page: 1,
            rowsPerPage: 10,
        },
        meta: {
            page: 1,
            rowsPerPage: 10,
            total: 0,
        },
        listRoleType: [
            {
                label: "Tất cả",
                value: "",
            },
            ,
            {
                label: "Quản trị",
                value: "A",
            },
            {
                label: "Nghiệp vụ",
                value: "M",
            },
        ],
        currentGroupListFunctions: [],
        currentGroupName: "",
        currentGroupType: "",
    }),

    actions: {
        async getListUser(params) {
            try {
            } catch (error) {}
        },

        async getListRole(params) {
            try {
                this.params = { ...this.params, ...params };

                const { data } = await getAllGroupFunction(
                    transferParams(this.params)
                );

                if (data?.Code === SUCCESS_CODE) {
                    this.listRole =
                        data?.Data?.DATASOURCE &&
                        Array.isArray(data?.Data?.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  listGroupFunction(item)
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
                    if (!params?.roleName) {
                        this.listRoleName =
                            data?.Data?.DATASOURCE &&
                            Array.isArray(data?.Data?.DATASOURCE)
                                ? data.Data.DATASOURCE.map((item) => ({
                                      label: item?.Name,
                                      value: item?.Name,
                                  }))
                                : [];
                    }
                }
                return data;
            } catch (error) {
                this.listRole = [];
                throw error;
            }
        },

        async addGroupFunction(params) {
            try {
                console.log(params);

                const { data } = await addGroupFunction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.meta.total = this.meta.total + 1;
                    this.getListRole(this.params);
                }

                return data?.Code;
            } catch (error) {}
        },

        async getDetailRoleById(params) {
            try {
                const { data } = await getDetailRoleById(params);

                if (data?.Code === SUCCESS_CODE) {
                }
                this.currentGroupName = data?.Data?.Name
                    ? data?.Data?.Name
                    : "";
                this.currentGroupType = [data?.Data?.GROUP_TYPE];

                const tmp =
                    data?.Data?.lstFunction &&
                    Array.isArray(data?.Data?.lstFunction)
                        ? data?.Data?.lstFunction?.map((item) =>
                              Number(item?.Id)
                          )
                        : [];

                this.currentGroupListFunctions = tmp;

                return tmp;
            } catch (error) {
                this.currentGroupListFunctions = [];
                this.currentGroupName = "";
                this.currentGroupType = "";

                throw error;
            }
        },

        async deleteGroupRole(params) {
            try {
                const { data } = await deleteGroupRole(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.meta.total = this.meta.total - 1;

                    this.listRole = this.listRole.filter(
                        (item) => item?.id !== params
                    );

                    this.getListRole(this.params);

                    return data?.Code;
                }

                return data?.Code;
            } catch (error) {}
        },

        async repairGroupFunction(params) {
            try {
                console.log(params);

                const { data } = await repairGroupFunction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.getListRole(this.params);
                }

                return data?.Code;
            } catch (error) {}
        },

        async rejectGroupFunction(params) {
            try {
                console.log(params);

                const { data } = await rejectGroupFunction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.getListRole(this.params);
                }

                return data?.Code;
            } catch (error) {}
        },

        async approveGroupFunction(params) {
            try {
                console.log(params);

                const { data } = await approveGroupFunction(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.getListRole(this.params);
                }

                return data?.Code;
            } catch (error) {}
        },

        async getDetailRoleApproveById(params) {
            try {
                const { data } = await getDetailRoleApproverById(params);

                if (data?.Code === SUCCESS_CODE) {
                }
                this.currentGroupName = data?.Data?.Name
                    ? data?.Data?.Name
                    : "";
                this.currentGroupType = [data?.Data?.GROUP_TYPE];

                const tmp =
                    data?.Data?.lstFunction &&
                    Array.isArray(data?.Data?.lstFunction)
                        ? data?.Data?.lstFunction?.map((item) =>
                              Number(item?.Id)
                          )
                        : [];

                this.currentGroupListFunctions = tmp;

                return tmp;
            } catch (error) {
                this.currentGroupListFunctions = [];
                this.currentGroupName = "";
                this.currentGroupType = "";

                throw error;
            }
        },
    },
});
