/**
 * Created by linchunhui on 2018/10/02
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.user.edit.controller", ["module.common.tip.growl-tip"])
            .controller("UserEditCtrl", ["$scope", "$rootScope", "$state", "$stateParams", "GrowlTip", "StringUtils", "DateUtils", "Exception",
                "UserResource", "OrganizationResource", "RoleResource", "$translate", "$NLTree",
                function ($scope, $rootScope, $state, $stateParams, GrowlTip, StringUtils, DateUtils, Exception,
                          UserResource, OrganizationResource, RoleResource, $translate, $NLTree) {
                    var userId = $stateParams.userId;
                    var mode = $stateParams.mode;
                    if (mode == undefined) {
                        $state.go("permission.user");
                        return;
                    }

                    $scope.initOrganizationList = function() {
                        OrganizationResource.list({}, function (dataList) {
                            var targetList = $NLTree.sortDataList(dataList, undefined, "orgId", "parentOrgId");
                            if (userId) {
                                UserResource.get({userId: userId}, function (data) {
                                    $scope.user = data;
                                    initSelctedRow(targetList, data.orgId);
                                    $scope.organizationList = targetList;


                                }, GrowlTip.errorResponseFunction);
                            } else {
                                $scope.organizationList = targetList;
                            }
                        }, GrowlTip.errorResponseFunction);
                    };

                    function initSelctedRow(dataList, selectedOrgId) {
                        for (var i = 0; i < dataList.length; i++) {
                            if (dataList[i].orgId == selectedOrgId) {
                                $scope.selectedOrg = dataList[i];
                                $scope.selectedOrg.active = true;
                                return true;
                            }
                            if (dataList[i].data) {
                                if (initSelctedRow(dataList[i].data, selectedOrgId)) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    }
                    $scope.selected = function(row) {
                        $scope.selectedOrg = row;
                    };

                    $scope.initRoleList = function() {
                        RoleResource.list({}, function (roleList) {
                            UserResource.listRoles({userId: userId}, function (data) {
                                for (var i = 0; i < roleList.length; i++) {
                                    var role = roleList[i];
                                    for (var j = 0; j < data.length; j++) {
                                        var r = data[j];
                                        if (role.roleId == r.roleId) {
                                            role.checked = 2;
                                        }
                                    }
                                }
                                $scope.roleList =  roleList;
                            }, GrowlTip.errorResponseFunction);
                        }, GrowlTip.errorResponseFunction);
                    };
                    $scope.saveUser = function () {
                        var user = $scope.user;
                        if (StringUtils.isEmpty(user.userName)) {
                            GrowlTip.error($translate.instant("module_user.error.enter_user_name"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if (user.userName.length < 6) {
                            GrowlTip.error($translate.instant("module_user.error.enter_user_name_short_6"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if (user.userName.length > 32) {
                            GrowlTip.error($translate.instant("module_user.error.enter_user_name_long_32"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if (StringUtils.isEmpty(user.name)) {
                            GrowlTip.error($translate.instant("module_user.error.enter_name"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if (user.name.length > 32) {
                            GrowlTip.error($translate.instant("module_user.error.enter_name_long_32"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }

                        if (StringUtils.isEmpty(user.email)) {
                            GrowlTip.error($translate.instant("module_user.error.enter_email"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if (user.email.length > 128) {
                            GrowlTip.error($translate.instant("module_user.error.enter_email_long_128"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if (user.remark != undefined && user.remark.length > 512) {
                            GrowlTip.error($translate.instant("module_user.error.remark_too_long"), function () {
                                $("#userName").focus();
                            });
                            return;
                        }
                        if ($scope.selectedOrg == undefined) {
                            GrowlTip.error($translate.instant("module_user.error.select_organization"));
                            return;
                        }
                        user.orgId = $scope.selectedOrg.orgId;
                        user.roleList = $NLTree.getCheckedList($scope.roleList, "data", true);
                        UserResource.save({userId: user.userId}, user, function() {
                            GrowlTip.success("账号保存成功");
                            $state.go("permission.user");
                        }, GrowlTip.errorResponseFunction);
                    };
                }
        ]);

    });
