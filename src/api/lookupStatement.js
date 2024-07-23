import { api } from "boot/axios";

export const getLookupStatement = (params) => api.get("od/odmast-search", {params});
