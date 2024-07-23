import { defineStore } from "pinia";
import {ROWS_PER_PAGE_DEFAULT, SUCCESS_CODE} from "src/common/constant";
import { transferBody, transferParams } from "src/common/utils/helper";
import {
    addUserToGroup,
    approveUser,
    getDetailRole,
    getRoles,
    getUsersNotInRole, rejectUser,
    removeUserFromGroup
} from "src/api/roleUser";
import { listGroupFunction } from "src/dto/role";
import {userDto} from "src/dto/user";
import CommonStatus from "src/common/statues/common";

export const useRoleUserStore = defineStore("roleUser", {
    state: () => ({
        listRoles: [],
        listUserNotInRole: [],
        listWaitingUsers: [],
        listUserInRole: [],
        role: null,
        roleId: null,
        params: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT
        },
        meta: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            total: 0
        }
    }),
    actions: {
        async getList(params) {
            try {

                this.params = {...this.params, ...params};

                const { data } = await getRoles({...transferParams(this.params), status: CommonStatus.APPROVED.value});

                if (data.Code === SUCCESS_CODE) {

                    this.listRoles = data.Data.DATASOURCE && Array.isArray(data.Data.DATASOURCE )
                        ? data.Data.DATASOURCE.map(item => listGroupFunction(item))
                        : [];

                    this.meta = {
                        currentPage: parseInt(data.Data.PAGEINDEX),
                        rowsPerPage: parseInt(data.Data.PAGESIZE),
                        total: parseInt(data.Data.TOTAL_RECORDS),
                        lastPage: Math.ceil(data.Data.TOTAL_RECORDS/data.Data.PAGESIZE)
                    };

                }

                return data;

            } catch (e) {
                this.listRoles = [];
                throw e;
            }
        },
        async getListUserNotInRole(id) {
            try {

                const { data } = await getUsersNotInRole(id);

                if (data.Code === SUCCESS_CODE) {

                    this.listUserNotInRole = data?.Data?.map(user => userDto(user));
                }

                return data;

            } catch (e) {
                this.listUserNotInRole = [];
                throw e;
            }
        },
        async getDetail(id) {
            try {

                if (this.roleId === id)
                    return this.role;

                this.roleId = id;
                this.role = null;

                const { data } = await getDetailRole(id);

                if (data.Code === SUCCESS_CODE) {

                    this.role = listGroupFunction(data.Data);

                    this.listWaitingUsers = this.role?.listWaitingUsers?.map(user => userDto(user));
                    this.listUserInRole = this.role?.lstUserOfGroupInfo?.map(user => userDto(user));
                }

                return data;
            } catch (e) {
                throw e;
            }
        },
        async addUserToGroup(params) {

            try {
                const { data } = await addUserToGroup(params);

                if (data.Code !== SUCCESS_CODE) return data;

                // this.getList(this.params, 'VSD');

                this.role = null;
                this.roleId = null;

                return data;
            } catch (e) {
                throw e;
            }
        },
        async removeUserFromGroup(params) {

            try {
                const { data } = await removeUserFromGroup(transferParams(params));

                if (data.Code !== SUCCESS_CODE) return data;

                this.listUserInRole.splice(
                    this.listUserInRole.findIndex(user => user.id === params.userId),
                    1
                )

                return data;
            } catch (e) {
                throw e;
            }
        },
        async approveUser(params) {

            try {
                const { data } = await approveUser(transferParams(params));

                if (data.Code !== SUCCESS_CODE) return ;

                this.listWaitingUsers.splice(
                    this.listWaitingUsers.findIndex(user => user.id === params.userId),
                    1
                )

                this.role = null;
                this.roleId = null;

                return data;
            } catch (e) {
                throw e;
            }
        },
        async rejectUser(params) {

            try {
                const { data } = await rejectUser(transferParams(params));

                if (data.Code !== SUCCESS_CODE) return data;

                this.listWaitingUsers.splice(
                    this.listWaitingUsers.findIndex(user => user.id === params.userId),
                    1
                )

                return data;
            } catch (e) {
                throw e;
            }
        }
    },
});
