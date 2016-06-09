﻿jQuery(document).ready(function ($) {
    $("#account").on("blur", function () {
        var checkUserName = $("#account").val();
        var re = /^[0-9a-zA-Z]*$/g;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
        if (!re.test(checkUserName)) {
            $("#gradeInfo").html("<font color=\"red\">输入的账号不能含有标点符号！</font>");
        } else {
            if (checkUserName == "") {
                $("#gradeInfo").html("<font color=\"red\">账号不能为空！</font>");
            } else {
                $.post("/Home/CheckUserName",
                {
                    account: checkUserName
                },
                function (data) {
                    if (data == 1) {
                        $("#gradeInfo").html("<font color=\"red\">您输入的用户名存在！请重新输入！</font>");
                    }
                    else {
                        $("#gradeInfo").html('<img src="/Content/images/symbol-check.png" style="width:30px;height:30px"/>');
                    }
                })
            }
        }
    }),   
        // Reveal Login form
       setTimeout(function () { $(".fade-in-effect").addClass('in'); }, 1);
        // Validation and Ajax action
        $("form#register").validate({
            rules: {
                account: {
                    required: true,
                },

                password: {
                    required: true,
                    minlength: 6,
                },
                passwd1: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                },
                //idCard: {
                //    required: true,
                //    IdCardNo: "*请输入正确的身份证号"
                //},
                phone: {
                    required: true,
                    isMobile: true
                }
            },     
            messages: {
                account: {
                    required: '*账号不能为空.',
                },
                password: {
                    required: '*密码不能为空.',
                    minlength: "*密码不能小于6个字符"
                },
                passwd1: {
                    required: '*确认密码不能为空.',
                    minlength: "*密码不能小于6个字符",
                    equalTo: "*密码不一致"
                },
                //idCard: {
                //    required: '*身份证不能为空.',
                //    IdCardNo: "*请输入正确的身份证号"
                //},
                phone: {
                    required: '*电话号码不能为空.',
                    isPhone: "*请输入一个有效的联系电话"
                },
                                   
                //'etp.name':{  
                //    remote: "用户名已被占用"  
                //},
            },

            // Form Processing via AJAX
            submitHandler: function (form) {
                show_loading_bar(70); // Fill progress bar to 70% (just a given value)

                var opts = {
                    "closeButton": true,
                    "debug": false,
                    "positionClass": "toast-top-full-width",
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };


                $.ajax({
                    url: "/Home/StaffRegister",
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        do_login: true,
                        account: $(form).find('#account').val(),
                        staffName:$(form).find('#staffName').va(),
                        password: $(form).find('#password').val(),
                        idCard: $(form).find('#idCard').val(),
                        phone: $(form).find('#phone').val(),
                    },
                    success: function (data) {
                        // Redirect after successful login page (when progress bar reaches 100%)
                        if (data == 1) {
                            window.location.href = '/Home/Login';
                        }
                        else {
                            if (data == 0) {
                                alert("身份证已存在");
                            }
                            else{
                                alert("用户名已存在"); 
                            }
                        }
                    }
        
                });

            }
        });

        // Set Form focus
        $("form#register .form-group:has(.form-control):first .form-control").focus();
    });



