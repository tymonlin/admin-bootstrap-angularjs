/**
 * Created by linchunhui on 16/6/27.
 */
define(["angular", "base/tip/Toast"],
    function(angular){
        return angular.module("interceptor.global.exception", ["base.security", "base.tip.growl-tip"])
            .factory("GlobalExceptionInterceptor", ["$state", "$q", "GrowlTip",
                function($state, $q, GrowlTip){
                    return {
                        responseError: function(response) {
                            // if (response.status == 404) {
                            //     GrowlTip.dialog("404服务异常：请求数据失败[" + $state.current.url + "]", "danger");
                            // } else {
                            //     GrowlTip.dialog(response.data.message, "danger");
                            // }
                            if (response.status == 503) {
                                GrowlTip.error("无法连接服务器，请检查网络!");
                                return $q.reject(response);
                            }
                            if (response.data.code == "1092") {
                                $state.go("login");
                            }
                            return $q.reject(response);
                        }
                    };
                }
            ])
});