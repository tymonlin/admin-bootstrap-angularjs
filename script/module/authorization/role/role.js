define(["angular",
        "module/authorization/role/role.controller",
        "module/authorization/role/role.resource",
        "module/authorization/role/role.service",
        "module/authorization/role/role.router",
    ],
    function(angular){
        var module = angular.module("module.authorization.role", [
            "module.authorization.role.controller",
            "module.authorization.role.service",
            "module.authorization.role.resource"
        ]);
        return module;
    }
);