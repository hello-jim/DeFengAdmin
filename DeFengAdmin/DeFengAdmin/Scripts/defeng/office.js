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
    InitDepartmentTreeView(".post-department-treeview", false);
    $(".").on("click", function (data) {
       
       $()
    });
    $(".department-treeview ul a").unbind("dblclick").on("dblclick", function () {
        var thisObj = $(this);
        var depID = $(this).attr("departmentID2");
        $(".").append("D_" + depID);//添加到选中框 
    });

    $(".staff-department-treeview ul a").unbind("click").on("click", function () {
        var thisObj = $(this);
        var depID = $(this).attr("departmentID2");
        var staffJsonStr = $("#staffJson").val();
        var staffJson = staffJsonStr != "" ? $.parseJSON(staffJsonStr) : "";
        if (staffJson != "") {
            CreateStaffOption("", staffJson);
            $(".  option").unbind("dblclick").on("dblclick", function () {
                $(".").append($(this).attr("value"));
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
        html += "<option value='S_" + json[i].ID + ">" + json[i].StaffName + "'</option>";
    }
    $(element).append(html);
}

function CreatePostOption(element, json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<option value='P_" + json[i].ID + ">" + json[i].PostName + "</option>";
    }
    $(element).append(html);
}

