import { useAuthStore } from "stores/auth";
import { LocalStorage } from "quasar";
import { ACCESS_LIST_AFMASTS,USER_DATA_KEY } from "src/common/constant";

export const getCommonSystem = () => {
    const authStore = useAuthStore();

    if (!authStore.listDeposAccNo || !authStore.listDeposAccNo.length) {
        authStore.listDeposAccNo = LocalStorage.getItem(ACCESS_LIST_AFMASTS);
        authStore.listDeposNameById = LocalStorage.getItem(
            ACCESS_LIST_AFMASTS
        ).map((item) => {
            return {
                depositoryAccountNumber: item?.Afacctno,
                depositoryAccount: item?.fullname,
                depositoryAccountId:item?.AFACCTID
            };
        });
        authStore.user = LocalStorage.getItem(USER_DATA_KEY)
    }
};
