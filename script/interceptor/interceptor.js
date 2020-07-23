define(["angular", "interceptor/header.interceptor", "interceptor/global-exception.interceptor"],
    function(angular){
        var module = angular.module('interceptor', [
            "interceptor.header",
            "interceptor.global.exception"
        ]);
        return module;
    }
);
