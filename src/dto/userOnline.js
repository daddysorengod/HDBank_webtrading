import { formatDate } from "src/common/utils/helper";
import { formatMoney } from "src/helpers/formatMoney";

export const userOnline = (dataRes) => {
    return {
        username: dataRes.userName,
        name: dataRes.STAFF_NAME,
        email: dataRes.EMAIL,
        phone: dataRes.PHONE,
        typePaper: dataRes.IDTYPE,
        numberPaper: dataRes.IDCODE,
        status: dataRes.STATUS,
        userId:dataRes.id
    };
};

export const userOnlineTran = (dataRes) => {
    return {
        username: dataRes.userName,
        name: dataRes.STAFF_NAME,
        email: dataRes.EMAIL,
        phone: dataRes.PHONE,
        typePaper: dataRes.IDTYPE,
        numberPaper: dataRes.IDCODE,
        status: dataRes.STATUS,
        userId:dataRes.USERID,
        tranId:dataRes.TRANID
    };
};
