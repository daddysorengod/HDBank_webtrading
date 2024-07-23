import {formatDate} from "src/common/utils/helper";

export const importStatementDto = (dataRes) => {

    return {
        id: dataRes.Id,
        voucherNumber: dataRes.Id,
        importDate: formatDate(dataRes.Created_Date, 'DD/MM/YYYY', "YYYY-MM-DD'T'HH:mm:ss"),
        status: dataRes.Td_Status,
        statusName: dataRes.Td_Status_Name
    }
}

export const importStatementDetailDto = (dataRes) => {

    return {
        id: dataRes.regisMasterInfo.Id,
        importType: dataRes.regisMasterInfo.Aflevel,
        importInfo: dataRes.importInfo,
        masterInfo: dataRes.regisMasterInfo
    }
}
