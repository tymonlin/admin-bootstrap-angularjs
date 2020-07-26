define(["angular",
        "module/authorization/auth.service",
        "module/authorization/auth.resource",
        "module/authorization/login.controller",
        "module/authorization/auth.router",
        "module/authorization/user/user",
        "module/authorization/role/role",
        "module/authorization/menu/menu",
        "module/authorization/organization/organization",
        "ngCookies"
    ],
    function(angular){
        var module = angular.module("module.authorization", [
            "ngCookies",
            "module.authorization.login",
            "module.authorization.service",
            "module.authorization.resource",
            "module.authorization.user",
            "module.authorization.role",
            "module.authorization.menu",
            "module.authorization.organization"
        ]);
        return module;
    }
);