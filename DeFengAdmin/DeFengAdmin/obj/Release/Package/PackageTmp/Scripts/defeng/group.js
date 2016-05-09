$(document).ready(function () {
    InitGroup();

});

function InitGroup() {
    $.post("/Group/LoadGroup",
        function (data) {
            var groupList = $.parseJSON(data);

            for (var i = 0; i < groupList.length;) {
                var childrenHtml = "";
                if (GetChildrenObj(groupList[i].ID, groupList).length > 0) {
                    childrenHtml += "<li><span>" + groupList[i].GroupName + "</span><ul groupID='" + groupList[i].ID + "'><li></li></ul></li>";
                }
                else {
                    childrenHtml += "<li groupID='" + groupList[i].ID + "'><span>" + groupList[i].GroupName + "</span></li>";
                }
                $("[groupID=" + groupList[i].Parent + "]").append(childrenHtml);
                groupList.shift();
            }
            $("#gray").treeview({
                control: "#treecontrol",
                persist: "cookie",
                cookieId: "treeview-black"
            });
     

        });
}

//获取子Obj
function GetChildrenObj(ID, obj) {
    var childrenObj = obj.filter(function (item, index) {
        if (item.Parent == ID)
            return true;
    });
    return childrenObj;
}

function GetMaxLevel(obj) {
    var maxLevelObj = obj.sort(function (a, b) {
        return b.Level - a.Level;
    });
    return maxLevelObj[0].Level;
}