$(document).ready(function () {
    InitPost();
    InitDepartment();
});

function InitPost() {
    $(".post-add").unbind("click").on("click", function () {
        var post = GetPostObj();
        var postJson = JSON.stringify(post);
        $.post("/Organization/AddPost",
          {
              post: postJson
          },
          function (data) {

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

function InitDepartment() {
    $(".department-add").unbind("click").on("click", function () {
        var department = GetDepartmentObj();
        var departmentJson = JSON.stringify(department);
        $.post("/Organization/AddDepartment",
          {
              department: departmentJson
          },
          function (data) {

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

          });
    });

    $(".department-delete").unbind("click").on("click", function () {
        var departmentID = $("").val();
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
    department.ID = $("#departmentHide").val();
    department.DepartmentName = $("#departmentNameTxt").val();
    department.Parent = $();//上级
    department.Level = $();
    department.IsEnable = $("").val() == 1;
    return department;
}

function GetPostObj() {
    var post = new Object();
    post.ID = $("#postHide").val();
    post.PostName = $("#postNameTxt").val();
    var department = new Object();
    department.ID = $("#post");
    post.Department = department;
    post.IsEnable = $("").val() == "1";
}

function GetStaffByDepartment(departmentID) {
    $.post("/Organization/GetStaffByDepartment",
        {
            departmentID: departmentID
        },
        function (data) {

        });
}

function GetPost(departmentID) {
    var departmentID = $().val();
    $.post("/Organization/GetPost",
      {
          departmentID: departmentID
      },
      function (data) {

      });
}



function LoadDepartment() {
    $.post("/Organization/LoadDepartment",
      function (data) {

      });
}