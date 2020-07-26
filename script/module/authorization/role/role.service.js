/**
 * Create by linchunhui on 2018/10/3
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.role.service", ["ngResource"])
            .factory("RoleService", ["$NLTree", function ($NLTree) {
                return {
                    initMenu: function (menuList, menuFunctionList, defaultMenuFunctionList) {
                        //先给所有已有的权限配置为 checked=true;
                        var i = 0, j = 0;
                        for (i = 0; i < menuFunctionList.length; i ++) {
                            var menuFunction = menuFunctionList[i];
                            for (j = 0; j < defaultMenuFunctionList.length; j++) {
                                console.log(menuFunction.menuFuncCode, defaultMenuFunctionList[j].menuFuncCode);
                                if (menuFunction.menuFuncCode == defaultMenuFunctionList[j].menuFuncCode) {
                                    menuFunction.checked = 2;
                                    continue;
                                }
                            }
                        }
                        var funcList = [];
                        for (i = 0; i < menuList.length; i++) {
                            var menu = menuList[i];
                            menu.translateKey = "menu.m_" + menu.menuId;
                            if (menu.icon) {
                                menu.nodeIcon = "fa " + menu.icon;
                            }
                            for (j = 0; j < menuFunctionList.length; j++) {
                                var func = menuFunctionList[j];
                                if (func.menuId == menu.menuId) {
                                    var m = {
                                        menuTitle: func.funName,
                                        parentMenuId: func.menuId,
                                        menuId: func.menuFuncCode,
                                        menuFuncCode: func.menuFuncCode,
                                        checked: func.checked,
                                        treeNode: false,
                                        nodeIcon: "fa fa-file-o",
                                        translateKey: "menu.function." + func.menuFuncCode.split(".")[1]
                                    };
                                    funcList.push(m);
                                }
                            }
                        }
                        menuList = menuList.concat(funcList);
                        return $NLTree.sortDataList(menuList, 0, "menuId", "parentMenuId");
                    }
                };
            }]);
    }
);