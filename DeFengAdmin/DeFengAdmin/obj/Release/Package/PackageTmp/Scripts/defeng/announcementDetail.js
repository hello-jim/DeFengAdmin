$(document).ready(function () {
    var announcementID = GetQueryString("id");
    $.ajax({
        url: "/Home/GetAnnouncementByID",
        data: { announcementID: announcementID },
        async: true,
        success: function (data) {
            var json = $.parseJSON(data);
            InitAnnouncementData(json);
        }
    });

    $.ajax({
        url: "/Home/LoadAttachment",
        data: {announcementID: announcementID},
        async: true,
        success: function (data) {

        }
    });

    CreateAccessList();


    $("#btnShow").on("click", function () {
        $(".conceal").toggle();
    })
});

/*
获取员工阅读列表
*/
function LoadStaffAccessList(announcementID) {
    $.ajax({
        url: "/Home/GetAnnouncementRead",
        data: { announcementID: announcementID },
        async: true,
        success: function (data) {
            var json = $.parseJSON(data);
            var readStaff = $.grep(json, function (value) {
                return value.IsRead == true;
            });
            var unreadStaff = $.grep(json, function (value) {
                return value.IsRead == false;
            });
            CreateList(".read-list", readStaff);
            CreateList(".unread-list", unreadStaff);
            $("#accessCount").text((readStaff.length + "/" + json.length))
        }
    });
}

/*
将员工添加进对应的列表
*/
function CreateList(element, json) {
    for (var i = 0; i < json.length; i++) {
        $(element + " tr[depID=" + json[i].Staff.Department.ID + "] ol").html("<li>" + json[i].Staff.StaffName + "</li>");
    }
    $(element + " tr ol:empty").parents("tr").remove();//清除不在范围内的部门
}

/*
创建公告阅读列表
*/
function CreateAccessList() {
    $.post("/Organization/LoadDepartment",
        function (data) {
            var json = $.parseJSON(data);
            var html = "";
            for (var i = 0; i < json.length; i++) {
                html += "<tr depID=" + json[i].ID + ">";
                html += "<td>" + json[i].DepartmentName + "</td>";
                html += "<td> <ol class='breadcrumb'></ol></td>";
                html += "</tr>";
            }
            $("table tbody").html(html);
            var announcementID = GetQueryString("id");
            LoadStaffAccessList(announcementID);
        });
}

function InitAnnouncementData(obj) {
    $("#title").text(obj.Title);
    $("#message").html($.parseHTML(obj.Message));
    $("#creataStaff").text(obj.CreateStaff.StaffName);
    $("#announcementType").text(obj.AnnouncementType.TypeName);
    $("#createDate").text(DateTimeConvert_yyyyMMddhhmm(obj.CreateDate));
}

function CreateAttachmentList(json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<a href='#' class='text-blue'>0527-0602期间主攻项目各分行送客情况.xlsx</a>";
    }
}

