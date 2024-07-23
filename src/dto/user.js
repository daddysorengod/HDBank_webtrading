export const userDto = (dataRes) => {
    return {
        id: dataRes.id,
        isActive: dataRes.is_active,
        username: dataRes.userName,
        name: dataRes.STAFF_NAME,
        phone: dataRes.PHONE,
        email: dataRes.EMAIL,
        roleQuantity: dataRes.numberOfGroup,
        tranId: dataRes.TRANID
    }
}
