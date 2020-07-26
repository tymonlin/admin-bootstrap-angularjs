/**
 * Created by linchunhui on 16/6/27.
 */
define(["angular", "dialog"], function(angular) {
    return angular.module("module.common.tip.growl-tip", [])
        .factory('GrowlTip', function(){
            var gs = {};
            /**
             * 弹出提示框
             * @param message 消息
             * @param type 消息的类型：success / danger
             * @param timer / function ok 消息显示时间
             */
            gs.dialog = function (message, type) {
                console.log(arguments);
                console.log(type);
                // console.log(typeof arguments[2]);
                var timer = 2500;
                var onClickOk_onClosed = function () {};
                var onClickCancel = function () {};
                if (arguments[2] != undefined) {
                    if (typeof arguments[2] != "function") {
                        timer = arguments[2];
                        if (typeof arguments[3] == 'function') {
                            onClickOk_onClosed = arguments[3];
                            if (typeof arguments[4] == 'function') {
                                onClickCancel = arguments[4];
                            }
                        }
                    } else {
                        onClickOk_onClosed = arguments[2];
                        if (typeof arguments[3] == 'function') {
                            onClickCancel = arguments[3];
                        }
                    }
                }

                if(type == "success"){
                    $.dialog({
                        type : 'info',
                        infoText : message,
                        infoIcon : 'components/dialog/img/success.png',
                        autoClose : timer,
                        onClosed: onClickOk_onClosed
                    });
                }else if(type == "danger"){
                    $.dialog({
                        showTitle : false,
                        contentHtml : '<p style="text-align: center;">' + message + '</p>',
                        autoClose :timer,
                        onClickOk: onClickOk_onClosed,
                        onClickCancel: onClickCancel
                    });
                }

            };
            gs.success = function (message, arg1, arg2, arg3) {
                gs.dialog(message, "success", arg1, arg2, arg3);
            };
            gs.error = function (message, arg1, arg2, arg3) {
                gs.dialog(message, "danger", arg1, arg2, arg3);
            };
            gs.errorResponseFunction = function (error) {
                gs.dialog(error.data.message, "danger");
            };
            // gs.tip = function(message, type) {
            //     $.growl({
            //         message: message
            //     },{
            //         type: type,
            //         allow_dismiss: false,
            //         label: 'Cancel',
            //         className: 'btn-xs btn-inverse',
            //         placement: {
            //             from: 'top',
            //             align: 'right'
            //         },
            //         delay: 2500,
            //         animate: {
            //             enter: 'animated bounceIn',
            //             exit: 'animated bounceOut'
            //         },
            //         offset: {
            //             x: 20,
            //             y: 65
            //         }
            //     });
            // };
            return gs;
        });
});