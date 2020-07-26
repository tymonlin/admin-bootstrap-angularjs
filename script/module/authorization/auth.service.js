/**
 * Created by linchunhui on 18/10/1.
 */
define(["angular", "base/tip/GrowlTip"], function (angular) {
    return angular.module("module.authorization.service", ["module.authorization.resource", "module.common.tip.growl-tip"])
        .service("AuthService", ["AuthResource", "$state", "$rootScope", "$cookies", "GrowlTip", "menuList", "debug",
            function (AuthResource, $state, $rootScope, $cookies, GrowlTip, menuList, debug) {
                var config = {};
                config.initMenuList = function(menuList, parentMenuId) {
                    var retList = [];
                    if (menuList === undefined || menuList.length < 1) {return retList;}
                    for (var i = 0; i < menuList.length; i ++) {
                        var menu = menuList[i];
                        if (menu.parentMenuId === parentMenuId) {
                            menu.menuList = config.initMenuList(menuList, menu.menuId);
                            retList.push(menu);
                        }
                    }
                    return retList.length < 1 ? undefined : retList;
                };
                config.getMenuList = function(userInfo, platCode) {
                    for (var i = 0; i < userInfo.platformInfoList.length; i++) {
                        var platformInfo = userInfo.platformInfoList[i];
                        if (platformInfo.platCode === platCode) {
                            return platformInfo.menuList;
                        }
                    }
                    return [];
                };
                config.initMenuAreaList = function(menuList) {
                    var retList = [];
                    if (menuList === undefined || menuList.length < 1) {return retList;}
                    for (var i = 0; i < menuList.length; i ++) {
                        var menu = menuList[i];
                        if (menu.parentMenuId === 0) {
                            retList.push(menu);
                        }
                    }
                    return retList.length < 1 ? undefined : retList;
                };

                config.getUserInfo = function(menuTopMenuId, platCode) {
                    AuthResource.getUserInfo({}, {}, function (data) {
                        var menuList = config.getMenuList(data, platCode);
                        if (menuTopMenuId === undefined) {
                            $rootScope.menuAreaArray = config.initMenuList(menuList, 0);
                            console.log(menuList);
                            if ($rootScope.menuAreaArray !== undefined && $rootScope.menuAreaArray.length > 0) {
                                menuTopMenuId = $rootScope.menuAreaArray[0].menuId;
                            }
                        }
                        $rootScope.menuArray = config.initMenuList(menuList, menuTopMenuId);
                        console.log(menuTopMenuId);
                        data.focusPlatformCode = platCode;
                        $rootScope.userInfo = data;
                    });
                };
                /**
                 * <p>登陆</p>
                 *
                 * @param requestBody
                 * @param loginListener
                 */
                config.login = function (requestBody, menuTopMenuId, loginListener) {
                    if (loginListener === undefined) {
                        loginListener = {
                            success: function () {
                                GrowlTip.dialog("登陆成功", "success", 1000);
                                $state.go("index");
                            },
                            error: function (response) {
                                GrowlTip.dialog(response.data.message, "danger");
                            }
                        };
                    }
                    AuthResource.login({}, requestBody, function(data){
                        var menuList = config.getMenuList(data, "ERP");
                        if (menuTopMenuId === undefined) {
                            $rootScope.menuAreaArray = config.initMenuList(menuList, 0);
                            if ($rootScope.menuAreaArray !== undefined && $rootScope.menuAreaArray.length > 0) {
                                menuTopMenuId = $rootScope.menuAreaArray[0].menuId;
                            }
                        }
                        $rootScope.menuArray = config.initMenuList(menuList, menuTopMenuId);
                        $rootScope.userInfo = data;
                        var cu = angular.copy(data);
                        cu.menuList = undefined;
                        cu.platformInfoList = undefined;
                        cu.menuFunctionList = undefined;
                        $cookies.putObject("userInfo", cu);
                        loginListener.success(data);
                    }, loginListener.error);
                };

                /**
                 * 登出
                 * @param logoutListener
                 */
                config.logout = function (logoutListener) {
                    if (logoutListener === undefined) {
                        logoutListener = {
                            success: function() {
                                GrowlTip.dialog("安全退出", "success", 1000);
                                $state.go("login");
                            },
                            error: function (response) {
                                GrowlTip.dialog(response.data.message, "danger");
                            }
                        };
                    }
                    AuthResource.logout({}, {}, function () {
                        $rootScope.userInfo = undefined;
                        $cookies.remove("userInfO");
                        logoutListener.success();
                    }, logoutListener.error);
                };

                config.changePassword = function (requestBody, listener) {
                    if (listener === undefined) {
                        listener = {
                            success: function () {
                                GrowlTip.dialog("密码修改成功, 请重新登陆", "success");
                                $state.go("login");
                            },
                            error: function (response) {
                                GrowlTip.dialog(response.data.message, "danger");
                            }
                        };
                    }
                    AuthResource.changePwd({}, requestBody, function () {
                        $rootScope.userInfo = undefined;
                        $cookies.remove("userInfO");
                        listener.success();
                    }, listener.error);
                };
                return config;
            }
        ]);
});