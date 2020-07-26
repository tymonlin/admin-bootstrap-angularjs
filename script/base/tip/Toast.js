/**
 * edit by linchunh at 2018-10-01
 */
define(["angular"], function (angular) {
    return angular.module("base.tip.toast", [])
        .factory("Toast", function () {
            var ret = {
                message : null,
                type : null,
                success: function(text, title, timer, beforeShowFun, afterShownFun, beforeHideFun, afterHiddenFun) {
                    $.toast({
                        text: text,
                        heading: title,
                        icon: 'success',
                        showHideTransition: 'fade',
                        allowToastClose: true,
                        hideAfter: timer == undefined ? 3000 : timer,
                        stack: 5,
                        position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                        textAlign: 'left',
                        loader: true,
                        loaderBg: '#3f8a24',
                        beforeShow: beforeShowFun == undefined ? function () {} : beforeShowFun,
                        afterShown: afterShownFun == undefined ? function () {} : afterShownFun,
                        beforeHide: beforeHideFun == undefined ? function () {} : beforeHideFun,
                        afterHidden: afterHiddenFun == undefined ? function () {} : afterHiddenFun
                    });
                },
                error: function(text, title, timer, beforeShowFun, afterShownFun, beforeHideFun, afterHiddenFun) {
                    $.toast({
                        text: text,
                        heading: title,
                        icon: 'error',
                        showHideTransition: 'fade',
                        allowToastClose: true,
                        hideAfter: timer == undefined ? 3000 : timer,
                        stack: 5,
                        position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                        textAlign: 'left',
                        loader: true,
                        loaderBg: '#f24900',
                        beforeShow: beforeShowFun == undefined ? function () {} : beforeShowFun,
                        afterShown: afterShownFun == undefined ? function () {} : afterShownFun,
                        beforeHide: beforeHideFun == undefined ? function () {} : beforeHideFun,
                        afterHidden: afterHiddenFun == undefined ? function () {} : afterHiddenFun
                    });

                },
                info: function(text, title, timer, beforeShowFun, afterShownFun, beforeHideFun, afterHiddenFun) {
                    $.toast({
                        text: text,
                        heading: title,
                        icon: 'info',
                        showHideTransition: 'fade',
                        allowToastClose: true,
                        hideAfter: timer == undefined ? 3000 : timer,
                        stack: 5,
                        position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                        textAlign: 'left',
                        loader: true,
                        loaderBg: '#325a8a',
                        beforeShow: beforeShowFun == undefined ? function () {} : beforeShowFun,
                        afterShown: afterShownFun == undefined ? function () {} : afterShownFun,
                        beforeHide: beforeHideFun == undefined ? function () {} : beforeHideFun,
                        afterHidden: afterHiddenFun == undefined ? function () {} : afterHiddenFun
                    });
                },
                errorResponseFunction: function (error) {
                    if (error.status != 401) {
                        ret.error(error.data);
                    }
                },
                clear : function(){
                    this.message = null;
                    this.type = null;
                }
            };
            return ret;
        })
});
