/**
 * Created by linchunhui on 15/12/30.
 */
"use strict";
var developMode = true;
require.config({
    paths:{
        //一些库文件
        "jquery": "../components/jquery/dist/jquery.min",
        "angular": "../components/angular/angular.min",
        "angular-translate":"../components/angular-translate/angular-translate.min",
        "angular-translate-loader-static-files":"../components/angular-translate-loader-static-files/angular-translate-loader-static-files.min",
        "angular-route": "../components/angular-route/angular-route",
        "angular-ui-router": "../components/angular-ui-router/release/angular-ui-router.min",
        "angular-file-upload":"../components/angular-file-upload-master/dist/angular-file-upload.min",
        "domReady": "../components/domReady/domReady",
        "dialog":"../components/dialog/js/dialog",
        "loading-bar": "../components/angular-loading-bar/src/loading-bar",
        "bootstrap": "bootstrap",
        "nl-tables": "../components/nl-tables3/nl-tables3.min",
        "nl-utils": "../components/nl-utils/src/nl-utils",
        "nl-tree": "../components/nl-tree/nl-tree",
        "nl-folder": "../components/nl-folder/nl-folder",
        "cpf-menu": "../components/cpf-menu/cpf-menu",
        "cpf-upload": "../components/cpf-upload/cpf-upload",
        "ngResource": "../components/angular-resource/angular-resource",
        "ngCookies": "../components/angular-cookies/angular-cookies.min",
        "bootstrap-core": "../components/bootstrap/dist/js/bootstrap.min",
        "panel-tools.directive": "lib/panel-tools.directive"
    },
    shim:{
        "angular":{
            exports:"angular"
        },
        "angular-translate":{
            deps:["angular"],
            exports:"angular-translate"
        },
        "angular-translate-loader-static-files":{
            deps:["angular-translate"],
            exports:"angular-translate-loader-static-files"
        },
        "angular-route":{
            deps: ["angular"],
            exports: "angular-route"
        },
        "ngResource": {
            deps: ["angular"],
            exports: "ngResource"
        },
        "angular-ui-router": {
            deps: ["angular"],
            exports: "angular-ui-router"
        },
        "nl-tables": {
            deps: ["angular"],
            exports: "nl-tables"
        },
        "nl-tree": {
            deps: ["angular"],
            exports: "nl-tree"
        },
        "nl-folder": {
            deps: ["angular"],
            exports: "nl-folder"
        },
        "cpf-menu": {
            deps: ["angular"],
            exports: "cpf-menu"
        },
        "cpf-upload": {
            deps: ["angular"],
            exports: "cpf-upload"
        },
        "ngCookies": {
            deps: ["angular"],
            exports: "ngCookies"
        },
        "bootstrap-core": {
            exports: "bootstrap-core"
        },
        "loading-bar": {
            deps: ["angular"]
        },
        "bootstrap-datetimepicker":{
            exports: "bootstrap-datetimepicker"
        },
        "angular-file-upload":{
            deps: ["angular"],
            exports: "angular-file-upload"
        },
        "dialog":{
            exports: "dialog"
        },
    },
    deps:["bootstrap"],
    urlArgs: (developMode ? "bust=" + (new Date()).getTime() : "")
});
