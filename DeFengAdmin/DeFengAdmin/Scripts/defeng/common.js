///初始化省  asd as 

function InitProvince(id, cityID, districtID, areaID, async) {
    $.ajax({
        url: "/Common/LoadProvince",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            var cookieValue = $.cookie("provinceID");
            for (var i = 0; i < json.length; i++) {
                var selected = "";
                if (json[i].ID == cookieValue) {
                    selected = "selected=selected";
                }
                html += "<option value=" + json[i].ID + " " + selected + ">" + json[i].Name + "</option>";
            }
            $(id).html(html);
            if (cookieValue != null) {
                InitCity(cityID, id, districtID, areaID, async);
            }
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
            $(id).on("change", function () {
                InitCity(cityID, id, districtID, areaID, async);
                $.cookie("provinceID", $(this).val());
            })
        }
    });
}

//初始化市
function InitCity(id, proID, districtID, areaID, async) {
    var proID = $(proID).val();
    $.ajax({
        url: "/Common/LoadCity",
        data: { proID: proID },
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var cookieValue = $.cookie("cityID");
            var html = "";
            for (var i = 0; i < json.length; i++) {
                var selected = "";
                if (json[i].ID == cookieValue) {
                    selected = "selected=selected";
                }
                html += "<option value=" + json[i].ID + " " + selected + ">" + json[i].Name + "</option>";
            }
            $(id).html(html);
            if (cookieValue != null) {
                var cityID = $(id).val();
                InitDistrict(districtID, id, areaID, async);
            }
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
            $(id).on("change", function () {
                InitDistrict(districtID, id, areaID, async);
                $.cookie("cityID", $(this).val());
            });
        }
    });
}

///初始化区
function InitDistrict(id, cityID, areaID, firstText, async) {
    $("" + id + " option").remove();
    $(id).prev().find("ul .select2-search-choice").remove();
    var cityID = $(cityID).val();
    $.ajax({
        url: "/Common/LoadDistrict",
        data: { cityID: cityID },
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].Name + "</option>";
            }

            $(id).html(html);
            if ($("" + id + " :selected").length > 0) {
                InitArea(areaID, id, async);
            }
            // $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
            $(id).on("change", function () {
                if ($("" + id + " :selected").length == 1) {
                    InitArea(areaID, id, async);
                    $(areaID).removeAttr("disabled");
                } else {
                    $(areaID).prev().find("ul .select2-search-choice").remove()
                    $(areaID).attr("disabled", "disabled");
                }

            });
        }
    });
}

function InitArea(id, disID, firstText, async) {
    $("" + id + " option").remove();
    var disID = $(disID)[0].value;
    $.ajax({
        url: "/Common/LoadArea",
        data: { disID: disID },
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].AreaName + "</option>";
            }
            $(id).html(html);
            $(id).on("change", function () {

            });
        }
    });
}

function InitResidentialDistrict(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadResidentialDistrict",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].Name + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

//初始化交易类型
function InitTransactionType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadTransactionType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TransactionTypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

//初始化房屋使用类型
function InitHouseUseType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadHouseUseType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

//初始化朝向
function InitOrientation(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadOrientation",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].OrientationName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

//初始化房屋类型
function InitHouseType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadHouseType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

//初始化盘符
function InitHousingLetter(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadHousingLetter",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].LetterName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitHouseQuality(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadHouseQuality",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].QualityName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitHouseStatus(id, firstText, async) {
    document.charset = "UTF-8";
    $.ajax({
        url: "/Common/LoadHouseStatus",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].StatusName + "</option>";
            }
            $(id).html(html);
            //$(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitTaxPayType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadTaxPayType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitEntrustType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadEntrustType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitSource(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadSource",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].SourceName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitCurrent(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCurrent",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].CurrentName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitPropertyOwn(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadPropertyOwn",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].PropertyName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitDecorationType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadDecorationType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitHouseDocumentType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadHouseDocumentType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitSupporting(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadSupporting",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].ItemValue + "</option>";
            }
            $(id).html(html);
            // $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitCommissionPayType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCommissionPayType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitHousePayType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadHousePayType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitFurniture(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadFurniture",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].FurnitureName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitAppliance(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadAppliance",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].ApplianceName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitLookHouseType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadLookHouseType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }
            $(id).html(html);
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitFollowType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadFollowType",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].TypeName + "</option>";
            }

            $(id).html(html);
            $(id).selectBoxIt().on('open', function () {
                // Adding Custom Scrollbar
                $(this).data('selectBoxSelectBoxIt').list.perfectScrollbar();
            });
            // $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
        }
    });
}

function InitMultipleSelectData(id, arr) {
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            var selectedID = id + " option[value=" + arr[i] + "]";
            $(selectedID).attr("selected", "selected");
            var li = "<li class='select2-search-choice'>    <div>" + $(selectedID).text() + "</div>    <a tabindex='-1' class='select2-search-choice-close' href='#'></a></li>";
            $(selectedID).prev().find("ul").append(li);
        }
    }
}

function DateTimeConvert_yyyyMMdd(dateTime) {
    var dt = new Date(dateTime);
    return dt.getFullYear() + "-" + ((dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1)) + "-" + (dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate());
}

function DateTimeConvert_yyyyMMddhhmm(dateTime) {
    var dt = new Date(dateTime);
    var year = dt.getFullYear();
    var month = (dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1);
    var day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    var hour = dt.getHours();
    var minutes = dt.getMinutes();
    var dateTime = year + "-" + month + "-" + day + ":" + hour + ":" + minutes;
    return dateTime;
}

function TableAscSort(sortCol) {
    var trArr = $("#houseTable tbody tr");
    var sortArr = "";
    switch (sortCol) {
        case "colResidentialDistrict":
            trArr = trArr.sort(ResidentialDistrictAscSort);
            break;
        case "colResidentialDistrictAddr":
            trArr = trArr.sort(ResidentialDistrictAddrAscSort);
            break;
        case "colHousePosition":
            trArr = trArr.sort(HousePositionAscSort);
            break;
        case "colHouseNumber":
            trArr = trArr.sort(HouseNumberAscSort);
            break;
        case "colTotalFloor":
            trArr = trArr.sort(TotalFloorAscSort);
            break;
        case "colHouseType1":
            trArr = trArr.sort(HouseTypeAscSort);
            break;
        case "colHouseSize":
            trArr = trArr.sort(HouseSizeAscSort);
            break;
        case "colHouseUseSize":
            trArr = trArr.sort(HouseUseSizeAscSort);
            break;
        case "colOrientation":
            trArr = trArr.sort(OrientationAscSort);
            break;
        case "colSaleTotalPrice":
            trArr = trArr.sort(SaleTotalPriceAscSort);
            break;
        case "colSaleUnitPrice":
            trArr = trArr.sort(SaleUnitPriceAscSort);
            break;
        case "colLeaseTotalPrice":
            trArr = trArr.sort(LeaseTotalPriceAscSort);
            break;
        case "colLeaseUnitPrice":
            trArr = trArr.sort(LeaseUnitPriceAscSort);
            break;
        case "colProxyStartDate":
            trArr = trArr.sort(ProxyStartDateAscSort);
            break;
        case "colLookHouseType":
            trArr = trArr.sort(LookHouseTypeAscSort);
            break;
        case "colDepartment":
            trArr = trArr.sort(DepartmentAscSort);
            break;
        case "colStaff":
            trArr = trArr.sort(StaffAscSort);
            break;
        case "clHouseStatus":
            trArr = trArr.sort(HouseStatusAscSort);
            break;
        case "colHousingLetter":
            trArr = trArr.sort(HousingLetterAscSort);
            break;
        case "colHouseSource":
            trArr = trArr.sort(HouseSourceAscSort);
            break;
        case "colLastFollwDate":
            trArr = trArr.sort(LastFollwDateAscSort);
            break;
    }
    return trArr;
}

function TableDescSort(sortCol) {
    var trArr = $("#houseTable tbody tr");
    var sortArr = "";
    switch (sortCol) {
        case "colResidentialDistrict":
            trArr = trArr.sort(ResidentialDistrictDescSort);
            break;
        case "colResidentialDistrictAddr":
            trArr = trArr.sort(ResidentialDistrictAddrDescSort);
            break;
        case "colHousePosition":
            trArr = trArr.sort(HousePositionDescDescSort);
            break;
        case "colHouseNumber":
            trArr = trArr.sort(HouseNumberDescSort);
            break;
        case "colTotalFloor":
            trArr = trArr.sort(TotalFloorDescSort);
            break;
        case "colHouseType1":
            trArr = trArr.sort(HouseTypeDescSort);
            break;
        case "colHouseSize":
            trArr = trArr.sort(HouseSizeDescSort);
            break;
        case "colHouseUseSize":
            trArr = trArr.sort(HouseUseSizeDescSort);
            break;
        case "colOrientation":
            trArr = trArr.sort(OrientationDescSort);
            break;
        case "colSaleTotalPrice":
            trArr = trArr.sort(SaleTotalPriceDescSort);
            break;
        case "colSaleUnitPrice":
            trArr = trArr.sort(SaleUnitPriceDescSort);
            break;
        case "colLeaseTotalPrice":
            trArr = trArr.sort(LeaseTotalPriceDescSort);
            break;
        case "colLeaseUnitPrice":
            trArr = trArr.sort(LeaseUnitPriceDescSort);
            break;
        case "colProxyStartDate":
            trArr = trArr.sort(ProxyStartDateDescSort);
            break;
        case "colLookHouseType":
            trArr = trArr.sort(LookHouseTypeDescSort);
            break;
        case "colDepartment":
            trArr = trArr.sort(DepartmentDescSort);
            break;
        case "colStaff":
            trArr = trArr.sort(StaffDescSort);
            break;
        case "colHouseStatus":
            trArr = trArr.sort(HouseStatusDescSort);
            break;
        case "colHousingLetter":
            trArr = trArr.sort(HousingLetterDescSort);
            break;
        case "colHouseSource":
            trArr = trArr.sort(HouseSourceDescSort);
            break;
        case "colLastFollwDate":
            trArr = trArr.sort(LastFollwDateDescSort);
            break;
    }
    return trArr;
}

//升序
function ResidentialDistrictAscSort(a, b) {
    return $(a).find("td.colResidentialDistrict").text().localeCompare($(b).find("td.colResidentialDistrict").text());
}

function ResidentialDistrictAddrAscSort(a, b) {
    return $(a).find("td.colResidentialDistrictAddr").text().localeCompare($(b).find("td.colResidentialDistrictAddr").text());
}

function HousePositionAscSort(a, b) {
    return $(a).find("td.colHousePosition").text().localeCompare($(b).find("td.colHousePosition").text());
}

function HouseNumberAscSort(a, b) {
    return $(a).find("td.colHouseNumber").text().localeCompare($(b).find("td.colHouseNumber").text());
}

function TotalFloorAscSort(a, b) {
    return parseInt($(a).find("td.colTotalFloor").text()) > parseInt($(b).find("td.colTotalFloor").text()) ? 1 : -1;
}

function HouseTypeAscSort(a, b) {
    return $(a).find("td.colHouseType1").text().localeCompare($(b).find("td.colHouseType1").text());
}

function HouseSizeAscSort(a, b) {
    return parseInt($(a).find("td.colHouseSize").text()) > parseInt($(b).find("td.colHouseSize").text()) ? 1 : -1;
}

function HouseUseSizeAscSort(a, b) {
    return parseInt($(a).find("td.colHouseUseSize").text()) > parseInt($(b).find("td.colHouseUseSize").text()) ? 1 : -1;
}

function OrientationAscSort(a, b) {
    return $(a).find("td.colOrientation").text().localeCompare($(b).find("td.colOrientation").text());
}

function SaleTotalPriceAscSort(a, b) {
    return parseInt($(a).find("td.colSaleTotalPrice").text()) > parseInt($(b).find("td.colSaleTotalPrice").text()) ? 1 : -1;
}

function SaleUnitPriceAscSort(a, b) {
    return parseInt($(a).find("td.colSaleUnitPrice").text()) > parseInt($(b).find("td.colSaleUnitPrice").text()) ? 1 : -1;
}

function LeaseTotalPriceAscSort(a, b) {
    return parseInt($(a).find("td.colLeaseTotalPrice").text()) > parseInt($(b).find("td.colLeaseTotalPrice").text()) ? 1 : -1;
}

function LeaseUnitPriceAscSort(a, b) {
    return parseInt($(a).find("td.colLeaseUnitPrice").text()) > parseInt($(b).find("td.colLeaseUnitPrice").text()) ? 1 : -1;
}

function ProxyStartDateAscSort(a, b) {
    var dt = new Date($(a).find("td.colProxyStartDate").text());
    var dt2 = new Date($(b).find("td.colProxyStartDate").text());
    return dt > dt2 ? 1 : -1;
}

function LookHouseTypeAscSort(a, b) {
    return $(a).find("td.colLookHouseType").text().localeCompare($(b).find("td.colLookHouseType").text());
}

function DepartmentAscSort(a, b) {
    return $(a).find("td.colDepartment").text().localeCompare($(b).find("td.colDepartment").text());
}

function StaffAscSort(a, b) {
    return $(a).find("td.colStaff").text().localeCompare($(b).find("td.colStaff").text());
}

function HouseStatusAscSort(a, b) {
    return $(a).find("td.colHouseStatus").text().localeCompare($(b).find("td.colHouseStatus").text());
}

function HousingLetterAscSort(a, b) {
    return $(a).find("td.colHousingLetter").text().localeCompare($(b).find("td.colHousingLetter").text());
}

function HouseSourceAscSort(a, b) {
    return $(a).find("td.colHouseSource").text().localeCompare($(b).find("td.colHouseSource").text());
}

function LastFollwDateAscSort(a, b) {
    var dt = new Date($(a).find("td.colLastFollowDate").text());
    var dt2 = new Date($(b).find("td.colLastFollowDate").text());
    return dt > dt2 ? 1 : -1;
}

//降序
function ResidentialDistrictDescSort(a, b) {
    return $(b).find("td.colResidentialDistrict").text().localeCompare($(a).find("td.colResidentialDistrict").text());
}

function ResidentialDistrictAddrDescSort(a, b) {
    return $(b).find("td.colResidentialDistrictAddr").text().localeCompare($(a).find("td.colResidentialDistrictAddr").text());
}

function HousePositionDescDescSort(a, b) {
    return $(b).find("td.colHousePosition").text().localeCompare($(a).find("td.colHousePosition").text());
}

function HouseNumberDescSort(a, b) {
    return $(b).find("td.colHouseNumber").text().localeCompare($(a).find("td.colHouseNumber").text());
}

function TotalFloorDescSort(a, b) {
    return parseInt($(b).find("td.colTotalFloor").text()) > parseInt($(a).find("td.colTotalFloor").text()) ? 1 : -1;
}

function HouseTypeDescSort(a, b) {
    return $(b).find("td.colHouseType1").text().localeCompare($(a).find("td.colHouseType1").text());
}

function HouseSizeDescSort(a, b) {
    return parseInt($(b).find("td.colHouseSize").text()) > parseInt($(a).find("td.colHouseSize").text()) ? 1 : -1;
}

function HouseUseSizeDescSort(a, b) {
    return parseInt($(b).find("td.colHouseUseSize").text()) > parseInt($(a).find("td.colHouseUseSize").text()) ? 1 : -1;
}

function OrientationDescSort(a, b) {
    return $(b).find("td.colOrientation").text().localeCompare($(a).find("td.colOrientation").text());
}

function SaleTotalPriceDescSort(a, b) {
    return parseInt($(b).find("td.colSaleTotalPrice").text()) > parseInt($(a).find("td.colSaleTotalPrice").text()) ? 1 : -1;
}

function SaleUnitPriceDescSort(a, b) {
    return parseInt($(b).find("td.colSaleUnitPrice").text()) > parseInt($(a).find("td.colSaleUnitPrice").text()) ? 1 : -1;
}

function LeaseTotalPriceDescSort(a, b) {
    return parseInt($(b).find("td.colLeaseTotalPrice").text()) > parseInt($(a).find("td.colLeaseTotalPrice").text()) ? 1 : -1;
}

function LeaseUnitPriceDescSort(a, b) {
    return parseInt($(b).find("td.colLeaseUnitPrice").text()) > parseInt($(a).find("td.colLeaseUnitPrice").text()) ? 1 : -1;
}

function ProxyStartDateDescSort(a, b) {
    var dt = new Date($(a).find("td.colProxyStartDate").text());
    var dt2 = new Date($(b).find("td.colProxyStartDate").text());
    return dt > dt2 ? -1 : 1;
}

function LookHouseTypeDescSort(a, b) {
    return $(b).find("td.colLookHouseType").text().localeCompare($(a).find("td.colLookHouseType").text());
}

function DepartmentDescSort(a, b) {
    return $(b).find("td.colDepartment").text().localeCompare($(a).find("td.colDepartment").text());
}

function StaffDescSort(a, b) {
    return $(b).find("td.colStaff").text().localeCompare($(a).find("td.colStaff").text());
}

function HouseStatusDescSort(a, b) {
    return $(b).find("td.colHouseStatus").text().localeCompare($(a).find("td.colHouseStatus").text());
}

function HousingLetterDescSort(a, b) {
    return $(b).find("td.colHousingLetter").text().localeCompare($(a).find("td.colHousingLetter").text());
}

function HouseSourceDescSort(a, b) {
    return $(b).find("td.colHouseSource").text().localeCompare($(a).find("td.colHouseSource").text());
}

function LastFollwDateDescSort(a, b) {
    var dt = new Date($(a).find("td.colLastFollowDate").text());
    var dt2 = new Date($(b).find("td.colLastFollowDate").text());
    return dt > dt2 ? -1 : 1;
}

function InitTableColChecked(type, element, async) {
    $.ajax({
        url: "/Common/Load" + type,
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            for (var i = 0; i < json.length; i++) {
                var checked = "";
                if (json[i].CheckedStatus) {
                    checked = "cbr-checked";
                }
                html += "<li class='checkbox-row'>";
                html += "<div class='cbr-replaced " + checked + "' col='" + json[i].Col + "' colID=" + json[i].ID + ">";
                html += "<div class='cbr-input'>";
                html += "<input type='checkbox' value='idf169080c89a1a8-col-2' id='toggle-idf169080c89a1a8-col-2' name='toggle-idf169080c89a1a8-col-2' class='cbr cbr-done col-checked'>";
                html += "</div>";
                html += "<div class='cbr-state'><span></span></div>";
                html += "</div>";
                html += "<label for='toggle-idf169080c89a1a8-col-2'>" + json[i].ColName + "</label>";
                html += "</li>";
            }
            $(element).html(html);
            HideTableCol();
        }
    });
}

function HideTableCol() {
    var objArr = $(".table-col-menu .cbr-replaced:not('.cbr-checked')");
    for (var i = 0; i < objArr.length; i++) {
        $(".col" + objArr[i].attributes["col"].value).hide();
    }
}

