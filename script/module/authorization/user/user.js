define(["angular",
        "module/authorization/user/user.controller",
        "module/authorization/user/user.edit.controller",
        "module/authorization/user/user.resource",
        "module/authorization/user/user.router"
    ],
    function(angular){
        var module = angular.module("module.authorization.user", [
            "module.authorization.user.controller",
            "module.authorization.user.edit.controller",
            "module.authorization.user.resource"
        ]);
        return module;
    }
);