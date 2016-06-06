$(document).ready(function () {
    $(".announcement-save").unbind("click").on("click", function () {
        var announcement = GetAnnouncement();
        var announcementJson = $.JSON.stringify(announcement);
        $.post("/Home/CreateAnnouncement",
            {
                announcement: announcementJson
            },
            function (data) {

            });
    });

    $('#scope').click(function () {
        $('.office-theme-popover-mask').show();
        $('.theme-popover-mask').height($(document).height());
        $('.department-addAndEdit-panel').slideDown(200);
    });
    $('.department-update-btn').click(function () {
        $('.office-theme-popover-mask').show();
        $('.department-addAndEdit-panel').slideDown(200);
        var objArr = $(".col-select.cbr-checked");
        if (objArr.length > 0) {
            var selectTr = $(objArr[0]).parents("tr");
            InitDepartmentData(selectTr);
        }
    });
    $('.theme-poptit .close').click(function () {
        $('.theme-popover-mask').hide();
        $('.office-theme-popover').slideUp(200);
    });
    InitPushRange();;
});


function GetAnnouncement() {
    var announcement = new Object();
    announcement.Message = $("#message").text();
    var announcementType = new Object();
    announcementType.ID = $("#announcementTypeSelect").val();
    announcement.AnnouncementType = announcementType;
    announcement.attachmentName = $("#attachmentName").val();
    return announcement;
}

function InitPushRange() {
    
    $("#staffJson").val(GetStaff(false));
    $(".fa-arrow-right").on("click", function (data) {
        $("#selected-range").append($(".range :selected"));
    });
    $(".fa-arrow-left").on("click", function () {
        $("#selected-range :selected").remove();
    });
    //$($(window.frames["staff-dep-treeview"]).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {

    //});
    //员工范围
    $($(window.frames["staff-dep-treeview"]).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
        var thisObj = $(this);
        var depID = $(this).attr("departmentID2");
        var staffJsonStr = $("#staffJson").val();
        var staffJson = staffJsonStr != "" ? $.parseJSON(staffJsonStr) : "";

        if (staffJson != "") {
            //筛选出属于该部门的员工
            var filterarray = $.grep(staffJson, function (value) {
                return value.Department.ID == depID;
            });
            //如果选择范围里面已经包含了该项则不再显示
            var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
            var resultArr = $.grep(filterarray, function (obj) {
                return $.inArray(("S_" + obj.ID), selectRangeArr) ==-1;
            });
            CreateStaffOption("#staffSelect", resultArr);
            $("#staffSelect option").unbind("dblclick").on("dblclick", function () {
                $("#selected-range").append($(this));
            });
        }
    });

    $(".post-department-treeview ul a").unbind("click").on("click", function () {
        var thisObj = $(this);
        var depID = $(this).attr("departmentID2");
        var postJsonStr = $("#postJson").val();
        var postJson = postJsonStr != "" ? $.parseJSON(postJsonStr) : "";
        if (postJson != "") {
            CreatePostOption("", postJson);
        }
    });
}

function CreateStaffOption(element, json) {

    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<option value='S_" + json[i].ID + "'>" + json[i].StaffName + "</option>";
    }
    $(element).html(html);
}

function CreatePostOption(element, json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<option value='P_" + json[i].ID + "'>" + json[i].PostName + "</option>";
    }
    $(element).html(html);
}




