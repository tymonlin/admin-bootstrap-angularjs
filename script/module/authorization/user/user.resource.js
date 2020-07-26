/**
 * Created by linchunhui on 16/8/4.
 */
define(["angular", "ngResource"], function (angular) {
    return angular.module("module.authorization.user.resource", ["ngResource"])
        .factory("UserResource", ["$resource", "modulePath",
            function ($resource, modulePath) {
                return $resource(modulePath.authorization + "/user/:userId", {}, {
                    query: {
                        isArray: false
                    },
                    resetPassword: {
                        url: modulePath.authorization + "/user/:userId/reset/password",
                        isArray: false,
                        method: "POST"
                    },
                    lock: {
                        url: modulePath.authorization + "/user/:userId/lock",
                        isArray: false,
                        method: "POST"
                    },
                    unlock: {
                        url: modulePath.authorization + "/user/:userId/unlock",
                        isArray: false,
                        method: "POST"
                    },
                    listRoles: {
                        url: modulePath.authorization + "/user/:userId/roles",
                        isArray: true,
                        method: "GET"
                    }
                });
            }
        ]);
});