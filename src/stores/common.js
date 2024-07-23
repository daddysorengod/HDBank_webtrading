import { defineStore } from "pinia";
import { SUCCESS_CODE } from "src/common/constant";
import {
    getTransactionTypes,
    stockList,
    systemCodes,
    systemParams,
    notifyList,
} from "src/api/common";
import { useI18n } from "vue-i18n";
import { LocalStorage } from "quasar";

export const useCommonStore = defineStore("common", {
    state: () => ({
        stockList: null,
        systemDate: null,
        stockType: null,
        transactionTypes: null,
        locale: null,
        notifyList: null,
    }),
    actions: {
        async getStockList() {
            try {
                if (this.stockList) return this.stockList;

                const { data } = await stockList();

                if (data.Code === SUCCESS_CODE) {
                    this.stockList = data.Data;
                }

                return data.Data;
            } catch (e) {
                throw e;
            }
        },
        async getNotifyList() {
            try {
                if (this.notifyList) return this.notifyList;

                const { data } = await notifyList();

                if (data.Code === SUCCESS_CODE) {
                    this.notifyList = data.Data;
                }

                return data.Data;
            } catch (e) {
                throw e;
            }
        },
        async getSystemDate() {
            try {
                if (this.systemDate) return this.systemDate;

                const { data } = await systemParams({
                    paramgrp: "SYSTEM",
                    paramname: "BUSDATE",
                });

                if (data.Code === SUCCESS_CODE) {
                    this.systemDate = data.Data[0].PARAMVALUE;
                }

                return this.systemDate;
            } catch (e) {
                throw e;
            }
        },
        async getStockType() {
            try {
                if (this.stockType) return this.stockType;

                const { data } = await systemCodes({
                    cdtype: "SETRAN",
                    cdname: "SECTYPE",
                });

                if (data.Code === SUCCESS_CODE) {
                    this.stockType = data.Data;
                }

                return this.stockType;
            } catch (e) {
                throw e;
            }
        },
        async getTransactionTypes() {
            try {
                if (this.transactionTypes) return this.transactionTypes;

                const { data } = await getTransactionTypes();

                if (data.Code === SUCCESS_CODE) {
                    this.transactionTypes = data.Data;
                }

                return data.Data;
            } catch (e) {
                throw e;
            }
        },
        // initLocale() {
        //     const { locale } = useI18n();
        //
        //     const lang = LocalStorage.getItem('lang');
        //
        //     locale.value = lang ?? 'vi';
        //
        //     LocalStorage.set('lang', locale.value);
        //
        //     this.locale = locale.value;
        // },
        setLocale(lang) {
            LocalStorage.set("lang", lang);

            this.locale = lang;
        },
    },
});
