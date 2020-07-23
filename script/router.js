/**
 * Created by linchunhui on 2018/2/4.
 */
define(['require'],
    function (require) {
        return require(["app"], function (app) {
            app.config(['$stateProvider', '$urlRouterProvider', "httpVersion", function ($stateProvider, $urlRouterProvider, httpVersion) {
                $urlRouterProvider.when("", "/login");
                $stateProvider
                    .state("login", {
                        url: "/login",
                        templateUrl: "login.html?v=" + httpVersion(),
                        controller: "LoginCtrl"
                    })
                    .state("common", {
                        url: "/common",
                        templateUrl: "views/common.html?v=" + httpVersion()
                    })
                    .state("index", {
                        url: "/index",
                        templateUrl: "views/common.html?v=" + httpVersion()
                    });
            }]);
        });
    });