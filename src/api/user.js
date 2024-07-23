import { api } from "boot/axios";

export const addNewUser = (params) =>
    api.post("/quan-ly-nguoi-dung/them-moi-nguoi-dung", { params });
