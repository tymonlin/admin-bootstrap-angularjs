/**
 * Created by linchunhui on 30/04/2017.
 *
 */
define(["angular", "ngCookies"],
    function (angular) {
        return angular.module("module.main.controller", ["ngCookies"])
            .controller("MainCtrl", ["$scope", "$state", "$cookies", "properties",
                function ($scope, $state, $cookies, properties) {
                    // i18n设置
                    $scope.WebSiteName = properties.WebSiteName;
                    $scope.$state = $state;
                    $scope.platformVersion = properties.version;

                    $scope.convertToInt = function(str) {
                        return parseInt(str);
                    };
                    $scope.closeDeleteDialog= function() {
                        $("#confirmDeleteDialog").modal("toggle");
                    };
                    $scope.showDeleteDialog = function(title, content, confirm, cancel) {
                        $scope.confirmDialog = {
                            title: title,
                            content: content,
                            confirm: confirm,
                            cancel: cancel
                        };
                        $("#confirmDeleteDialog").modal("show");
                    };
                    $scope.closeConfirmDialog = function() {
                        $("#confirmDialog").modal("toggle");
                    };
                    $scope.showConfirmDialog = function(title, content, btnSureTitle, confirm, cancel) {
                        $scope.confirmDialog = {
                            title: title,
                            content: content,
                            btnSureTitle: btnSureTitle,
                            confirm: confirm,
                            cancel: cancel
                        };
                        $("#confirmDialog").modal("show");
                    };
                }
            ])
    }
);