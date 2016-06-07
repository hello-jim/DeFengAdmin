$(document).ready(function () {
    $(".announcement-save").unbind("click").on("click", function () {
        var announcement = GetAnnouncement();
        var announcementJson = JSON.stringify(announcement);
        announcementJson = encodeURIComponent(announcementJson);
        $.post("/Home/CreateAnnouncement",
            {
                announcement: announcementJson
            },
            function (data) {

            });
    });
    InitAnnouncementType("#announcementTypeSelect", "", true);
    $("#lastReadDateTxt").val(DateTimeConvert_yyyyMMdd(new Date()));
    $('#pushRangeTxt').click(function () {
        $('.office-theme-popover-mask').show();
        $('.theme-popover-mask').height($(document).height());
        $('.department-addAndEdit-panel').slideDown(200);
        InitPushRange();
    });
    $('.department-update-btn').click(function () {
        $('.office-theme-popover-mask').show();
        $('.department-addAndEdit-panel').slideDown(200);

    });
    $('.theme-poptit .close').click(function () {
        $('.theme-popover-mask').hide();
        $('.office-theme-popover').slideUp(200);
    });

    $(".push-range-save").on("click", function () {
        $("#pushRangeTxt").val(ConvertArr($("#selected-range option"), "text"));
    });

});


function InitStaffDepIfames() {
    var ifames = window.frames["staff-dep-treeview"]
    ifames.src = "/Organization/DepTreeview";
    if (ifames.attachEvent) {
        $($(ifames).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
            var staffJsonStr = $("#staffJson").val();
            var staffJson = staffJsonStr != "" ? $.parseJSON(staffJsonStr) : "";
            if (staffJson != "") {
                var depID = $(this).attr("departmentID2");
                //筛选出属于该部门的员工
                var filterarray = $.grep(staffJson, function (value) {
                    return value.Department.ID == depID;
                });
                //如果选择范围里面已经包含了该项则不再显示
                var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
                var resultArr = $.grep(filterarray, function (obj) {
                    return $.inArray(("S_" + obj.ID), selectRangeArr) == -1;
                });
                CreateStaff("#staffSelect", resultArr);
                $("#staffSelect option").unbind("dblclick").on("dblclick", function () {
                    $("#selected-range").append($(this));
                });
            }
        });
    } else {
        ifames.onload = function () {
            $($(ifames).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
                var staffJsonStr = $("#staffJson").val();
                var staffJson = staffJsonStr != "" ? $.parseJSON(staffJsonStr) : "";
                if (staffJson != "") {
                    var depID = $(this).attr("departmentID2");
                    //筛选出属于该部门的员工
                    var filterarray = $.grep(staffJson, function (value) {
                        return value.Department.ID == depID;
                    });
                    //如果选择范围里面已经包含了该项则不再显示
                    var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
                    var resultArr = $.grep(filterarray, function (obj) {
                        return $.inArray(("S_" + obj.ID), selectRangeArr) == -1;
                    });
                    CreateStaff("#staffSelect", resultArr);
                    $("#staffSelect option").unbind("dblclick").on("dblclick", function () {
                        $("#selected-range").append($(this));
                    });
                }
            });
        };
    }
}

function InitPostDepIfames() {
    var ifames = window.frames["post-dep-treeview"]
    ifames.src = "/Organization/DepTreeview";
    //岗位范围
    if (ifames.attachEvent) {
        $($(ifames).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
            var postJsonStr = $("#postJson").val();
            var postJson = postJsonStr != "" ? $.parseJSON(postJsonStr) : "";
            if (postJson != "") {
                var depID = $(this).attr("departmentID2");
                //筛选出属于该岗位的员工
                var filterarray = $.grep(postJson, function (value) {
                    return value.Department.ID == depID;
                });
                //如果选择范围里面已经包含了该项则不再显示
                var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
                var resultArr = $.grep(filterarray, function (obj) {
                    return $.inArray(("P_" + obj.ID), selectRangeArr) == -1;
                });
                CreatePost("#postSelect", resultArr);
                $("#postSelect option").unbind("dblclick").on("dblclick", function () {
                    $("#selected-range").append($(this));
                });
            }
        });
    } else {
        ifames.onload = function () {
            $($(ifames).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
                var postJsonStr = $("#postJson").val();
                var postJson = postJsonStr != "" ? $.parseJSON(postJsonStr) : "";
                if (postJson != "") {
                    var depID = $(this).attr("departmentID2");
                    //筛选出属于该岗位的员工
                    var filterarray = $.grep(postJson, function (value) {
                        return value.Department.ID == depID;
                    });
                    //如果选择范围里面已经包含了该项则不再显示
                    var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
                    var resultArr = $.grep(filterarray, function (obj) {
                        return $.inArray(("P_" + obj.ID), selectRangeArr) == -1;
                    });
                    CreatePost("#postSelect", resultArr);
                    $("#postSelect option").unbind("dblclick").on("dblclick", function () {
                        $("#selected-range").append($(this));
                    });
                }
            });
        };
    }
}

function InitDepIfames() {
    ////部门范围
    var ifames = window.frames["dep-treeview"]
    ifames.src = "/Organization/DepTreeview";
    $("#dep-treeview").attr("src", "/Organization/DepTreeview")
    if (ifames.attachEvent) {
        $($(ifames).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
            var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
            if ($.inArray(("S_" + $(this).attr("departmentID2")), selectRangeArr) == -1) {
                $("#selected-range").append("<option value='D_" + $(this).attr("departmentID2") + "'></option>");
            }
        });
    } else {
        ifames.onload = function () {
            $($(ifames).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
                var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
                if ($.inArray(("D_" + $(this).attr("departmentID2")), selectRangeArr) == -1) {
                    $("#selected-range").append("<option value='D_" + $(this).attr("departmentID2") + "'>" + $(this).attr("departmentname") + "</option>");
                }
            });
        };
    }
}

function GetAnnouncement() {
    var announcement = new Object();
    announcement.Message = $(".cke_wysiwyg_frame").contents().find("body").html();
    var announcementType = new Object();
    announcementType.ID = $("#announcementTypeSelect").val();
    announcement.AnnouncementType = announcementType;
    announcement.LastReadDate = $("#lastReadDateTxt").val();
    announcement.attachmentName = $("#attachmentNameTxt").val();
    announcement.PushRange = ConvertArr($("#selected-range option"), "value");
    return announcement;
}

function InitPushRange() {
    $("#staffJson").val(GetStaff(false));
    $("#postJson").val(GetPost(false));
    $(".fa-arrow-right").on("click", function (data) {
        $("#selected-range").append($(".range :selected"));
    });
    $(".fa-arrow-left").on("click", function () {
        $("#selected-range :selected").remove();
    });
    InitStaffDepIfames();
    InitPostDepIfames();
    InitDepIfames();
    ////部门范围
    //$($(window.frames["staff-dep-treeview"]).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
    //    var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
    //    if ($.inArray(("S_" + $(this).attr("departmentID2")), selectRangeArr) == -1) {
    //        $("#selected-range").append("<option value='D_" + $(this).attr("departmentID2") + "'></option>");
    //    }   
    //});
    //员工范围


    //岗位范围
    //$($(window.frames["post-dep-treeview"]).context.contentDocument.body).find(".department-treeview ul a").on("click", function () {
    //    var postJsonStr = $("#postJson").val();
    //    var postJson = postJsonStr != "" ? $.parseJSON(postJsonStr) : "";
    //    if (postJson != "") {
    //        //筛选出属于该部门的员工
    //        var filterarray = $.grep(postJson, function (value) {
    //            return value.Department.ID == $(this).attr("departmentID2");
    //        });
    //        //如果选择范围里面已经包含了该项则不再显示
    //        var selectRangeArr = ConvertArr(($("#selected-range option")), "value");
    //        var resultArr = $.grep(filterarray, function (obj) {
    //            return $.inArray(("P_" + obj.ID), selectRangeArr) == -1;
    //        });
    //        CreateStaffOption("#postSelect", resultArr);
    //        $("#postSelect option").unbind("dblclick").on("dblclick", function () {
    //            $("#selected-range").append($(this));
    //        });
    //    }
    //});
    //$(".post-department-treeview ul a").unbind("click").on("click", function () {
    //    var thisObj = $(this);
    //    var depID = $(this).attr("departmentID2");
    //    var postJsonStr = $("#postJson").val();
    //    var postJson = postJsonStr != "" ? $.parseJSON(postJsonStr) : "";
    //    if (postJson != "") {
    //        CreatePostOption("", postJson);
    //    }
    //});
}

function CreateStaff(element, json) {

    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<option value='S_" + json[i].ID + "'>" + json[i].StaffName + "</option>";
    }
    $(element).html(html);
}

function CreatePost(element, json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<option value='P_" + json[i].ID + "'>" + json[i].PostName + "</option>";
    }
    $(element).html(html);
}




