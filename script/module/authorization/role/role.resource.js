/**
 * Create by linchunhui on 2018/10/3
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.role.resource", ["ngResource"])
            .service("RoleResource", ["$resource", "modulePath", function ($resource, modulePath) {
                return $resource(modulePath.authorization + "/role/:roleId", {}, {
                    query: {
                        method: "GET",
                        isArray: false
                    },
                    list: {
                        url: modulePath.authorization + "/role/list/all",
                        method: "GET",
                        isArray: true
                    },
                    // findAllMenu: {
                    //     url: modulePath.crm + "/role/menus",
                    //     method: "GET",
                    //     isArray: true
                    // },
                    listMenuFunctionsByRoleId: {
                        url: modulePath.authorization + "/role/:roleId/menu-functions",
                        method: "GET",
                        isArray: true
                    }
                    // findMapByManagerStaffId: {
                    //     url: modulePath.crm + "/branch/power/manager/all.jhtml",
                    //     method: "GET",
                    //     isArray: true
                    // },
                    // /**
                    //  * 查找登陆者账号所属的分支机构列表
                    //  */
                    // findStaffAll: {
                    //     url: modulePath.crm + "/branch/staff/all.jhtml",
                    //     method: "GET",
                    //     isArray: true
                    // }
                });
            }]);
    }
);