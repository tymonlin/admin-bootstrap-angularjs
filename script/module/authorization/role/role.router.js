/**
 * Created by linchunhui on 2018/10/3.
 */
define(["require", "angular", "ui-router"],
    function (require) {
        return require(["app"], function (app) {
            app.config(["$stateProvider", "$urlRouterProvider", "httpVersion", function ($stateProvider, $urlRouterProvider, httpVersion) {
                $stateProvider
                    .state("permission.role", {
                        url: "/role",
                        templateUrl: "views/authorization/role/role-list.html?v=" + httpVersion()
                    });
            }]);
        });
    });