$(document).ready(function () {
    $.ajax({
        url: "/Home/LoadAnnouncement",
        async: true,
        success: function (data) {
            var json = $.parseJSON(data);
            CreateAnnouncementList(json);
        }
    });
});


function CreateAnnouncementList(json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<tr>";
        html += "<td>" + "N" + "</td>";
        html += "<td>[" + json[i].AnnouncementType.TypeName + "]</td>";
        html += "<td><a href='/Home/AnnouncementDetail?id=" + json[i].ID + "'>" + json[i].Title + "</a></td>";
        html += "<td>" + json[i].CreateStaff.StaffName + "</td>";
        html += "<td>" + DateTimeConvert_yyyyMMdd(json[i].CreateDate) + "</td>";
        html += "</tr>";
    }
    $(".announcement-list tbody").html(html);
}