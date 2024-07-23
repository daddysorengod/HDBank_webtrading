import {
    PERMISSION_APPROVE_DEPOSIT,
    PERMISSION_APPROVE_IMPORT,
    PERMISSION_APPROVE_ORDER,
    PERMISSION_APPROVE_ROLE,
    PERMISSION_REJECT_ROLE,
    PERMISSION_APPROVE_TRANSACTION,
    PERMISSION_APPROVE_USER,
    PERMISSION_REJECT_USER,
    PERMISSION_APPROVE_WITHDRAW,
    PERMISSION_CREATE_DEPOSIT,
    PERMISSION_CREATE_IMPORT,
    PERMISSION_CREATE_ORDER,
    PERMISSION_CREATE_ROLE,
    PERMISSION_CREATE_USER,
    PERMISSION_CREATE_WITHDRAW,
    PERMISSION_DELETE_DEPOSIT,
    PERMISSION_DELETE_IMPORT,
    PERMISSION_DELETE_ORDER,
    PERMISSION_DELETE_ROLE,
    PERMISSION_DELETE_USER,
    PERMISSION_DELETE_WITHDRAW,
    PERMISSION_GROUP_DEPOSIT,
    PERMISSION_GROUP_IMPORT,
    PERMISSION_GROUP_ORDER,
    PERMISSION_GROUP_ROLE,
    PERMISSION_GROUP_USER,
    PERMISSION_GROUP_WITHDRAW,
    PERMISSION_LOOKUP_BALANCE,
    PERMISSION_LOOKUP_PERMISSION,
    PERMISSION_LOOKUP_STATEMENT,
    PERMISSION_ROLE_USER,
    PERMISSION_UPDATE_DEPOSIT,
    PERMISSION_UPDATE_IMPORT,
    PERMISSION_UPDATE_ORDER,
    PERMISSION_UPDATE_ROLE,
    PERMISSION_UPDATE_USER,
    PERMISSION_UPDATE_WITHDRAW,
    PERMISSION_VIEW_DEPOSIT,
    PERMISSION_VIEW_IMPORT,
    PERMISSION_VIEW_ORDER,
    PERMISSION_VIEW_ROLE,
    PERMISSION_VIEW_USER,
    PERMISSION_VIEW_WITHDRAW,
} from "src/roles/permission";

export const groupPermissions = {
    groupLookup: [
        {
            label: "menu.lookupBalance",
            value: PERMISSION_LOOKUP_BALANCE,
        },
        {
            label: "menu.lookupStatement",
            value: PERMISSION_LOOKUP_STATEMENT,
        },
        {
            label: "menu.lookupPermission",
            value: PERMISSION_LOOKUP_PERMISSION,
        },
        {
            label: "menu.approveTransaction",
            value: PERMISSION_APPROVE_TRANSACTION,
        },
    ],

    groupManage: [
        {
            label: "menu.manageUser",
            value: PERMISSION_GROUP_USER,
            permissions: [
                {
                    label: "permission.view",
                    value: PERMISSION_VIEW_USER,
                },
                {
                    label: "permission.update",
                    value: PERMISSION_UPDATE_USER,
                },
                {
                    label: "permission.delete",
                    value: PERMISSION_DELETE_USER,
                },
                {
                    label: "permission.create",
                    value: PERMISSION_CREATE_USER,
                },
                {
                    label: "permission.approve",
                    value: PERMISSION_APPROVE_USER || PERMISSION_REJECT_USER, 
                },
            ],
        },
        {
            label: "menu.manageRole",
            value: PERMISSION_GROUP_ROLE,
            permissions: [
                {
                    label: "permission.view",
                    value: PERMISSION_VIEW_ROLE,
                },
                {
                    label: "permission.update",
                    value: PERMISSION_UPDATE_ROLE,
                },
                {
                    label: "permission.delete",
                    value: PERMISSION_DELETE_ROLE,
                },
                {
                    label: "permission.create",
                    value: PERMISSION_CREATE_ROLE,
                },
                {
                    label: "permission.approve",
                    value: PERMISSION_APPROVE_ROLE || PERMISSION_REJECT_ROLE,
                },
            ],
        },
        {
            label: "menu.manageRoleUser",
            value: PERMISSION_ROLE_USER,
        },
    ],
    groupTransaction: [
        {
            label: "menu.order",
            value: PERMISSION_GROUP_ORDER,
            permissions: [
                {
                    label: "permission.view",
                    value: PERMISSION_VIEW_ORDER,
                },
                {
                    label: "permission.update",
                    value: PERMISSION_UPDATE_ORDER,
                },
                {
                    label: "permission.delete",
                    value: PERMISSION_DELETE_ORDER,
                },
                {
                    label: "permission.create",
                    value: PERMISSION_CREATE_ORDER,
                },
                {
                    label: "permission.approve",
                    value: PERMISSION_APPROVE_ORDER,
                },
            ],
        },
        {
            label: "menu.import",
            value: PERMISSION_GROUP_IMPORT,
            permissions: [
                {
                    label: "permission.view",
                    value: PERMISSION_VIEW_IMPORT,
                },
                {
                    label: "permission.update",
                    value: PERMISSION_UPDATE_IMPORT,
                },
                {
                    label: "permission.delete",
                    value: PERMISSION_DELETE_IMPORT,
                },
                {
                    label: "permission.create",
                    value: PERMISSION_CREATE_IMPORT,
                },
                {
                    label: "permission.approve",
                    value: PERMISSION_APPROVE_IMPORT,
                },
            ],
        },
        {
            label: "menu.requestDepository",
            value: PERMISSION_GROUP_DEPOSIT,
            permissions: [
                {
                    label: "permission.view",
                    value: PERMISSION_VIEW_DEPOSIT,
                },
                {
                    label: "permission.update",
                    value: PERMISSION_UPDATE_DEPOSIT,
                },
                {
                    label: "permission.delete",
                    value: PERMISSION_DELETE_DEPOSIT,
                },
                {
                    label: "permission.create",
                    value: PERMISSION_CREATE_DEPOSIT,
                },
                {
                    label: "permission.approve",
                    value: PERMISSION_APPROVE_DEPOSIT,
                },
            ],
        },
        {
            label: "menu.requestWithdraw",
            value: PERMISSION_GROUP_WITHDRAW,
            permissions: [
                {
                    label: "permission.view",
                    value: PERMISSION_VIEW_WITHDRAW,
                },
                {
                    label: "permission.update",
                    value: PERMISSION_UPDATE_WITHDRAW,
                },
                {
                    label: "permission.delete",
                    value: PERMISSION_DELETE_WITHDRAW,
                },
                {
                    label: "permission.create",
                    value: PERMISSION_CREATE_WITHDRAW,
                },
                {
                    label: "permission.approve",
                    value: PERMISSION_APPROVE_WITHDRAW,
                },
            ],
        },
    ],
};
