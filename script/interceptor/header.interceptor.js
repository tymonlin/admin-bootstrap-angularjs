/**
 * Created by linchunhui on 16/6/27.
 */
define(["angular", "ngCookies", "base/tip/Toast"],
    function(angular){
        return angular.module("interceptor.header", ["ngCookies"])
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