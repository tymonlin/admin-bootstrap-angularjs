/**
 * Create by linchunhui on 2018/10/3
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.menu.resource", ["ngResource"])
            .service("MenuResource", ["$resource", "modulePath", function ($resource, modulePath) {
                return $resource(modulePath.authorization + "/menu/:menuId", {}, {
                    query: {
                        method: "GET",
                        isArray: false
                    },
                    listAll: {
                        url: modulePath.authorization + "/menu/all",
                        method: "GET",
                        isArray: true
                    },
                    listAllMenuFunction: {
                        url: modulePath.authorization + "/menu/functions/all",
                        method: "GET",
                        isArray: true
                    }
                });
            }]);
    }
);