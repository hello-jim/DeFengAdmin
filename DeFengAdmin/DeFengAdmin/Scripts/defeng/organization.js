$(document).ready(function () {
    InitDepartmentEvent();
    InitDepartment(".department-treeview");
    $('#add').click(function () {
        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(document).height());
        $('.department-addAndEdit-panel').slideDown(200);
    });
    $('.department-update-btn').click(function () {
        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(document).height());
        $('.department-addAndEdit-panel').slideDown(200);
        var objArr = $(".col-select.cbr-checked");
        if (objArr.length > 0) {
            var selectTr = $(objArr[0]).parents("tr");
            InitDepartmentData(selectTr);
        }
    });
    $('.theme-poptit .close').click(function () {
        $('.theme-popover-mask').hide();
        $('.theme-popover').slideUp(200);
    });
    //$("#content div").hide();
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tabs button:first").attr("id", "current");
    $("#content div:first").find("div").show();

    $('#tabs button').click(function (e) {
        var btnType = $(this).attr("btnType");
        switch (btnType) {
            case "department":
                InitDepartment(".department-treeview");
                $(".department-treeview").show();
                $(".post-department-treeview").hide();
                $("#tab1").show();
                $("#tab2").hide();
                $("#tab3").hide();
                break;
            case "jobs":
                InitDepartment(".post-department-treeview");
                InitPost();
                // GetPost();
                $(".post-department-treeview").show();
                $(".department-treeview").hide();
                $("#tab2").show();
                $("#tab1").hide();
                $("#tab3").hide();
                break;
            case "personnel":
                $("#tab3").show();
                $("#tab1").hide();
                $("#tab2").hide();
                break;
        }
    });
});

function InitDepartment(element) {
    $("" + element + " ul *").remove();
    $.post("/Organization/LoadDepartment",
        function (data) {
            var departmentList = $.parseJSON(data);
            for (var i = 0; i < departmentList.length;) {
                var childrenHtml = "";
                if (GetChildrenObj(departmentList[i].ID, departmentList).length > 0) {
                    childrenHtml += "<li><span><a href='javascript:void(0);' level='" + departmentList[i].Level + "'  isEnable='" + (departmentList[i].IsEnable == true ? "是" : "否") + "' describe='" + departmentList[i].Describe + "' departmentName='" + departmentList[i].DepartmentName + "' departmentID2='" + departmentList[i].ID + "' parentID='" + departmentList[i].Parent + "'>" + departmentList[i].DepartmentName + "</a></span><ul departmentID='" + departmentList[i].ID + "'><li></li></ul></li>";
                }
                else {
                    childrenHtml += "<li departmentID='" + departmentList[i].ID + "'><span><a href='javascript:void(0);' level='" + departmentList[i].Level + "' isEnable='" + (departmentList[i].IsEnable == true ? "是" : "否") + "' describe='" + departmentList[i].Describe + "' departmentName='" + departmentList[i].DepartmentName + "' departmentID2='" + departmentList[i].ID + "' parentID='" + departmentList[i].Parent + "'>" + departmentList[i].DepartmentName + "</a></span></li>";
                }
                $("[departmentID=" + departmentList[i].Parent + "]").append(childrenHtml);
                departmentList.shift();
            }
            $(element).treeview({
                control: "#treecontrol",
                persist: "cookie",
                cookieId: "treeview-black"
            });
            $("" + element + " ul a").unbind("click").on("click", function () {
                var thisObj = $(this);
                var departmentID = $(thisObj).attr("departmentID2");
                var level = parseInt($(thisObj).attr("level")) + 1;
                $("#parentID").val(departmentID);
                $("#level").val(level);
                var childrenDepartmentArr = $("" + element + " ul [parentID=" + departmentID + "]");
                CreateDepartmentTable(childrenDepartmentArr);
            });
        });
}

function InitPost() {
    $.post("/Organization/GetPost",
       function (data) {
           var json = $.parseJSON(data);
           $("#postJsonHidden").val(data);
           CreatePostTabel(json);
       });
    $(".post-add-btn").unbind("click").on("click", function () {
        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(document).height());
        $('.post-addAndEdit-panel').slideDown(200);
    });

    $(".post-add").unbind("click").on("click", function () {
        var post = GetPostObj();
        var postJson = JSON.stringify(post);
        $.post("/Organization/AddPost",
          {
              post: postJson
          },
          function (data) {
              if (data == "1") {

              }
          });
    });

    $(".post-update").unbind("click").on("click", function () {
        var post = GetPostObj();
        var postJson = JSON.stringify(post);
        $.post("/Organization/UpdatePost",
          {
              post: postJson
          },
          function (data) {

          });
    });

    $(".post-delete").unbind("click").on("click", function () {
        $.post("/Organization/DeletePost",
                 {
                     postID: postID
                 },
                function (data) {

                });
    });
}

function CreatePostTabel(json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<tr postID='" + json[i].ID + "' postName='" + json[i].PostName + "'  describe='" + json[i].Describe + "' isEnable='" + json[i].IsEnable + "'  postGrade='" + json[i].PostGrade + "' >";
        html += "<td>" + "<div  class='cbr-replaced col-select'><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div>" + "</td>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + json[i].PostName + "</td>";
        html += "<td>" + json[i].PostGrade + "</td>";
        html += "<td>" + (json[i].IsEnable == true ? "是" : "否") + "</td>";
        html += "</tr>";
    }
    $(".post-table tbody").html(html);
    InitCheckBox();
}

function CreateDepartmentTable(childrenDepartmentArr) {
    var html = "";
    for (var i = 0; i < childrenDepartmentArr.length; i++) {
        html += "<tr depID='" + $(childrenDepartmentArr[i]).attr("departmentID2") + "' departmentName='" + $(childrenDepartmentArr[i]).attr("departmentName") + "'  describe='" + $(childrenDepartmentArr[i]).attr("describe") + "' isEnable='" + $(childrenDepartmentArr[i]).attr("isEnable") + "' parentID='" + $(childrenDepartmentArr[i]).attr("parentID") + "' level='" + $(childrenDepartmentArr[i]).attr("level") + "' >";
        html += "<td>" + "<div  class='cbr-replaced col-select'><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div>" + "</td>";
        html += "<td>" + i + 1 + "</td>";
        html += "<td>" + $(childrenDepartmentArr[i]).attr("departmentName") + "</td>";
        html += "<td>" + $(childrenDepartmentArr[i]).attr("describe") + "</td>";
        html += "<td>" + $(childrenDepartmentArr[i]).attr("departmentID2") + "</td>";
        html += "<td>" + $(childrenDepartmentArr[i]).attr("isEnable") + "</td>";
        html += "</tr>";
    }
    $("#departmentTabel tbody").html(html);
    InitCheckBox();
}

//获取子Obj
function GetChildrenObj(ID, obj) {
    var childrenObj = obj.filter(function (item, index) {
        if (item.Parent == ID)
            return true;
    });
    return childrenObj;
}

function InitDepartmentData(obj) {
    $("#depID").val($(obj).attr("depID"));
    $("#departmentNameTxt").val($(obj).attr("departmentName"));
    $("#parentID").val($(obj).attr("parentID"));//上级
    $("#level").val($(obj).attr("level"));
    $("isEnableSelect").val($(obj).attr(""));
}



function InitDepartmentEvent() {
    $(".department-add").unbind("click").on("click", function () {
        var department = GetDepartmentObj();
        var departmentJson = JSON.stringify(department);
        $.post("/Organization/AddDepartment",
          {
              department: departmentJson
          },
          function (data) {
              if (data) {
                  alert("success");
              } else {
                  alert("fail");
              }
          });
    });

    $(".department-update").unbind("click").on("click", function () {
        var department = GetDepartmentObj();
        var departmentJson = JSON.stringify(department);
        $.post("/Organization/UpdateDepartment",
          {
              department: departmentJson
          },
          function (data) {
              if (data) {
                  alert("success");
              } else {
                  alert("fail");
              }
          });
    });

    $(".department-delete").unbind("click").on("click", function () {
        var objArr = $(".col-select.cbr-checked");
        if (objArr.length > 0) {
            var isDelete = confirm("确定要删除吗？");
            if (isDelete) {
                var idArr = new Array();
                for (var i = 0; i < objArr.length; i++) {
                    idArr.push($(objArr[i]).parents("tr").attr("depID"));
                }
                $.post("/Organization/DeleteDepartment",
                    {
                        idArr: idArr
                    },
                    function (data) {
                        if (data) {
                            $(".col-select.cbr-checked").parents("tr").remove();
                        }
                    });
            }
            else {
                return;
            } 0
        } else {
        }
        $.post("/Organization/DeleteDepartment",
          {
              departmentID: departmentID
          },
          function (data) {

          });
    });
}

function GetDepartmentObj() {
    var department = new Object();
    department.ID = $("#depID").val() != "" ? $("#depID").val() : 0;
    department.DepartmentName = $("#departmentNameTxt").val();
    department.Parent = $("#parentID").val();//上级
    department.Level = $("#level").val();
    department.IsEnable = $("#isEnableSelect").val() == "1";
    return department;
}

function GetPostObj() {
    var post = new Object();
    post.ID = $("#postID").val();
    post.PostName = $("#postNameTxt").val();
    post.PostName = $("#postNameTxt").val();
    var department = new Object();
    department.ID = $("#postDepID").val();
    post.Department = department;
    post.IsEnable = $("#postIsEnableSelect").val() == "1";
    return post;
}

function GetStaffByDepartment(departmentID) {
    $.post("/Organization/GetStaffByDepartment",
        {
            departmentID: departmentID
        },
        function (data) {

        });
}



function CreatePostTable(json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "";
    }
}



