/**
 * Created by linchunhui on 2018/10/02
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.role.controller", [])
            .controller("RoleCtrl", ["$scope", "$rootScope", "$state", "NLTables", "GrowlTip", "StringUtils", "DownloadUtil", "modulePath", "Exception",
                "RoleResource", "MenuResource", "RoleService", "$NLTree", "$translate",
                function ($scope, $rootScope, $state, NLTables, GrowlTip, StringUtils, DownloadUtil, modulePath, Exception,
                          RoleResource, MenuResource, RoleService, $NLTree, $translate) {

                    $scope.statusList = [
                        {
                            "code": 1,
                            "text": $translate.instant("status.normal")
                        },
                        {
                            "code": 0,
                            "text": $translate.instant("status.locked")
                        }
                    ];
                    $scope.folderTreeConfig = {
                        toggledOpenIcon: "fa fa-folder-open-o",
                        toggledCloseIcon: "fa fa-folder-o"
                    };
                    $scope.toEditRole = function(roleId) {
                        // 获取所有的菜单（包括不同平台之间的，只关注同一个character）
                        MenuResource.listAll({}, function(menuList){
                            // $scope.power.menuAllList = data;
                            $scope.menuList = menuList;
                            // 获取所有的功能权限（包括不同平台之间的，只关注同一个character)
                            MenuResource.listAllMenuFunction({}, function(menuFunctionList) {
                                // $scope.power.allMenuFunctionList = data;
                                $scope.menuFunctionList = menuFunctionList;
                                //分配初始的功能权限。
                                if (roleId == undefined) {
                                    // $scope.power.roleFunctionList = [];
                                    $scope.role = undefined;
                                    // initMenu();
                                    $scope.nodes = RoleService.initMenu(menuList, menuFunctionList, []);
                                    $("#roleModal").modal("show");
                                } else {
                                    RoleResource.get({roleId: roleId}, function (data) {
                                        $scope.role = data;
                                        /**
                                         * 获取角色拥有的所有权限
                                         */
                                        RoleResource.listMenuFunctionsByRoleId({roleId: roleId}, function(roleMenuFunctionList) {
                                            // $scope.power.roleFunctionList = data;
                                            $("#roleModal").modal("show");
                                            // initMenu();
                                            $scope.roleMenuFunctionList = roleMenuFunctionList;
                                            var nodes = RoleService.initMenu(menuList, menuFunctionList, roleMenuFunctionList);
                                            $NLTree.recursiveState(nodes, "data");
                                            $scope.nodes = nodes;
                                        }, GrowlTip.errorResponseFunction);
                                    }, GrowlTip.errorResponseFunction);
                                }
                            });
                        }, GrowlTip.errorResponseFunction);
                    };
                    $scope.saveRole = function () {
                        var role = $scope.role;
                        try {
                            if (StringUtils.isEmpty(role.roleName)) {
                                throw new Exception("请填写角色名称");
                            }

                            var nodes = $NLTree.getCheckedList($scope.nodes, "data", false);

                            console.log(nodes);
                            if (nodes.length < 1) {
                                throw new Exception("请配置权限-1");
                            }

                            if (nodes.length < 1) {
                                throw new Exception("请配置权限-2");
                            }

                            $scope.role.roleFunctionList = nodes;
                        } catch(e) {
                            GrowlTip.error(e.message);
                            return;
                        }

                        RoleResource.save({roleId: $scope.role.roleId}, $scope.role, function(data) {
                            GrowlTip.success("保存成功");
                            $scope.initTable();
                            $("#roleModal").modal("hide");
                        }, GrowlTip.errorResponseFunction);
                    };

                    // $scope.toEditRole = function(roleId) {
                    //     $scope.power = undefined;
                    //     $scope.power = {};
                    //     /**
                    //      * 获取所有的菜单
                    //      */
                    //
                    //     MenuResource.listAll({}, function(data){
                    //         $scope.power.menuAllList = data;
                    //         MenuResource.listAllMenuFunction({}, function(data) {
                    //             $scope.power.allMenuFunctionList = data;
                    //
                    //             if (roleId == undefined) {
                    //                 $scope.power.roleFunctionList = [];
                    //                 $scope.role = undefined;
                    //                 initMenu();
                    //                 $("#roleModal").modal("show");
                    //             } else {
                    //                 RoleResource.get({roleId: roleId}, function (data) {
                    //                     $scope.role = data;
                    //                     /**
                    //                      * 获取角色拥有的所有权限
                    //                      */
                    //                     RoleResource.listMenuFunctionsByRoleId({roleId: roleId}, function(data) {
                    //                         $scope.power.roleFunctionList = data;
                    //                         $("#roleModal").modal("show");
                    //                         initMenu();
                    //                     }, GrowlTip.errorResponseFunction);
                    //
                    //                 }, GrowlTip.errorResponseFunction);
                    //
                    //
                    //             }
                    //
                    //         });
                    //     }, GrowlTip.errorResponseFunction);
                    // };
                    //
                    // $scope.saveRole = function () {
                    //     var role = $scope.role;
                    //     try {
                    //         if (StringUtils.isEmpty(role.roleName)) {
                    //             throw new Exception("请填写角色名称");
                    //         }
                    //
                    //         var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    //         var nodes = treeObj.getCheckedNodes(true);
                    //
                    //         if (nodes.length < 1) {
                    //             throw new Exception("请配置权限-1");
                    //         }
                    //
                    //         var saveRoleFunction = [];
                    //         for (var i = 0; i < nodes.length; i ++) {
                    //             var node = nodes[i];
                    //             if (node.children == undefined) {
                    //                 var roleFunction = {
                    //                     menuFuncId: node.id
                    //                 }
                    //                 saveRoleFunction.push(roleFunction);
                    //             }
                    //         }
                    //
                    //         if (saveRoleFunction.length < 1) {
                    //             throw new Exception("请配置权限-2");
                    //         }
                    //
                    //         $scope.role.roleFunctionList = saveRoleFunction;
                    //     } catch(e) {
                    //         GrowlTip.error(e.message);
                    //         return;
                    //     }
                    //
                    //     RoleResource.save({roleId: $scope.role.roleId}, $scope.role, function(data) {
                    //         GrowlTip.success("保存成功");
                    //         $scope.initTable();
                    //         $("#roleModal").modal("hide");
                    //     }, GrowlTip.errorResponseFunction);
                    // };
                    //
                    // /**
                    //  * allMenuFunctionList: 所有的菜单
                    //  * menuAllList: 所有的子权限
                    //  * roleFunctionList: 角色拥有的权限
                    //  * @type {{}}
                    //  */
                    // $scope.power = {};
                    //
                    // $scope.$watch("power", function(n, o) {
                    //     if ($scope.nodes == undefined) {
                    //         if ($scope.power.allMenuFunctionList != undefined
                    //             && $scope.power.roleFunctionList != undefined
                    //             && $scope.power.menuAllList != undefined) {
                    //             initMenu();
                    //         }
                    //     }
                    // }, true);
                    //
                    //
                    //
                    // function initMenu() {
                    //     // 获取所有的菜单权限列表,并同时增加子功能权限
                    //     var allMenuFunctionList = $scope.power.allMenuFunctionList;
                    //     var roleFunctionList = $scope.power.roleFunctionList;
                    //     var menuAllList = $scope.power.menuAllList;
                    //     for (var i = 0; i < allMenuFunctionList.length; i ++) {
                    //         var menuFunction = allMenuFunctionList[i];
                    //
                    //         for (var j = 0; j < roleFunctionList.length; j++) {
                    //             var roleFunction = roleFunctionList[j];
                    //             if (menuFunction.menuFuncId == roleFunction.menuFuncId) {
                    //                 menuFunction.checked = true;
                    //             }
                    //         }
                    //     }
                    //
                    //     $scope.nodes = getAllNodes(menuAllList, allMenuFunctionList);
                    //     console.log($scope.nodes);
                    //
                    //     var setting = {
                    //         check: {
                    //             enable: true,
                    //             chkboxType:  { "Y" : "ps", "N" : "ps" }
                    //         },
                    //         data: {
                    //             simpleData: {
                    //                 enable: true
                    //             }
                    //         },
                    //         view: {
                    //             autoCancelSelected: false,
                    //             selectedMulti: false
                    //         }
                    //     };
                    //     $.fn.zTree.init($("#treeDemo"), setting, $scope.nodes);
                    //
                    //     $scope.zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    //
                    // };
                    //
                    // /**
                    //  * 在所有菜单中,增加子操作权限,并转换成nodes格式
                    //  * @param menuList 所有菜单
                    //  * @param allMenuFunctionList 所有子权限
                    //  * @returns {Array}
                    //  */
                    // function getAllNodes(menuList, allMenuFunctionList) {
                    //     var nodes = [];
                    //     for (var i = 0; i < menuList.length; i ++) {
                    //         var menu = menuList[i];
                    //         // if (menu.parentMenuId == 0) {
                    //         //     continue;
                    //         // }
                    //         var node = {
                    //             id: menu.menuId,
                    //             pId: menu.parentMenuId,
                    //             name: menu.menuTitle,
                    //             open: true
                    //         };
                    //         nodes.push(node);
                    //         getFunctionListAsNodes(nodes, allMenuFunctionList, menu.menuId)
                    //     }
                    //     return nodes;
                    // }
                    //
                    // /**
                    //  * 根据menuId查找所有的子权限,并转换成nodes数组返回
                    //  * @param nodes
                    //  * @param allMenuFunctionList 所有的子权限
                    //  * @param menuId 要查找的menuId
                    //  */
                    // function getFunctionListAsNodes(nodes, allMenuFunctionList, menuId) {
                    //     for (var i = 0; i < allMenuFunctionList.length; i ++) {
                    //         var menuFunction = allMenuFunctionList[i];
                    //         if (menuFunction.menuId == menuId) {
                    //             var node = {
                    //                 id: menuFunction.menuFuncId,
                    //                 pId: menuId,
                    //                 name: menuFunction.funName,
                    //                 checked: menuFunction.checked
                    //             };
                    //             nodes.push(node);
                    //         }
                    //     }
                    // }

                    $scope.initTable = function () {
                        var roleColumns = [
                            {
                                // "title": "角色名称",
                                "translateKey": "role_name",
                                "name": "roleName"
                            },
                            {
                                // "title": "状态",
                                "translateKey": "label.status",
                                "name": "status",
                                "format": function(row) {
                                    if (row.status == 1) {
                                        return $translate.instant("status.normal");
                                    } else if (row.status == 0) {
                                        return "<span class=\"text-red\">" + $translate.instant("status.locked") + "</span>";
                                    }
                                }
                            },
                            {
                                // "title": "备注",
                                "translateKey": "remark",
                                "name": "remark"
                            },
                            // {
                            //     "title": "创建时间",
                            //     "name": "creTime"
                            // },
                            {
                                "translateKey": "label.edit",
                                "class": "text-center",
                                "format": function(row) {
                                    return "<i class=\"fa fa-edit text-green\"></i>"
                                },
                                "click": function(row) {
                                    $scope.toEditRole(row.roleId);
                                }
                            },
                            {
                                "translateKey": "label.delete",
                                "class": "text-center",
                                "format": function(row) {
                                    return "<i class=\"fa fa-trash-o text-red\"></i>"
                                },
                                "click": function(row) {
                                    // $scope.deleteRole(row);
                                    $scope.showDeleteDialog($translate.instant("module_role.delete_title"), $translate.instant("module_role.delete_content"), function () {
                                        RoleResource.delete({roleId: row.roleId}, function () {
                                            GrowlTip.success("删除成功");
                                            $scope.closeDeleteDialog();
                                            $scope.initTable();
                                        }, GrowlTip.errorResponseFunction);
                                    })
                                }
                            }
                        ];
                        $scope.table = NLTables(roleColumns, function (injectParam, serverRequest) {
                            RoleResource.query({
                                "pageNo": injectParam.pageNo,
                                "pageSize": injectParam.pageSize,
                                condition: $scope.condition
                            }, function(data) {
                                serverRequest(data);
                            }, GrowlTip.errorResponseFunction);
                        });
                    }

            }
        ]);

    });
