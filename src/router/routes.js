import authRoutes from "./auth";
import { GROUP_FUNCTION } from "src/common/constant";

const routes = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        redirect: { name: "lookupBalance" },
        children: [
            {
                path: "lookup-balance",
                component: () => import("pages/LookupBalance.vue"),
                name: "lookupBalance",
                meta: {
                    menu: {
                        hierarchy: false,
                        icon: "/icons/vp-wallet.svg",
                        title: "menu.lookupBalance",
                    },
                    parent: true,
                    permission: [GROUP_FUNCTION.BALANCE_LOOKING],
                },
            },
            {
                path: "lookup-statement",
                component: () => import("pages/LookupStatement.vue"),
                name: "lookupStatement",
                meta: {
                    menu: {
                        hierarchy: false,
                        icon: "/icons/vp-statement.svg",
                        title: "menu.lookupStatement",
                    },
                    parent: true,
                    permission: [GROUP_FUNCTION.ORDER_BOOK_LOOKING],
                },
            },
            {
                path: "lookup-permission",
                component: () => import("pages/lookup-permission/index.vue"),
                name: "lookupPermission",
                redirect: { name: "lookupInfoPermission" },
                meta: {
                    menu: {
                        hierarchy: true,
                        icon: "/icons/vp-star.svg",
                        title: "menu.lookupPermission",
                    },
                    parent: true,
                    permission: [GROUP_FUNCTION.RIGHTS_SEARCH],
                },
                children: [
                    {
                        path: "info",
                        component: () =>
                            import(
                                "pages/lookup-permission/LookupInfoPermission.vue"
                            ),
                        name: "lookupInfoPermission",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-star.svg",
                                title: "menu.lookupInfoPermission",
                            },
                            permission: [GROUP_FUNCTION.RIGHTS_SEARCH],
                        },
                    },
                    {
                        path: "owner",
                        component: () =>
                            import(
                                "pages/lookup-permission/LookupOwnerPermission.vue"
                            ),
                        name: "lookupOwnerPermission",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-star.svg",
                                title: "menu.lookupOwnerPermission",
                            },
                            permission: [GROUP_FUNCTION.RIGHTS_SEARCH],
                        },
                    },
                ],
            },
            // {
            //     path: "manage",
            //     component: () => import("pages/manage/index.vue"),
            //     name: "manage",
            //     redirect: { name: "user" },
            //     meta: {
            //         menu: {
            //             hierarchy: true,
            //             icon: "/icons/vp-user.svg",
            //             title: "menu.manage",
            //         },
            //         parent: true,
            //         permission: [
            //             GROUP_FUNCTION.USER_MANAGEMENT_VIEW,
            //             GROUP_FUNCTION.GROUP_MANAGEMENT_VIEW,
            //             GROUP_FUNCTION.USER_AUTHORIZATION
            //         ]
            //     },
            //     children: [
            //         {
            //             path: "user",
            //             component: () => import("pages/manage/User.vue"),
            //             name: "user",
            //             meta: {
            //                 menu: {
            //                     hierarchy: false,
            //                     icon: "/icons/vp-user.svg",
            //                     title: "menu.manageUser",
            //                 },
            //                 permission: [
            //                     GROUP_FUNCTION.USER_MANAGEMENT_VIEW
            //                 ]
            //             },
            //         },
            //         {
            //             path: "userApprove",
            //             component: () => import("pages/manage/UserApprove.vue"),
            //             name: "userApprove",
            //             meta: {
            //                 menu: {
            //                     hierarchy: false,
            //                     icon: "/icons/vp-user.svg",
            //                     title: "menu.manageUserApprove",
            //                 },
            //                 permission: [
            //                     GROUP_FUNCTION.USER_MANAGEMENT_VIEW
            //                 ]
            //             },
            //         },
            //         {
            //             path: "role",
            //             component: () => import("pages/manage/Role.vue"),
            //             name: "role",
            //             meta: {
            //                 menu: {
            //                     hierarchy: false,
            //                     icon: "/icons/vp-user.svg",
            //                     title: "menu.manageRole",
            //                 },
            //                 permission: [
            //                     GROUP_FUNCTION.GROUP_MANAGEMENT_VIEW
            //                 ]
            //             },
            //         },
            //         {
            //             path: "roleApprove",
            //             component: () => import("pages/manage/RoleApprove.vue"),
            //             name: "roleApprove",
            //             meta: {
            //                 menu: {
            //                     hierarchy: false,
            //                     icon: "/icons/vp-user.svg",
            //                     title: "menu.manageRoleApprove",
            //                 },
            //                 permission: [
            //                     GROUP_FUNCTION.GROUP_MANAGEMENT_VIEW
            //                 ]
            //             },
            //         },
            //         {
            //             path: "role-user",
            //             component: () => import("pages/manage/RoleUser.vue"),
            //             name: "roleUser",
            //             meta: {
            //                 menu: {
            //                     hierarchy: false,
            //                     icon: "/icons/vp-user.svg",
            //                     title: "menu.manageRoleUser",
            //                 },
            //                 permission: [
            //                     GROUP_FUNCTION.USER_AUTHORIZATION
            //                 ]
            //             },
            //         },
            //     ],
            // },
            {
                path: "approve-transaction",
                component: () =>
                    import("pages/transaction/ApproveTransaction.vue"),
                name: "approveTransaction",
                meta: {
                    menu: {
                        hierarchy: false,
                        icon: "/icons/vp-check-circle.svg",
                        title: "menu.approveTransaction",
                    },
                    parent: true,
                    permission: [GROUP_FUNCTION.BROWSE_TRANSACTIONS_ONLY],
                },
            },
            {
                path: "transaction",
                component: () => import("pages/transaction/index.vue"),
                name: "transaction",
                // redirect: { name: "orderTransaction" },
                meta: {
                    menu: {
                        hierarchy: true,
                        icon: "/icons/vp-transaction.svg",
                        title: "menu.transaction",
                    },
                    parent: true,
                    permission: [
                        GROUP_FUNCTION.TRANSACTIONS_FOR_BUYING_VIEW,
                        GROUP_FUNCTION.IMPORT_TRANSACTION_VIEW,
                        GROUP_FUNCTION.TRANSACTION_REQUIRED_DEPOSIT_VIEW,
                        GROUP_FUNCTION.TRANSACTION_REQUIRED_WITHDRAWAL_VIEW,
                    ],
                },
                children: [
                    {
                        path: "order",
                        component: () => import("pages/transaction/Order.vue"),
                        name: "orderTransaction",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-transaction.svg",
                                title: "menu.order",
                            },
                            permission: [
                                GROUP_FUNCTION.TRANSACTIONS_FOR_BUYING_VIEW,
                            ],
                        },
                    },
                    {
                        path: "import-statement",
                        component: () =>
                            import("pages/transaction/ImportStatement.vue"),
                        name: "importStatement",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-transaction.svg",
                                title: "menu.import",
                            },
                            permission: [
                                GROUP_FUNCTION.IMPORT_TRANSACTION_VIEW,
                            ],
                        },
                    },
                    {
                        path: "request-depository",
                        component: () =>
                            import("pages/transaction/RequestDepository.vue"),
                        name: "requestDepository",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-transaction.svg",
                                title: "menu.requestDepository",
                            },
                            permission: [
                                GROUP_FUNCTION.TRANSACTION_REQUIRED_DEPOSIT_VIEW,
                            ],
                        },
                    },
                    {
                        path: "request-withdraw",
                        component: () =>
                            import("pages/transaction/RequestWithdraw.vue"),
                        name: "requestWithdraw",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-transaction.svg",
                                title: "menu.requestWithdraw",
                            },
                            permission: [
                                GROUP_FUNCTION.TRANSACTION_REQUIRED_WITHDRAWAL_VIEW,
                            ],
                        },
                    },
                ],
            },
            {
                path: "lookup-transaction",
                component: () =>
                    import("pages/transaction/LookupTransaction.vue"),
                name: "lookupTransaction",
                meta: {
                    menu: {
                        hierarchy: false,
                        icon: "/icons/vp-check-circle.svg",
                        title: "menu.lookupTransaction",
                    },
                    parent: true,
                    permission: [GROUP_FUNCTION.LOOKUP_TRANSACTIONS],
                },
            },
            {
                path: "fund-admin",
                component: () => import("pages/fund-admin/index.vue"),
                name: "fund-admin",
                meta: {
                    menu: {
                        hierarchy: false,
                        icon: "/icons/vp-import.svg",
                        title: "menu.fundAdmin",
                    },
                    parent: true,
                    permission: [
                        GROUP_FUNCTION.FUND_ADMIN_IMPORT,
                        GROUP_FUNCTION.FUND_ADMIN_APPROVE,
                        GROUP_FUNCTION.FUND_ADMIN_DETAIL,
                    ],
                },
                children: [
                    {
                        path: "import",
                        component: () =>
                            import("pages/fund-admin/FundAdminImport.vue"),
                        name: "fundAdminImport",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-import.svg",
                                title: "menu.fundAdminImport",
                            },
                            permission: [GROUP_FUNCTION.FUND_ADMIN_IMPORT],
                        },
                    },
                    {
                        path: "approve",
                        component: () =>
                            import("pages/fund-admin/FundAdminApprove.vue"),
                        name: "fundAdminApprove",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-import.svg",
                                title: "menu.fundAdminApprove",
                            },
                            permission: [GROUP_FUNCTION.FUND_ADMIN_APPROVE],
                        },
                    },
                    {
                        path: "detail",
                        component: () =>
                            import("pages/fund-admin/FundAdminDetail.vue"),
                        name: "fundAdminDetail",
                        meta: {
                            menu: {
                                hierarchy: false,
                                icon: "/icons/vp-import.svg",
                                title: "menu.fundAdminDetail",
                            },
                            permission: [GROUP_FUNCTION.FUND_ADMIN_DETAIL],
                        },
                    },
                ],
            },
        ],
    },
    ...authRoutes,
    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/403",
        component: () => import("pages/Error403.vue"),
        name: "403",
    },
    {
        path: "/maintenance",
        component: () => import("pages/maintenance.vue"),
        name: "maintenance",
    },
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/Error404.vue"),
    },
];

export default routes;
