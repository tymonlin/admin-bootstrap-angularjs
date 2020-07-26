/**
 * Created by linchunhui on 16/8/4.
 */
define(["angular", "ngResource"], function (angular) {
    return angular.module("module.authorization.resource", ["ngResource"])
        .factory("AuthResource", ["$resource", "modulePath",
            function ($resource, modulePath) {
                return $resource("", {}, {
                    /**
                     * 登陆
                     */
                    login: {
                        url: modulePath.authorization + "/auth/login",
                        method: "POST"
                    },

                    /**
                     * 退出登陆
                     */
                    logout: {
                        url: modulePath.authorization + "/auth/logout",
                        method: "POST"
                    },

                    /**
                     * 密码修改
                     */
                    changePwd: {
                        url: modulePath.authorization + "/auth/password/change",
                        method: "POST"
                    },

                    getUserInfo: {
                        url: modulePath.authorization + "/auth/user/info",
                        method: "GET"
                    }
                });
            }
        ]);
});