define(["angular",
        "module/authorization/organization/organization.controller",
        "module/authorization/organization/organization.resource",
        "module/authorization/organization/organization.router"
    ],
    function(angular){
        var module = angular.module("module.authorization.organization", [
            "module.authorization.organization.controller",
            "module.authorization.organization.resource"
        ]);
        return module;
    }
);