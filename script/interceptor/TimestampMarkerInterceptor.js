/**
 * Created by linchunhui on 16/6/27.
 */
define(["angular"],
    function(angular){
        return angular.module("interceptor", [])
            .factory("TimestampMarker", ["$rootScope", function ($rootScope) {
                var timestampMarker = {
                    request: function (config) {
                        $rootScope.loading = true;
                        config.requestTimestamp = new Date().getTime();
                        return config;
                    },
                    response: function (response) {
                        $rootScope.loading = false;
                        response.config.responseTimestamp = new Date().getTime();
                        return response;
                    }
                };
                return timestampMarker;
            }]);
    });