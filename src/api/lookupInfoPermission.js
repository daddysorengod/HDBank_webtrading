import { api } from "boot/axios";

export const getLookupInfoPermission = (params) => api.get("camast/camast-search", {params});
