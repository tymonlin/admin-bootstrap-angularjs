/**
 * Created by linchunhui on 16/1/1.
 */
define(["angular", "base/security/SessionService", "base/tip/GrowlTip", "base/tip/Toast"],
    function (angular) {
        return angular.module("module.authorization.login", [
            "base.security",
            "module.common.tip.growl-tip",
            "base.tip.toast"
        ])
        .controller("LoginCtrl", ["$scope", "$rootScope", "$state", "$cookies", "SessionService", "GrowlTip", "Toast", "AuthService",
            function ($scope, $rootScope, $state, $cookies, SessionService, GrowlTip, Toast, AuthService) {
                var loginInfo = $cookies.getObject("loginInfo");
                if (loginInfo === undefined) {
                    loginInfo = {};
                }
                $scope.userName = loginInfo.account;
                $scope.saveAccount = loginInfo.saveAccount;
                $scope.$watch("saveAccount", function () {
                    cookiesAccount();
                });

                function cookiesAccount() {
                    if ($scope.saveAccount) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 30);//设置cookie保存30天
                        $cookies.putObject("loginInfo", {account: $scope.userName, "saveAccount": true}, {"expires": expireDate});
                    } else {
                        $cookies.remove("loginInfo");
                    }
                }

                $scope.login = function() {
                    var userName = $scope.userName;
                    var password = $scope.password;
                    cookiesAccount();
                    // var platCode = SessionService.platCode;
                    if (userName === undefined || userName === "" || userName.trim() === "") {
                        GrowlTip.dialog("请输入账号!", "danger");
                        return;
                    }
                    if (password == null || password === undefined || password.trim() === "") {
                        GrowlTip.dialog("请输入密码!", "danger");
                        return;
                    }

                    $rootScope.userInfo = {};
                    var requestBody = {"userName": userName, "password": password};

                    AuthService.login(requestBody, SessionService.menuTopMenuId, {
                        success: function () {
                            $state.go("guide");
                        },
                        error: function (response) {
                            GrowlTip.dialog(response.data.message, "danger");
                        }
                    });
                };

                $scope.checkLogin = function($event) {
                    if ($event.keyCode === 13) {
                        var userName = $scope.userName;
                        var password = $scope.password;

                        if (userName == null || userName === undefined || userName === "") {
                            $scope.userNameFocus = true;
                            return;
                        }
                        if ($scope.userNameFocus || password == null || password === undefined || password === "") {
                            $scope.passwordFocus = true;
                            return;
                        }
                        this.login();
                    }
                };
            }
        ]);

});
