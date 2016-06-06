$(document).ready(function () {
    var aID = GetQueryString("aID");
    $.ajax({
        url: "/Home/GetAnnouncementByID",
        async: true,
        success: function (data) {

        }
    });

    $.ajax({
        url: "/Organization/LoadDepartment",
        async: true,
        success: function (data) {
            LoadList();
        }
    });

   
    
   
    $("#btnShow").on("click", function () {
        $(".conceal").toggle();
    })
});

/*
创建名单
*/
function LoadList() {
    $.ajax({
        url: "/Organization/LoadDepartment",
        async: true,
        success: function (data) {
            var json = $.parseJSON();
            var readStaff = $.grep(json, function (value) {
                return value.IsRead == true;
            });
            var unreadStaff = $.grep(json, function (value) {
                return value.IsRead == false;
            });
            CreateList("", readStaff);
            CreateList("", unreadStaff);
        }
    });
  
}


function CreateList(element, json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "";
    }
    $(element).html();
}

