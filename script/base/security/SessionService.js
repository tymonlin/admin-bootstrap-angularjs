/**
 * Created by linchunhui on 16/6/27.
 */
define(["angular"], function(angular) {
    return angular.module("base.security", [])
        .factory('SessionService', ["properties", function(properties){

            /**
             * menuTopMenuId可以预设置成空，如果为空时，则会先寻找权限中 parentMenuId = 0 的列表，然后取其中第一个作为当前权限的列表
             * @type {{isLogin: boolean, platCode: string, tokenKey: string, menuTopMenuId: number}}
             */
            var config = {
                tokenKey: properties.tokenName,
                isLogin: false,
                platCode: properties.platCode
            };
            return config;
        }]);
});