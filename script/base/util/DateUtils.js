/**
 * Created by linchunhui on 27/04/2017.
 */
define(["angular"], function (angular) {
    angular.module("base.util")
        .service('DateUtils', function () {
            return {
                getNowDate: function () {
                    var s, d;
                    d = new Date();
                    s = d.getUTCFullYear() + "-";
                    s += ("00" + (d.getUTCMonth() + 1)).slice(-2) + "-";
                    s += ("00" + d.getUTCDate()).slice(-2);
                    return s;
                },
                getDiffDays: function (days) {
                    var s, d, t, t2;
                    t = new Date().getTime();
                    t2 = days * 1000 * 3600 * 24;
                    t += t2;
                    d = new Date(t);
                    s = d.getUTCFullYear() + "-";
                    s += ("00" + (d.getUTCMonth() + 1)).slice(-2) + "-";
                    s += ("00" + d.getUTCDate()).slice(-2);
                    return s;
                }
            };
        });
});