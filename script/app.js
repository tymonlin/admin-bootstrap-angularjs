define(["angular", "angular-ui-router", "angular-route", "router", "interceptor", "controller"], function(angular){
    var app = angular.module("app", ["ui.router", "module.interceptor", "module.main.controller"]);

    app.config(["$httpProvider", function ($httpProvider) {
        // $httpProvider.interceptors.push("HeaderInterceptor");
        // $httpProvider.interceptors.push("GlobalExceptionInterceptor");
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    }]);
    app.constant("httpVersion", function () {
        return (new Date()).getTime();
    });
    app.constant("properties", {
        "tokenName": "WEB-TOKEN",
        "WebSiteName": "Cloud Pay Full Admin",
        "topMenuShowFlag": true,
        "version": "V1.0.00"
    });
    return app;
});