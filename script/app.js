define(["angular", "router", "config", "angular-ui-router", "angular-route", "interceptor/header.interceptor", "main.controller"], function(angular){
    return angular.module('app', ["ui.router", "interceptor.header", "module.cpf.main.controller"]);
});