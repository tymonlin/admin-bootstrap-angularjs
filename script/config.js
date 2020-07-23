define(["require"], function(require) {
    require(["app"], function(app) {
        app.config(["$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push("HeaderInterceptor");
            $httpProvider.interceptors.push("GlobalExceptionInterceptor");
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
        }]);
        app.constant("debug", false);
        app.constant("ctx", "/online");
        app.constant("modulePath", {
            "authorization": "/online/module-authorization"
        });
        app.constant("httpVersion", function () {
            return (new Date()).getTime();
        });
        app.constant("properties", {
            "tokenName": "WEB-TOKEN",
            "WebSiteName": "Cloud Pay Full Admin",
            "topMenuShowFlag": true,
            "version": "V1.0.00"
        });
    });
});
