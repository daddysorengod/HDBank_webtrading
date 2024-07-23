import { defineStore } from "pinia";
import { ROWS_PER_PAGE_DEFAULT, SUCCESS_CODE } from "src/common/constant";
import { transferBody, transferParams } from "src/common/utils/helper";
import {
    getUserOnline,
    addNewUser,
    getDetailUserOnline,
    editUserDetail,
    deleteUser,
    getUserOnlineTran,
    approveUser,
    rejectUser,
    getDetailUserOnlineTrans
} from "src/api/roleUserConfirm";
import { userOnline, userOnlineTran } from "src/dto/userOnline";
import { userDto } from "src/dto/user";
import CommonStatus from "src/common/statues/common";

export const useRoleUserConfirmStore = defineStore("roleUserConfirm", {
    state: () => ({
        listUserOnline: [],
        params: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
        },
        meta: {
            page: 1,
            rowsPerPage: ROWS_PER_PAGE_DEFAULT,
            total: 0,
        },
        listRoles: [],
        listUserSearch: [],
        listRelatedUser: [],
        currentListUserChoose: "",
        currentListUserChooseId: "",
        currentUserDetail: null,
        currentUserId: null,
    }),
    actions: {
        async getListOnlineUser(params) {
            try {
                this.params = { ...this.params, ...params };

                const { data } = await getUserOnline(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listUserOnline =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  userOnline(item)
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
                this.listUserOnline = [];
                throw e;
            }
        },

        async getListOnlineUserTran(params) {
            try {
                this.params = { ...this.params, ...params };

                const { data } = await getUserOnlineTran(
                    transferParams(this.params)
                );

                if (data.Code === SUCCESS_CODE) {
                    this.listUserOnline =
                        data.Data.DATASOURCE &&
                        Array.isArray(data.Data.DATASOURCE)
                            ? data.Data.DATASOURCE.map((item) =>
                                  userOnlineTran(item)
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
                this.listUserOnline = [];
                throw e;
            }
        },

        async addNewUserAccount(params) {
            try {
                const { data } = await addNewUser(params);

                if (data?.Code !== SUCCESS_CODE) {
                    return null;
                }

                this.getListOnlineUser(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },

        async editUserAccount(params) {
            try {
                const { data } = await editUserDetail(params);

                if (data?.Code !== SUCCESS_CODE) {
                    return null;
                }

                this.getListOnlineUser(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },

        async getDetailUsersOnline(id) {
            try {
                if (this.currentUserId === id) {
                    return this.currentUserId;
                }

                this.currentUserId === id;
                this.currentUserDetail = null;
                const { data } = await getDetailUserOnline(id);

                if (data.Code === SUCCESS_CODE) {
                    this.currentUserDetail = data?.Data;
                }
                return data?.Data;
            } catch (error) {}
        },

        async getDetailUsersOnlineTrans(id) {
            try {
                if (this.currentUserId === id) {
                    return this.currentUserId;
                }

                this.currentUserId === id;
                this.currentUserDetail = null;
                const { data } = await getDetailUserOnlineTrans(id);

                if (data.Code === SUCCESS_CODE) {
                    this.currentUserDetail = data?.Data;
                }
                return data?.Data;
            } catch (error) {}
        },

        async deleteUsersOnline(id) {
            try {
                if (this.currentUserId === id) {
                    return this.currentUserId;
                }

                this.currentUserId === id;
                this.currentUserDetail = null;
                const { data } = await deleteUser(id);

                if (data.Code !== SUCCESS_CODE) {
                    return null;
                }
                this.getListOnlineUser(this.params);
                return data?.Data;
            } catch (error) {}
        },

        async requestApproveUser(params) {
            try {
                const { data } = await approveUser(params);
                console.log(params)

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListOnlineUserTran(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
        async requestRejectUser(params) {
            try {
                const { data } = await rejectUser(params);

                if (data.Code !== SUCCESS_CODE) return data;

                this.getListOnlineUserTran(this.params);

                return data;
            } catch (e) {
                throw e;
            }
        },
    },
});
