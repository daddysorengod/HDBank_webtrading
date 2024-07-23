const authRoutes = [
    {
        path: "/authentication",
        component: () => import("layouts/AuthLayout"),
        children: [
            {
                path: "login",
                component: () => import("pages/auth/Login"),
                name: "login",
            },
            // {
            //     path: "sso-login",
            //     component: () => import("pages/auth/ssoLogin"),
            //     name: "sso-login",
            // },
            {
                path: "reset-password",
                component: () => import("pages/auth/ResetPassword"),
                name: "resetPassword",
            },
            {
                path: "change-password",
                component: () => import("pages/auth/ChangePassword"),
                name: "changePassword",
            },
        ],
    },
];

export default authRoutes;
