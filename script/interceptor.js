define(["angular", "interceptor/header.interceptor", "interceptor/global-exception.interceptor"],
    function(angular){
        var module = angular.module('module.interceptor', [
            "module.interceptor.header",
            "module.interceptor.exception"
        ]);
        return module;
    }
);
