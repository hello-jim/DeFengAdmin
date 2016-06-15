﻿var allDepName = "";

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
    });
    $('.questionnaire').on("click", function () {
        $('#management').hide();
        $('#settings').hide();
        $('#announcement').hide();
        $('#dailyOffice').hide();
        $('#questionnaire').fadeIn();
    });
    $('.dailyOffice').on("click", function () {
        $('#management').hide();
        $('#settings').hide();
        $('#announcement').hide();
        $('#questionnaire').hide();
        $('#dailyOffice').fadeIn();
    });

    $('#personnel-permissions').click(function () {
        $('.access').toggle();
    });
    $('#shrinkage').click(function () {
        $('.collaborative').toggle();
        $('#arrowOn').toggle();
        $('#arrowUp').toggle();
    });
    $('#Shrinkage1').click(function () {
        $('.collaborativeShrinkage').toggle();
        $('#collaborativeArrowOn').toggle();
        $('#collaborativeArrowUp').toggle();
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
                InitPermission();
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
        var depID = $(this).attr("departmentID2");
        $("#postDepID").val(depID);
        $.post("/Organization/GetPostByDepartment",
            {
                depID: depID,
            },
            function (data) {
                var json = $.parseJSON(data);
                CreatePostTabel(json);
            });
        //var postJsonStr = $("#postJsonHidden").val();

        //if (postJsonStr != "") {
        //    var postJson = $.parseJSON(postJsonStr);
        //    var filterarray = $.grep(postJson, function (value) {
        //        return value.Department.ID == departmentID;
        //    });
        //    CreatePostTabel(filterarray);
        //}
    });
    $.post("/Organization/GetPost",
       function (data) {
           var json = $.parseJSON(data);
           CreatePostTabel(json);
       });
    $(".post-add-btn").unbind("click").on("click", function () {
        $('.theme-popover-mask.post-addAndEdit-panel').show();
        $('.theme-popover-mask.post-addAndEdit-panel').height($(document).height());
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
              if (data == "True") {
                  alert("添加成功");
              } else {
                  alert("添加失败");
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

function InitStaff() {
    InitDepartmentTreeView(".staff-department-treeview", false);
    $.post("/Organization/GetStaff",
        function (data) {
            $("#staffJsonHidden").val(data);
            var json = $.parseJSON(data);
            CreateStaffTable(json, "all");
        });
    $(".staff-department-treeview ul a").unbind("click").on("click", function () {
        var depID = $(this).attr("departmentID2");
        $(".staff-page").attr("depID", depID)
        $.post("/Organization/GetStaffByDepartment",
            {
                depID: depID
            },
            function (data) {
                if (data != "") {
                    var json = $.parseJSON(data);
                    CreateStaffTable(json);
                }
            });
    });
    $(".staff-update-btn").unbind("click").on("click", function () {
        var objArr = $(".col-staff-select.cbr-checked");
        if (objArr.length > 0) {
            var selectTr = $(objArr[0]).parents("tr");
            var staffID = $(selectTr).attr("staffID");
            $("#staffID").val(staffID);
            $.post("/Organization/GetStaffByID",
                {
                    staffID: staffID
                },
                function (data) {
                    var json = $.parseJSON(data);
                    InitStaffData(json);
                    $('.staff-addAndEdit-panel').show();
                    $('.staff-addAndEdit-panel').height($(document).height());
                    $('.staff-addAndEdit-panel').slideDown(200);
                });
        } else {
            return;
        }
    });

    $(".staff-update-save").unbind("click").on("click", function () {
        var staff = GetStaffObj();
        var staffJson = JSON.stringify(staff);
        $.post("/Organization/UpdateStaff",
          {
              staff: staffJson
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
创建员工表格
@param json 岗位json 
@param type 搜索类型
*/
function CreatePostTabel(json, type) {
    var html = "";
    if (json.length > 0) {
        for (var i = 0; i < json.length; i++) {
            html += "<tr postID='" + json[i].ID + "' postName='" + json[i].PostName + "'  description='" + json[i].Description + "' isEnable=" + json[i].IsEnable + " postDepID=" + json[i].Department.ID + "  postGrade='" + json[i].PostGrade + "' >";
            html += "<td>" + "<div  class='cbr-replaced col-post-select'><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div>" + "</td>";
            html += "<td>" + (i + 1) + "</td>";
            html += "<td>" + json[i].PostName + "</td>";
            html += "<td>" + json[i].PostGrade + "</td>";
            html += "<td>" + (json[i].IsEnable == true ? "是" : "否") + "</td>";
            html += "</tr>";
        }
        var pageIndexHtml = "";
        pageIndexHtml += "<div class='row pageCount'>";
        pageIndexHtml += "<div class='col-md-6'></div>";
        pageIndexHtml += "<div class='col-md-6'><div class='dataTables_paginate paging_simple_numbers' id='example-1_paginate'><ul class='pagination'><li class='paginate_button previous' aria-controls='example-1' tabindex='0' id='example-1_previous' ><a href='#' class='page-up'>上一页</a></li>";
        pageIndexHtml += GetPageCountHtml(json[0].TotalCount, json[0].PageIndex, 10);
        pageIndexHtml += "<li class='paginate_button' aria-controls='example-1' tabindex='0' id='example-1_next'><a href='#' class='page-next'>下一页</a></li><li class='paginate_button page-last' aria-controls='example-1' tabindex='0' id='example-1_next' ><a href='#' pageIndex=" + GetTotalPageCount(json[0].TotalCount, 10) + ">最后一页</a></li></ul></div></div></div>";
        $(".post-page .post-table tbody").html(html);
        $(".post-page .page-select").html(pageIndexHtml);

        $(".post-page .page-select ul li a").unbind("click").on("click", function () {
            var pageIndex = $(this).attr("pageIndex");
            if (pageIndex == null) {
                pageIndex = parseInt($(".paginate_button.active a").attr("pageIndex"));
                if ($(this).hasClass("page-up")) {
                    if (!pageIndex <= 1) {
                        pageIndex--;
                        if (pageIndex < 1) {
                            return;
                        }
                    }
                }
                if ($(this).hasClass("page-next")) {
                    var page = $(".paginate_button");
                    var totalPageLength = parseInt($(page)[($(page).length - 3)].firstChild.text);
                    if (pageIndex != totalPageLength) {
                        pageIndex++;
                    } else if (pageIndex >= totalPageLength) {
                        return;
                    }
                }
            }
            if ($(".post-page .page-select[all]").length > 0) {
                $.post("/Organization/GetStaff",
                       {
                           pageIndex: pageIndex
                       },
                       function (data) {
                           var json = $.parseJSON(data);
                           CreateStaffTable(json, "all");
                       });
            } else {
                var depID = $(".post-page").attr("depID");
                $.post("/Organization/GetPostByDepartment",
                    {
                        depID: depID,
                        pageIndex: pageIndex
                    },
                    function (data) {
                        var json = $.parseJSON(data);
                        CreateStaffTable(json);
                    });
            }
        });
        InitCheckBox();
    } else {
        $(".post-table tbody tr").remove();
    }
}

function CreateDepartmentTable(childrenDepartmentArr) {
    var html = "";
    if (childrenDepartmentArr.length > 0) {
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
    } else {
        $("#departmentTabel tbody tr").remove();
    }
}

/*
创建员工表格
@param json 员工json 
@param type 搜索类型
*/
function CreateStaffTable(json, type) {
    var html = "";
    if (json.length > 0) {
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
        var pageIndexHtml = "";
        pageIndexHtml += "<div class='row pageCount'>";
        pageIndexHtml += "<div class='col-md-6'></div>";
        pageIndexHtml += "<div class='col-md-6'><div class='dataTables_paginate paging_simple_numbers' id='example-1_paginate'><ul class='pagination'><li class='paginate_button previous' aria-controls='example-1' tabindex='0' id='example-1_previous' ><a href='#' class='page-up'>上一页</a></li>";
        pageIndexHtml += GetPageCountHtml(json[0].TotalCount, json[0].PageIndex, 10);
        pageIndexHtml += "<li class='paginate_button' aria-controls='example-1' tabindex='0' id='example-1_next'><a href='#' class='page-next'>下一页</a></li><li class='paginate_button page-last' aria-controls='example-1' tabindex='0' id='example-1_next' ><a href='#' pageIndex=" + GetTotalPageCount(json[0].TotalCount, 10) + ">最后一页</a></li></ul></div></div></div>";
        $(".staff-table tbody").html(html);
        $(".page-select").html(pageIndexHtml);
        if (type === undefined) {
            $(".page-select").removeAttr("all");
        } else {
            $(".page-select").attr(type, "");
        }


        $(".staff-table tbody tr").on("click", function () {
            var staffID = $(this).attr("staffID");
            $(".staff-table tbody tr[isSelectStaff]").removeAttr("isSelectStaff");
            $(this).attr("isSelectStaff", "");
            $.post("/Organization/GetPermissionByStaff",
                {
                    staffID: staffID
                },
                function (data) {
                    var json = $.parseJSON(data);
                    InitStaffPermission(json);
                })
        });

        $(".staff-page .page-select ul li a").unbind("click").on("click", function () {
            var pageIndex = $(this).attr("pageIndex");
            if (pageIndex == null) {
                pageIndex = parseInt($(".paginate_button.active a").attr("pageIndex"));
                if ($(this).hasClass("page-up")) {
                    if (!pageIndex <= 1) {
                        pageIndex--;
                        if (pageIndex < 1) {
                            return;
                        }
                    }
                }
                if ($(this).hasClass("page-next")) {
                    var page = $(".paginate_button");
                    var totalPageLength = parseInt($(page)[($(page).length - 3)].firstChild.text);
                    if (pageIndex != totalPageLength) {
                        pageIndex++;
                    } else if (pageIndex >= totalPageLength) {
                        return;
                    }
                }
            }
            if ($(".staff-page .page-select[all]").length > 0) {
                $.post("/Organization/GetStaff",
                       {
                           pageIndex: pageIndex
                       },
                       function (data) {
                           var json = $.parseJSON(data);
                           CreateStaffTable(json, "all");
                       });
            } else {
                var depID = $(".staff-page").attr("depID");
                $.post("/Organization/GetStaffByDepartment",
                    {
                        depID: depID,
                        pageIndex: pageIndex
                    },
                    function (data) {
                        var json = $.parseJSON(data);
                        CreateStaffTable(json);
                    });
            }
        });
    }
    else {
        $(".staff-table tbody tr").remove();
    }
}

function InitStaffPermission(arr) {
    $(".permission .permission-list .cbr-replaced").removeClass("cbr-checked");
    for (var i = 0; i < arr.length; i++) {
        $(".permission .permission-list .cbr-replaced[permissionID='" + arr[i] + "']").addClass("cbr-checked");
    }
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

function InitStaffData(obj) {
    $("#staffNameTxt").val(obj.StaffName);
    $("#sex").val(obj.Sex);
    $("#ageTxt").val(obj.Age);
    $("#idCardTxt").val(obj.IdCard);
    $("#entryTime").val(obj.EntryTime);
    $("#officTelTxt").val(obj.OfficTel);
    $("#phoneTxt").val(obj.Phone);
    $("#emailTxt").val(obj.Email);
    $("#dateBirth").val(obj.DateBirth);
    $("#staffDepartment").val();
    $("#staffPost").val();
    $("#staffIsEnable").val(Number(obj.IsEnable));
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

function GetStaffObj() {
    var staff = new Object();
    staff.ID = $("#staffID").val();
    staff.StaffName = $("#staffNameTxt").val();
    staff.Sex = $("#sex").val();
    staff.Age = $("#ageTxt").val();
    staff.IdCard = $("#idCardTxt").val();
    staff.EntryTime = $("#entryTime").val();
    staff.OfficTel = $("#officTelTxt").val();
    staff.Phone = $("#phoneTxt").val();
    staff.Email = $("#emailTxt").val();
    staff.Birthday = $("#dateBirth").val();
    //$("#staffDepartment").val();
    //$("#staffPost").val();
    staff.IsEnable = parseInt($("#staffIsEnable").val());
    return staff;
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

function InitPermissionList() {
    $.ajax({
        url: "/Organization/GetPermission",
        async: true,
        success: function (data) {
            var json = $.parseJSON(data);
            CreatePermissionList(json);

        }
    });
}

function CreatePermissionList(json) {
    $(".permission-list div").html("");
    for (var i = 0; i < json.length; i++) {
        var html = "<span>" + json[i].PermissionName + "</span>";
        html += "<div permissionID='" + json[i].ID + "' class='cbr-replaced col-staff-select'><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";

        $(".permission-list div[permissionTypeID='" + json[i].PermissionType.ID + "']").append(html);
    }
    InitCheckBox();
}

function CreatePermissionTypeList(json) {
    var li = "";
    var html = "";
    for (var i = 0; i < json.length; i++) {
        li += "<li permissionTypeID='" + json[i].ID + "' class=''>";
        li += "<a href='javascript:void(0);' class='management'>";
        li += "<span class='visible-xs'><i class='fa-home'></i></span>";
        li += "<span class='hidden-xs'>" + json[i].TypeName + "</span>";
        li += "</a>";
        li += "</li>";
        html += "<div class='permission-panel' permissionTypeID='" + json[i].ID + "'></div>";
    }
    $(".permission-type").html(li);
    $(".permission-list").html(html);
    $(".permission-list div").hide();

    $(".permission-list div:eq(0)").show();
    $(".permission-type li").on("click", function () {
        var permissionTypeID = $(this).attr("permissionTypeID");
        $(".permission-list .permission-panel[permissionTypeID='" + permissionTypeID + "']").show();
        $(".permission-list .permission-panel[permissionTypeID!='" + permissionTypeID + "']").hide();
    });
}

function InitPermission() {
    $.ajax({
        url: "/Organization/GetPermissionType",
        async: true,
        success: function (data) {
            var json = $.parseJSON(data);
            CreatePermissionTypeList(json);
            InitPermissionList(json);
        }
    });
    $(".permission-all-select").unbind("click").on("click", function () {
        $(".permission .permission-list .cbr-replaced").addClass("cbr-checked");
    });
    $(".permission-all-clear").unbind("click").on("click", function () {
        $(".permission .permission-list .cbr-replaced").removeClass("cbr-checked");
    });
    $(".permission-save").unbind("click").on("click", function () {
        var arr = ConvertArr($(".permission .permission-list .cbr-replaced.cbr-checked"), "permissionID");
        var staffID = $(".staff-table tbody tr[isSelectStaff]").attr("staffID");
        $.post("/Organization/AddStaffPermission",
            {
                staffID: staffID,
                permissionIDArr: arr
            },
            function (data) {
                if (data == "1") {
                    alert("保存成功");
                } else {
                    alert("保存失败");
                }
            });
    });
}



