/**
 * Created by linchunhui on 16/8/4.
 */
define(["angular", "ngResource"], function (angular) {
    return angular.module("module.authorization.organization.resource", ["ngResource"])
        .factory("OrganizationResource", ["$resource", "modulePath",
            function ($resource, modulePath) {
                return $resource(modulePath.authorization + "/organization/:orgId", {}, {
                    query: {
                        isArray: false
                    },
                    list: {
                        url: modulePath.authorization + "/organization",
                        isArray: true,
                        method: "GET"
                    }
                });
            }
        ]);
});