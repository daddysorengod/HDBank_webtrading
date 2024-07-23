import { defineStore } from "pinia";
import { SUCCESS_CODE, UNAUTHORIZED_CODE } from "src/common/constant";
import { addNewUser } from "src/api/user";
import {
    formatDate,
    transferBody,
    transferParams,
} from "src/common/utils/helper";

export const userManagement = defineStore("user", {
    state: () => ({
        meta: {
            page: 1,
            rowsPerPage: 10,
            total: 0,
        },
    }),
    actions: {
        async getListUser(params) {},

        async createNewUser(params) {
            try {
                const { data } = await addNewUser(params);

                if (data?.Code === SUCCESS_CODE) {
                    this.meta.total = this.meta.total + 1;
                }

                return data?.Code;
            } catch (error) {}
        },
    },
});
