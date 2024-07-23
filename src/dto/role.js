import { formatDate } from "src/common/utils/helper";

export const listGroupFunction = (dataRes) => {
    return {
        roleName: dataRes.Name,
        roleType: dataRes.GROUP_TYPE,
        status: dataRes.status,
        lstUserOfGroupInfo: dataRes.lstUserOfGroupInfo,
        id: dataRes.Id,
        GROUP_TYPE: dataRes.GROUP_TYPE,
        // dataRes.GROUP_TYPE === "A"
        //     ? "Quản trị"
        //     : dataRes.GROUP_TYPE === "M"
        //     ? "Nghiệp vụ"
        //     : "dataRes.GROUP_TYPE",
        // : dataRes.GROUP_TYPE,
        Ips: dataRes.Ips,
        tranid:dataRes.tranid,
        userApproveWaitingQuantity: dataRes.NumberOfWaitingUsers,
        userQuantity: dataRes.NumberOfUsers,
        listWaitingUsers: dataRes.lstWaitingUser,
    };
};
