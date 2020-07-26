/**
 * Created by linchunhui on 2018/10/3.
 */
define(["require", "angular", "ui-router"],
    function (require) {
        return require(["app"], function (app) {
            app.config(["$stateProvider", "$urlRouterProvider", "httpVersion", function ($stateProvider, $urlRouterProvider, httpVersion) {
                $stateProvider
                    .state("permission.user", {
                        url: "/user",
                        templateUrl: "views/authorization/user/user-list.html?v=" + httpVersion()
                    })
                    .state("permission.user-edit", {
                        url: "/user-edit",
                        templateUrl: "views/authorization/user/user-edit.html?v=" + httpVersion(),
                        params: {userId: null, mode: null}
                    });
            }]);
        });
    });