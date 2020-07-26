/**
 * Created by linchunhui on 16/6/27.
 */
define(["angular", "ngCookies"],
    function(angular){
        return angular.module("module.interceptor.header", ["ngCookies"])
            .factory("HeaderInterceptor", ["$rootScope", "$cookies", "properties",
                function($rootScope, $cookies, properties){
                    return {
                        request: function(config) {
                            if (!$rootScope.userInfo) $rootScope.userInfo = $cookies.getObject("properties.tokenName");
                            if ($rootScope.userInfo != undefined) config.headers[properties.tokenKey] = $rootScope.userInfo.token;
                            return config;
                        }
                    };
                }
            ])
});