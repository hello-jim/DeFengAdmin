$(document).ready(function ($) {
    // Reveal Login form
    setTimeout(function () { $(".fade-in-effect").addClass('in'); }, 1);


    // Validation and Ajax action

    $("form#Information").validate({
        rules: {
            staffNumber: {
                required: true
            },

            staffName: {
                required: true,
            },
            birthdayType: {
                required: true,
            },
            idCard: {
                required: true,
                IdCardNo: true
            },
            submitHouseDate: {
                required: true,
            },
            age: {
                required: true,
            },
            age: {
                required: true,
            },

        },

        messages: {
            staffNumber: {
                required: '*编号不能为空.'
            },
            staffName: {
                required: '*员工名不能为空.',
            },
            birthdayType: {
                required: '*生日类别不能为空.',
            },
            idCard: {
                required: '*身份证不能为空.',
                IdCardNo: "*请输入正确的身份证号"
            },
            submitHouseDate: {
                required: '*出生年月不能为空.',
            },
            age: {
                required: '*年龄不能为空.',
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
                url: "/Home/StaffInformation",
                method: 'POST',
                dataType: 'json',
                data: {
                    do_login: true,
                    staffNumber: $(form).find('#staffNumber').val(),
                    staffName: $("#staffName").val(),
                    birthdayType: $('#birthdayType').val(),
                    idCard: $('#idCard').val(),
                    submitHouseDate: $('#submitHouseDate').val(),
                    sex: $("input[name='sex']:checked").val(),
                    age: $('#age').val(),
                    birthday: $(form).find('#birthday').val(),
                    marital: $(form).find('#marital').val(),
                    education: $("#education").val(),
                    major: $(form).find('#major').val(),
                    bloodType: $(form).find('#bloodType').val(),
                    entry_time: $(form).find('#entry_time').val(),
                    entry_status: $(form).find('#entry_status').val(),
                    probation: $(form).find('#probation').val(),
                    height: $(form).find('#height').val(),
                    probation_salary: $(form).find('#probation_salary').val(),
                    salary: $(form).find('#salary').val(),
                    politics: $(form).find('#politics').val(),
                    title: $(form).find('#title').val(),
                    nation: $(form).find('#nation').val(),
                    email: $(form).find('#email').val(),
                    tel: $(form).find('#tel').val(),
                    officTel: $(form).find('#officTel').val(),
                    accountType: $(form).find('#accountType').val(),
                    accountAddress: $(form).find('#accountAddress').val(),
                    place_origin: $(form).find('#place_origin').val(),
                    address: $(form).find('#address').val(),
                    application_method: $(form).find('#application_method').val(),
                    family_members: $(form).find('#family_members').val(),
                    family_relationship: $(form).find('#family_relationship').val(),
                    family_occupation: $(form).find('#family_occupation').val(),
                    landscape: $(form).find('#landscape').val(),
                    family_company: $(form).find('#family_company').val(),
                    family_contact: $(form).find('#family_contact').val(),
                    entry_unit: $(form).find('#entry_unit').val(),
                    entry_department: $(form).find('#entry_department').val(),
                    entry_position: $(form).find('#entry_position').val(),
                    leader: $(form).find('#leader').val(),
                    part_time_job: $(form).find('#part_time_job').val(),
                    part_time_position: $(form).find('#part_time_position').val(),
                    branch_manager: $(form).find('#branch_manager').val(),
                    site_manager: $(form).find('#site_manager').val(),
                    hr_clerk: $(form).find('#hr_clerk').val(),
                    hr_manager: $(form).find('#hr_manager').val(),
                    general_manager: $(form).find('#general_manager').val(),
                    login_name: $(form).find('#login_name').val(),
                    access_authority: $(form).find('#access_authority').val(),
                },
                success: function (data) {   
                    if (data==1)
                    {
                        alert("添加成功")
                                
                    }
                    else {
                        alert("添加失败")
            }
            }
    });

}
});

    // Set Form focus
    $("form#Information .form-group:has(.form-control):first .form-control").focus();
});