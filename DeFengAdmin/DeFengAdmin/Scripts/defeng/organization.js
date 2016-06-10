var allDepName = "";

$(document).ready(function () {
    InitDepartmentEvent();
    InitDepartment();
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
        $('.theme-popover').hide();
        $('.theme-popover').slideUp(200);
    });

    $('#personnel-update').click(function () {
        $('#staffUpdate').show();
        $('#staffUpdate').slideDown(200);
    });
    $('#personnel-update').click(function () {
        $('#staffUpdate').show();
        $('.staff-updateAndEdit-panel').slideDown(200);
        var objArr = $(".col-select.cbr-checked");
        if (objArr.length > 0) {
            var selectTr = $(objArr[0]).parents("tr");
            InitDepartmentData(selectTr);
        }
    });
    $('#closeUpdate').click(function () {
        $('#staffUpdate').hide();
        $('#staffUpdate').slideUp(200);
    });


   
    //人员权限
    //$('#personnel-permissions').click(function () {
    //    $('#stafPermissions').show();
    //    $('#stafPermissions').slideDown(200);
    //});
    //$('#personnel-permissions').click(function () {
    //    $('#stafPermissions').show();
    //    $('#stafPermissions').slideDown(200);
    //    var objArr = $(".col-select.cbr-checked");
    //    if (objArr.length > 0) {
    //        var selectTr = $(objArr[0]).parents("tr");
    //        InitDepartmentData(selectTr);
    //    }
    //});
    //$('.theme-poptit #closePermissions').click(function () {
    //    $('#stafPermissions').hide();
    //    $('#stafPermissions').slideUp(200);
    //});
    //$('#personnel-permissions').click(function () {
    //    $('.access').toggle();
    //});
    //$('#shrinkage').click(function () {
    //    $('.collaborative').toggle();
    //    $('#arrowOn').toggle();
    //    $('#arrowUp').toggle();
    //});
    //$('#Shrinkage1').click(function () {
    //    $('.collaborativeShrinkage').toggle();
    //    $('#collaborativeArrowOn').toggle();
    //    $('#collaborativeArrowUp').toggle();
    //});
    //$("#content div").hide();
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tabs button:first").attr("id", "current");
    $("#content div:first").find("div").show();

    $('#tabs button').click(function (e) {
        var btnType = $(this).attr("btnType");
        switch (btnType) {
            case "department":
                $(".department-treeview").show();
                $(".post-department-treeview").hide();
                $(".staff-department-treeview").hide();
                $("#tab1").show();
                $("#tab2").hide();
                $("#tab3").hide();
                InitDepartment();
                break;
            case "jobs":
                $(".post-department-treeview").show();
                $(".department-treeview").hide();
                $(".staff-department-treeview").hide();
                $("#tab2").show();
                $("#tab1").hide();
                $("#tab3").hide();
                InitPost();
                break;
            case "personnel":
                $(".post-department-treeview").hide();
                $(".department-treeview").hide();
                $(".staff-department-treeview").show();
                $("#tab3").show();
                $("#tab1").hide();
                $("#tab2").hide();
                InitStaff();
                break;
        }
    });
});

function InitDepartment() {
    InitDepartmentTreeView(".department-treeview", false);
    $(".department-treeview ul a").unbind("click").on("click", function () {
        var thisObj = $(this);
        var departmentID = $(thisObj).attr("departmentID2");
        var level = parseInt($(thisObj).attr("level")) + 1;
        $("#parentID").val(departmentID);
        $("#level").val(level);
        var childrenDepartmentArr = $(".department-treeview ul [parentID=" + departmentID + "]");
        CreateDepartmentTable(childrenDepartmentArr);
    });
}

function InitPost() {
    InitDepartmentTreeView(".post-department-treeview", false);
    $(".post-department-treeview ul a").unbind("click").on("click", function () {
        var thisObj = $(this);
        var departmentID = $(thisObj).attr("departmentID2");
        $("#postDepID").val(departmentID);
        var postJsonStr = $("#postJsonHidden").val();

        if (postJsonStr != "") {
            var postJson = $.parseJSON(postJsonStr);
            var filterarray = $.grep(postJson, function (value) {
                return value.Department.ID == departmentID;
            });
            CreatePostTabel(filterarray);
        }
    });
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

    $(".post-update-btn").unbind("click").on("click", function () {
        var objArr = $(".col-post-select.cbr-checked");
        if (objArr.length > 0) {
            var selectTr = $(objArr[0]).parents("tr");
            InitPostData(selectTr);
        }
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
        var objArr = $(".col-post-select.cbr-checked");
        if (objArr.length > 0) {
            var isDelete = confirm("确定要删除吗？");
            if (isDelete) {
                var idArr = new Array();
                for (var i = 0; i < objArr.length; i++) {
                    idArr.push($(objArr[i]).parents("tr").attr("postID"));
                }
                $.post("/Organization/DeletePost",
                    {
                        idArr: idArr
                    },
                    function (data) {
                        if (data) {
                            $(".col-post-select.cbr-checked").parents("tr").remove();
                        }
                    });
            }
            else {
                return;
            } 0
        } else {
        }
        $.post("/Organization/DeletePost",
          {
              departmentID: departmentID
          },
          function (data) {

          });
    });
}

function InitDepartmentEvent() {
    $(".department-add").unbind("click").on("click", function () {
        $("#allParentDep").val(GetAllParentDepartment($(obj).attr("parentID")));
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

function CreatePostTabel(json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<tr postID='" + json[i].ID + "' postName='" + json[i].PostName + "'  description='" + json[i].Description + "' isEnable=" + json[i].IsEnable + " postDepID=" + json[i].Department.ID + "  postGrade='" + json[i].PostGrade + "' >";
        html += "<td>" + "<div  class='cbr-replaced col-post-select'><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div>" + "</td>";
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

function CreateStaffTable(json) {
    var html = "";
    for (var i = 0; i < json.length; i++) {
        html += "<tr staffID=" + json[i].ID + ">";
        html += "<td>" + "<div  class='cbr-replaced col-staff-select'><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div>" + "</td>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + json[i].StaffName + "</td>";
        html += "<td>" + json[i].Department.DepartmentName + "</td>";
        html += "<td>" + json[i].Post.PostName + "</td>";
        html += "<td>" + (json[i].Sex == 1 ? "男" : "女") + "</td>";
        html += "<td>" + (json[i].IsEnable == 1 ? "是" : "否") + "</td>";
        html += "</tr>";
    }
    $(".staff-table tbody").html(html);
    InitCheckBox();
}

function InitDepartmentData(obj) {
    $("#depID").val($(obj).attr("depID"));
    $("#departmentNameTxt").val($(obj).attr("departmentName"));
    $("#parentID").val($(obj).attr("parentID"));//上级
    $("#allParentDep").val(GetAllParentDepartment($(obj).attr("parentID"), $(obj).attr("departmentName")));
    $("#level").val($(obj).attr("level"));
    $("#isEnableSelect").val(Number($(obj).attr("isEnable") == "是"));
}

function InitPostData(obj) {
    $("#postID").val($(obj).attr("postID"));
    $("#postNameTxt").val($(obj).attr("postName"));
    $("#postDepID").val($(obj).attr("postDepID"));
    $("#postIsEnableSelect").val(Number($(obj).attr("isenable") == "true"));
    $("#postDescriptionTxt").val($(obj).attr("description"));
    $("#postGradeTxt").val($(obj).attr("postGrade"));
}

function InitStaffData() {
    $("#staffName").val();
    $("#sex").val();
    $("#age").val();
    $("#idCard").val();
    $("#entryTime").val();
    $("#officTel").val();
    $("#phone").val();
    $("#email").val();
    $("#dateBirth").val();
    $("#staffDepartment").val();
    $("#staffPost").val();
    $("#leader").val();
    $("#password").val();
    $("#isEnable").val();
    $("");//访问权限
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
    post.ID = $("#postID").val() != "" ? $("#postID").val() : 0;
    post.PostName = $("#postNameTxt").val();
    post.Description = $("#postDescriptionTxt").val();
    post.PostGrade = $("#postGradeTxt").val();
    var department = new Object();
    department.ID = $("#postDepID").val();
    post.Department = department;
    post.IsEnable = $("#postIsEnableSelect").val() == "1";
    return post;
}

function GetStaff() {
    var staff = new Object();
    staff.ID = $("#staffID").val() != "" ? $("#staffID").val() : 0;
    staff.StaffName = $("#staffNameTxt").val();
    staff.Sex = $("#sexSelect").val();
    staff.Age = $("#ageTxt").val();
    staff.IdCard = $("#idCardTxt").val();
    staff.OfficTel = $("#officTelTxt").val();
    staff.Phone = $("#phoneTxt").val();
    staff.Email = $("#emailTxt").val();
    staff.DateBirth = $("#dateBirthTxt").val();
    staff.IsEnable = $("#staffIsEnableSelect").val();
    staff.Leader.ID = $("#leader").val();
    staff.Password = $("#passwordTxt").val();
    return staff;
}

function GetStaffByDepartment(departmentID) {
    $.post("/Organization/GetStaffByDepartment",
        {
            departmentID: departmentID
        },
        function (data) {

        });
}

function InitStaff() {
    InitDepartmentTreeView(".staff-department-treeview", false);
    $.post("/Organization/GetStaff",
        function (data) {
            $("#staffJsonHidden").val(data);
            var json = $.parseJSON(data);
            CreateStaffTable(json);
        });
    $(".staff-department-treeview ul a").unbind("click").on("click", function () {
        var thisObj = $(this);
        var departmentID = $(thisObj).attr("departmentID2");
        //$("#DepID").val(departmentID);
        var staffJsonStr = $("#staffJsonHidden").val();

        if (staffJsonStr != "") {
            var staffJson = $.parseJSON(staffJsonStr);
            var filterarray = $.grep(staffJson, function (value) {
                return value.Department.ID == departmentID;
            });
            CreateStaffTable(filterarray);
        }
    });
    $(".staff-update-btn").unbind("click").on("click", function () {
        var objArr = $(".col-staff-select.cbr-checked");
        if (objArr.length > 0) {
            var selectTr = $(objArr[0]).parents("tr");
            InitPostData(selectTr);
        }
        $('.theme-popover-mask').show();
        $('.theme-popover-mask').height($(document).height());
        $('.staff-addAndEdit-panel').slideDown(200);

    });

    $(".staff-update").unbind("click").on("click", function () {
        var post = GetPostObj();
        var postJson = JSON.stringify(post);
        $.post("/Organization/UpdateStaff",
          {
              post: postJson
          },
          function (data) {

          });
    });

    $(".staff-delete").unbind("click").on("click", function () {
        var objArr = $(".col-staff-select.cbr-checked");
        if (objArr.length > 0) {
            var isDelete = confirm("确定要删除吗？");
            if (isDelete) {
                var idArr = new Array();
                for (var i = 0; i < objArr.length; i++) {
                    idArr.push($(objArr[i]).parents("tr").attr("staffID"));
                }
                $.post("/Organization/DeleteStaff",
                    {
                        idArr: idArr
                    },
                    function (data) {
                        if (data) {
                            $(".col-staff-select.cbr-checked").parents("tr").remove();
                        }
                    });
            }
            else {
                return;
            }
        } else {
        }

    });
}

/*
获取选择部门的祖先部门 
*/
function GetAllParentDepartment(parentID, depName) {
    allDepName = "";
    allDepName = GetParentDepartment(parentID);
    allDepName = allDepName.substring(0, allDepName.lastIndexOf('/'));
    var depNameArr = allDepName.split('/');
    allDepName = "";
    for (var i = depNameArr.length - 1; i != -1; i--) {
        allDepName += depNameArr[i] + "/";
    }
    allDepName += depName;
    return allDepName;
}
/*
获取上级部门
*/
function GetParentDepartment(parentID) {
    var dep = $(".department-treeview ul a[departmentid2=" + parentID + "]");
    if (dep.length > 0) {
        allDepName += $(dep).attr("departmentName") + "/";
        GetParentDepartment($(dep).attr("parentID"));
    }
    return allDepName;
}


function InitPermission() {
    $.ajax({
        url: "/Common/LoadPermission",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
        }
    });
}

function InitPermissionList(json) {
    var arr = GetPermissionTypeArr(json);
    CreatePermissionList(arr);
}

function CreatePermissionList(arr) {
    var html = "";
    for (var i = 0; i < arr.length; i++) {

    }
    $("").html(html);
}

function GetPermissionTypeArr(json) {
    var arr = new Array();
    for (var i = 0; i < json.length; i++) {
        arr.push(json.PermissionType.TypeName);
    }
    arr = $.unique(arr);
    return arr;
}



    $('.management').on("click", function () {
        $('#management').fadeIn();
        $('#settings').hide(); 
        $('#announcement').hide();
        $('#questionnaire').hide();
    });
    $('.settings').on("click", function () {
        $('#management').hide();
        $('#announcement').hide();
        $('#questionnaire').hide();
        $('#dailyOffice').hide();
        $('#settings').fadeIn();
    });
    $('.announcement').on("click", function () {
        $('#management').hide();
        $('#settings').hide();
        $('#dailyOffice').hide();
        $('#questionnaire').hide();
        $('#announcement').fadeIn();
    })
    $('.questionnaire').on("click", function () {
        $('#management').hide();
        $('#settings').hide(); 
        $('#announcement').hide();
        $('#dailyOffice').hide();
        $('#questionnaire').fadeIn();
    })
    $('.dailyOffice').on("click",function(){
        $('#management').hide();
        $('#settings').hide();
        $('#announcement').hide();
        $('#questionnaire').hide();
        $('#dailyOffice').fadeIn();
    })
        
   




