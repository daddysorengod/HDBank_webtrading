import { api } from "boot/axios";

export const getListBalance = (params) =>
    api.get("/customerbalance/segetbalancebyuser", {params});
