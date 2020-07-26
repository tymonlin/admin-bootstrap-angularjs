/**
 * Created by linchunhui on 2018/10/02
 */
define(["angular"],
    function (angular) {
        return angular.module("module.authorization.user.controller", ["module.common.tip.growl-tip"])
            .controller("UserCtrl", ["$scope", "$rootScope", "$state", "NLTables", "GrowlTip", "StringUtils", "DateUtils", "$translate",
                "UserResource", "$translate",
                function ($scope, $rootScope, $state, NLTables, GrowlTip, StringUtils, DateUtils, $translate,
                          UserResource) {

                    $scope.statusList = [
                        {
                            "text": "正常",
                            "code": 1
                        },
                        {
                            "text": "锁定",
                            "code": 0
                        }
                    ];
                    $scope.toAdd = function() {
                        $state.go("permission.user-edit", {mode: "ADD"});
                    };
                    $scope.initTable = function () {
                        var injectParam = {pageSize: 15};
                        var columns = [
                            {
                                "translateKey": "label.user_name",
                                "name": "userName"
                            },
                            {
                                "translateKey": "label.mobile",
                                "name": "mobile"
                            },
                            // {
                            //     "translateKey": "label.belong_name",
                            //     "name": "belongName"
                            // },
                            {
                                "translateKey": "label.last_login_time",
                                "name": "lastLoginTime",
                                "format": function (row) {
                                    return row.lastLoginTime ? DateUtils.formatTDateString(row.lastLoginTime) : "";
                                }
                            },
                            {
                                "translateKey": "label.status",
                                format: function (row) {
                                    if (row.status == 0) {
                                        return "<span style=\"color: darkred\">" + $translate.instant("status.locked") + "</span>";
                                    } else if (row.status == 1) {
                                        return $translate.instant("status.normal");
                                    }
                                }
                            },
                            {
                                "translateKey": "label.lock_unlock",
                                "class": "text-center",
                                "format": function(row) {
                                    return row.status == 1 ? "<i class=\"fa fa-lock\"></i>" : "<i class=\"fa fa-unlock\"></i>";
                                },
                                "click": function(row) {
                                    if (row.status == 1) {
                                        $scope.showConfirmDialog($translate.instant("label.lock_sure_title"), $translate.instant("label.lock_sure_content") + "？", $translate.instant("label.btn_lock"), function () {
                                            UserResource.lock({userId: row.userId}, undefined, function () {
                                                GrowlTip.success($translate.instant("label.lock_success"));
                                                $scope.table.refresh();
                                                $scope.closeConfirmDialog();
                                            }, GrowlTip.errorResponseFunction);
                                        });
                                    } else {
                                        $scope.showConfirmDialog($translate.instant("label.unlock_sure_title"), $translate.instant("label.unlock_sure_content") + "？", $translate.instant("label.btn_unlock"), function () {
                                            UserResource.unlock({userId: row.userId}, undefined, function () {
                                                GrowlTip.success($translate.instant("label.unlock_success"));
                                                $scope.table.refresh();
                                                $scope.closeConfirmDialog();
                                            }, GrowlTip.errorResponseFunction);
                                        });
                                    }

                                }
                            },
                            {
                                "translateKey": "label.edit",
                                "class": "text-center",
                                "format": function() {
                                    return "<i class=\"fa fa-edit\"></i>";
                                },
                                "click": function(row) {
                                    $state.go("permission.user-edit", {userId: row.userId, mode: "EDIT"});
                                }
                            },
                            {
                                "translateKey": "label.reset_password",
                                "class": "text-center",
                                "format": function() {
                                    return "<i class=\"fa fa-recycle\"></i>";
                                },
                                "click": function(row) {
                                    $scope.showConfirmDialog($translate.instant("label.reset_password"), $translate.instant("label.reset_password_content") + "!", $translate.instant("label.btn_reset"), function () {
                                        UserResource.resetPassword({userId: row.userId}, undefined, function () {
                                            GrowlTip.success($translate.instant("label.reset_password_success"));
                                            $scope.table.refresh();
                                            $scope.closeConfirmDialog();
                                        }, GrowlTip.errorResponseFunction);
                                    });
                                }
                            }
                        ];

                        $scope.table = NLTables(columns, function (injectParam, serverRequest) {
                            UserResource.query({
                                "pageNo": injectParam.pageNo,
                                "pageSize": injectParam.pageSize,
                                "orgId": $scope.orgId,
                                "status": $scope.status,
                                "condition": $scope.condition
                            }, function(data){
                                serverRequest(data);
                            }, GrowlTip.errorResponseFunction);
                        }, injectParam);
                    };

                    $scope.toAddUser = function () {
                        $("#userEditModal").modal("show");
                    };
            }
        ]);

    });
