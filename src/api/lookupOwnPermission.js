import { api } from "boot/axios";

export const getLookupOwnPermission = (params) => api.get("camast/caright-search", {params});
