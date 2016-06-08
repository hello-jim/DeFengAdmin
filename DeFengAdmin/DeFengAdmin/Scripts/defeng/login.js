jQuery(document).ready(function ($) {


    // Reveal Login form
    setTimeout(function () { $(".fade-in-effect").addClass('in'); }, 1);


    // Validation and Ajax action
    $("form#login").validate({
        rules: {
            account: {
                required: true
            },

            password: {
                required: true
            }
        },

        messages: {
            account: {
                required: '账号不能为空.'
            },

            password: {
                required: '密码不能为空.'
            }
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
                url: "/Staff/UserLogin",
                method: 'POST',
                dataType: 'json',
                data: {
                    do_login: true,
                    account: $('#account').val(),
                    password: $('#password').val(),
                },
                success: function (data) {

                    // Redirect after successful login page (when progress bar reaches 100%)
                    if (data == 1) {
                        window.location.href = '/Home/Index';
                        return;
                    }
                    else if (data == -1) {
                        alert("账号不存在");
                        return;
                    }
                    else if (data == -2) {
                        alert("账号或密码错误");
                        return;
                    }
                }
            });

        }
    });

    // Set Form focus
    $("form#login .form-group:has(.form-control):first .form-control").focus();
});