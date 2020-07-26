/**
 * Created by linchunhui on 15/12/30.
 */
define(["require", "angular", "app"], function (require, angular) {
    require(["domReady!"], function (dom) {
        angular.bootstrap(dom, ["app"]);
    });
});