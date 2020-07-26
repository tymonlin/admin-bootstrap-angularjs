/**
 * Created by linchunhui on 2018/10/3.
 */
define(["require", "angular", "ui-router"],
    function (require) {
        return require(["app"], function (app) {
            app.config(["$stateProvider", "$urlRouterProvider", "httpVersion", function ($stateProvider, $urlRouterProvider, httpVersion) {
                $stateProvider
                    .state("permission", {
                        url: "/permission",
                        templateUrl: "views/common.html?v=" + httpVersion()
                    });
            }]);
        });
    });