var searchAction = "";

$(document).ready(function () {
    var testCode = "";
    InitCustomerTransactionType("#customerTransactionTypeSearchSelect", "全部", true);
    InitCustomerStatus("#houseStatusJoinSearchSelect", "全部", true);
    InitHousePayType("#houseUseTypeSearchSelect", "全部", true);
    InitHouseType("#houseTypeSearchSelect", "全部", true);
    InitOrientation("#orientationSearchSelect", "全部", true);
    InitCustomerType("#customerTypeSearchSelect", "全部", true);
    InitCustomerTableSort();
    $("#main-menu li").removeClass("active");
    $(".customer-menu").addClass("opened active");
    InitHouseAdd();
    $("#multipleSearchItem").on("click", function () {
        $("#multipleSearchDiv").toggle(500);
    });
    $("#entrustStartDateSearchSelect").on("changed", function () {
        var customer = GetEntrustStartDateObj();
        $(".pageCount").remove();
        var customerJson = JSON.stringify(customer);
        BeforeHouseDataLoading();
        $.post("/Customer/Search",
               {
                   customer: customerJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateCustomerTable(json);
                searchAction = "entrustStartDate";
            });
    });
    $("#customerBuyDateSearchSelect").on("changed", function () {
        var customer = GetCustomerBuyDateObj();
        $(".pageCount").remove();
        var customerJson = JSON.stringify(customer);
        BeforeHouseDataLoading();
        $.post("/Customer/Search",
               {
                   customer: customerJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateCustomerTable(json);
                searchAction = "customerBuyDate";
            });
    });
    $("#customerLeaseDateSearchSelect").on("changed", function () {
        var customer = GetCustomerLeaseDateObj();
        $(".pageCount").remove();
        var customerJson = JSON.stringify(customer);
        BeforeHouseDataLoading();
        $.post("/Customer/Search",
               {
                   customer: customerJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateCustomerTable(json);
                searchAction = "customerLeaseDate";
            });
    });
    $("#customerStatusSearchSelect").on("changed", function () {
        var customer = GetCustomerStatusObj();
        $(".pageCount").remove();
        var customerJson = JSON.stringify(customer);
        BeforeHouseDataLoading();
        $.post("/Customer/Search",
               {
                   customer: customerJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateCustomerTable(json);
                searchAction = "customerStatus";
            });
    });
});

function GetEntrustStartDateObj() {
    var entrustStartDateVal = parseInt($("#entrustStartDateSearchSelect").val());
    var entrustStartDate = new Date();
    if (entrustStartDateVal == -1) {
        entrustStartDate = new Date("1900-01-01");
    } else {
        entrustStartDate.setDate(entrustStartDate.getDate() - entrustStartDateVal);
    }
    var customer = new Object();
    customer.EntrustStartDate = entrustStartDate;
    return customer;
}

function GetCustomerBuyDateObj() {
    var customerTransactionType = new Object();
    customerTransactionType.ID = 1;
    var customerBuyDateVal = parseInt($("#customerBuyDateSearchSelect").val());
    var entrustStartDate = new Date();
    if (customerBuyDateVal == -1) {
        entrustStartDate = new Date("1900-01-01");
    } else {
        entrustStartDate.setDate(entrustStartDate.getDate() - customerBuyDateVal);
    }
    var customer = new Object();
    customer.CustomerTransactionType = customerTransactionType;
    customer.EntrustStartDate = entrustStartDate;
    return customer;
}

function GetCustomerLeaseDateObj() {
    var customerTransactionType = new Object();
    customerTransactionType.ID = 2;
    var customerLeaseDateVal = parseInt($("#customerLeaseDateSearchSelect").val());
    var entrustStartDate = new Date();
    if (customerTransactionType.ID == -1) {
        entrustStartDate = new Date("1900-01-01");
    } else {
        entrustStartDate.setDate(entrustStartDate.getDate() - customerLeaseDateVal);
    }
    var customer = new Object();
    customer.CustomerTransactionType = customerTransactionType;
    customer.EntrustStartDate = entrustStartDate;
    return customer;
}

function GetCustomerStatusObj() {
    var customerStatus = new Object();
    customerStatus.ID = $("#customerStatusSearchSelect").val();
    var customer = new Object();
    customer.CustomerStatus = customerStatus;
    return customer;
}

function GetJointSearchObj() {
    var district = new Object();
    district.Name = GetObjArrVal($("#districtSearchSelect :selected"));
    var area = new Object();
    area.AreaName = GetObjArrVal($("#areaSearchSelect :selected"));
    var houseUseType = new Object();
    houseUseType.ID = $("#houseUseTypeSearchSelect").val();
    if (houseUseType.ID == 0) {
        houseUseType = null;
    }
    var customerTransactionType = new Object();
    customerTransactionType.ID = $("#customerTransactionTypeSearchSelect").val();
    if (customerTransactionType.ID == 0) {
        customerTransactionType = null;
    }
    var customerType = new Object();
    customerType.ID = $("#houseTypeSearchSelect").val();
    if (customerType.ID == 0) {
        customerType = null;
    }
    var orientation = new Object();
    orientation.ID = $("#orientationSearchSelect").val();
    if (orientation.ID == 0) {
        orientation = null;
    }
    var salePriceFrom = $("#salePriceFromTxt").val() != "" ? $("#salePriceFromTxt").val() : 0;
    var salePriceTo = $("#salePriceToTxt").val() != "" ? $("#salePriceToTxt").val() : 0;
    var houseSizeFrom = $("#houseSizeFromTxt").val() != "" ? $("#houseSizeFromTxt").val() : 0;
    var houseSizeTo = $("#houseSizeToTxt").val() != "" ? $("#houseSizeToTxt").val() : 0;
    var floorFrom = $("#floorFromTxt").val() != "" ? $("#floorFromTxt").val() : 0;
    var floorTo = $("#floorToTxt").val() != "" ? $("#floorToTxt").val() : 0;
    var customer = new Object();
    customer.District = district;
    customer.Area = area;
    customer.HouseUseType = houseUseType;
    customer.CustomerTransactionType = customerTransactionType;
    customer.CustomerType = houseType;
    customer.Orientation = orientation;
    customer.SalePriceFrom = salePriceFrom;
    customer.SalePriceTo = salePriceTo;
    customer.HouseSizeFrom = houseSizeFrom;
    customer.HouseSizeTo = houseSizeTo;
    customer.FloorFrom = floorFrom;
    customer.FloorTo = floorTo;
    return customer;
}

function InitHouseAdd() {
    $(".add-customer").on("click", function () {
        ShowCustomerPanel("addCustomer");
        InitProvince("#provinceSelect", "#citySelect", "#districtSelect", "#areaSelect", "", true);
        InitResidentialDistrict("#residentialDistrictSelect", "", true);
        InitHouseType("#houseTypeSelect", "", true);
        InitHouseUseType("#houseTypeSelect", "", true);
        InitOrientation("#orientationSelect", "", true);
        InitHousingLetter("#housingLetterSelect", "", true);
        InitHouseQuality("#houseQualitySelect", "", true);
        InitTransactionType("#transactionTypeSelect", "", true);
        InitHouseStatus("#houseStatusSelect", "", true);
        InitTaxPayType("#taxPayTypeSelect", "", true);
        InitEntrustType("#entrustTypeSelect", "", true);
        InitSource("#sourceSelect", "", true);
        InitCurrent("#currentSelect", "", true);
        InitPropertyOwn("#propertyOwnSelect", "", true);
        InitDecorationType("#decorationTypeSelect", "", true);
        InitHouseDocumentType("#houseDocumentTypeSelect", "", true);
        InitCommissionPayType("#commissionPayTypeSelect", "", true);
        InitSupporting("#supportingSelect", "", true);
        InitHousePayType("#housePayTypeSelect", "", true);
        InitFurniture("#furnitureSelect", "", true);
        InitAppliance("#applianceSelect", "", true);
        InitLookHouseType("#lookHouseTypeSelect", "", true);
        $("#addHouse").on("click", function () {
            var house = GetHouseObj();
            var houseJson = JSON.stringify(house);
            $.post("/House/AddHouse",
                {
                    house: houseJson
                }, function (data) {
                    if (data == "1") {
                        alert("success");
                    }
                });
        });
    });
}

function ShowCustomerPanel(action) {
    $(".customer-panel *").unbind("click");

    $(".customer-panel-close").on("click", function () {
        $(".customer-panel").hide();
    });
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        // weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $(".customer-panel").show();
    var scrollTop = $(document).scrollTop();
    $(".customer-panel").css("top", scrollTop + 400 + "px");
    if (action == "editHouse") {
        $("#fileUp").show();
        $(".follow-record-panel-show").show();
        var recordBtnIsShow = $(".follow-record-show").css("display") == "inline-block";
        if (recordBtnIsShow) {
            $(".owner-show").hide();
        }
        $("#addCustomer").hide();
        var houseID = $("#houseID").val();
    } else {
        $("#fileUp").hide();
        $(".follow-record-panel-show").hide();
        $(".owner-show").hide();
        $("#addCustomer").show();
    }
    $("#" + action + "").show();
    $(".follow-record-panel-show").on("click", function () {
        $(".follow-record-panel").css("top", scrollTop + 500 + "px");
        ShowFollowRecordPanel();
    });
}

function CreateCustomerTable(json) {
    var html = "";
    if (json == "") {
        html += "没有数据";
    }
    else {
        html += "<tbody>";
        var IDPrefix = "df000";
        for (var i = 0; i < json.length; i++) {
            html += "<tr class='customer-tab-tr' houseID=" + json[i].ID + " houseJson='" + JSON.stringify(json[i]) + "'>";
            html += "<td><div  class='cbr-replaced col-select' houseID=" + json[i].ID + "><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div></td>";
            html += "<td class='colCustomerID'>" + IDPrefix + json[i].ID + "</td>";
            html += "<td class='colTransactionType' transactionTypeID='" + json[i].CustomerTransactionType.ID + "'>" + json[i].CustomerTransactionType.TypeName + "</td>";
            html += "<td class='colEntrustStartDate'>" + DateTimeConvert_yyyyMMdd(json[i].EntrustStartDate) + "</td>";
            html += "<td class='colCustomerName'>" + json[i].CustomerName + "</td>";
            html += "<td class='colDistrict' districtID='" + json[i].District.ID + "'>" + json[i].District.Name + "</td>";
            html += "<td class='colArea' areaID='" + json[i].Area.ID + "'>" + json[i].Area.AreaName + "</td>";
            html += "<td class='colResidentialDistrict' colResidentialDistrictID='" + json[i].ResidentialDistrict.ID + "'>" + json[i].ResidentialDistrict.Name + "</td>";
            html += "<td class='colHousePosition'>" + json[i].Position + "</td>";
            html += "<td class='colFloor'>" + json[i].Floor + "</td>";
            html += "<td class='colHouseType1'>" + GetHouseType1(json[i].RoomCount, json[i].HallCount, json[i].ToiletCount, json[i].BalconyCount) + "</td>";
            html += "<td class='colHouseSize'>" + json[i].HouseSize + "</td>";
            html += "<td class='colOrientation' colOrientationID='" + json[i].Orientation.ID + "'>" + json[i].Orientation.OrientationName + "</td>";
            html += "<td class='colPrice'>" + json[i].Price + "</td>";
            html += "<td class='colDecorationType'>" + json[i].DecorationType.TypeName + "</td>";
            html += "<td class='colSupporting'>" + json[i].Supporting + "</td>";
            html += "<td class='colHouseUseType'>" + json[i].HouseUseType.TypeName + "</td>";
            html += "<td class='colHouseType' colHouseTypeID='" + json[i].HouseType.ID + "'>" + json[i].HouseType.TypeName + "</td>";
            html += "<td class='colRemarks'>" + json[i].Remarks + "</td>";
            html += "<td class='colGrade'>" + json[i].Grade.GradeName + "</td>";
            html += "<td class='colDepartment'>" + "暂无" + "</td>";
            html += "<td class='colStaff'>" + "暂无" + "</td>";
            html += "<td class='colCustomerStatus'>" + json[i].CustomerStatus.StatusName + "</td>";
            html += "<td class='colIsPrivateCustomer'>" + (json[i].IsPrivateCustomer == true ? "私" : "公") + "</td>";
            html += "<td class='colLastFollowDate'>" + DateTimeConvert_yyyyMMdd(json[i].LastFollowDate) + "</td>";
            html += "<td class='colEntrustType'>" + json[i].EntrustType.TypeName + "</td>";
            html += "<td class='colSource'>" + json[i].Source.SourceName + "</td>";
            html += "<td class='colCustomerType'>" + json[i].CustomerType.TypeName + "</td>";
            html += "<td class='colIntention'>" + json[i].Intention.IntentionName + "</td>";
            html += "<td class='colEntrustOverDate'>" + DateTimeConvert_yyyyMMdd(json[i].EntrustOverDate) + "</td>";
            html += "</tr>";
        }
        html += "</tbody>";
        var pageIndexHtml = "";
        pageIndexHtml += "<div class='row pageCount'>";
        pageIndexHtml += "<div class='col-md-6'></div>";
        pageIndexHtml += "<div class='col-md-6'><div class='dataTables_paginate paging_simple_numbers' id='example-1_paginate'><ul class='pagination'><li class='paginate_button previous disabled' aria-controls='example-1' tabindex='0' id='example-1_previous'><a href='#'>Previous</a></li>";
        pageIndexHtml += GetPageCountHtml(json[0].TotalCustomerCount, json[0].PageIndex);
        pageIndexHtml += "<li class='paginate_button next' aria-controls='example-1' tabindex='0' id='example-1_next'><a href='#'>Next</a></li></ul></div></div></div>";
    }
    $("#customer-table").append(html);
    $("#customer-tabel-div").append(pageIndexHtml);
    InitPageIndex();
    CustomerTableDoubleClick();
    HideTableCol();
    InitTableColSelect();
    AfterHouseDataLoading();
}

function InitPageIndex() {
    $(".paginate_button").on("click", function () {
        $(".paginate_button.active").removeClass("active");
        $(this).addClass("active");
        BeforeHouseDataLoading();
        var pageIndex = $(".paginate_button.active a").attr("pageIndex");
        $(".pageCount").remove();
        var customer = new Object();
        switch (searchAction) {
            case "entrustStartDate":
                customer = GetEntrustStartDateObj();
                break;
            case "customerBuyDate":
                customer = GetCustomerBuyDateObj();
                break;
            case "customerLeaseDate":
                customer = GetCustomerLeaseDateObj();
                break;
            case "customerStatus":
                customer = GetCustomerStatusObj();
                break;
            case "houseQuality":
                customer = GetHouseQualityObj();
                break;
            case "jointSearch":
                customer = GetJointSearchObj();
                break;
        }
        customer.PageIndex = pageIndex;
        var customerJosn = JSON.stringify(customer);
        $.post("/Customer/Search",
            {
                customer: customerJosn
            },
            function (data) {
                var json = $.parseJSON(data);
                CreateCustomerTable(json);
            });
    });
}

function CustomerTableDoubleClick() {
    $(".customer-tab-tr").on("dblclick", function () {
        ShowHousePanel("editHouse");
        var obj = $.parseJSON($(this).attr("houseJson"));
        InitResidentialDistrict("#residentialDistrictSelect", "", false);
        InitHouseType("#houseTypeSelect", "", false);
        InitHousingLetter("#housingLetterSelect", "", false);
        InitHouseQuality("#houseQualitySelect", "", false);
        InitTransactionType("#transactionTypeSelect", "", false);
        InitHouseStatus("#houseStatusSelect", "", false);
        InitTaxPayType("#taxPayTypeSelect", "", false);
        InitEntrustType("#entrustTypeSelect", "", false);
        InitSource("#sourceSelect", "", false);
        InitCurrent("#currentSelect", "", false);
        InitPropertyOwn("#propertyOwnSelect", "", false);
        InitDecorationType("#decorationTypeSelect", "", false);
        InitHouseDocumentType("#houseDocumentTypeSelect", "", false);
        InitCommissionPayType("#commissionPayTypeSelect", "", false);
        InitSupporting("#supportingSelect", "", false);
        InitHousePayType("#housePayTypeSelect", "", false);
        InitFurniture("#furnitureSelect", "", false);
        InitAppliance("#applianceSelect", "", false);
        InitLookHouseType("#lookHouseTypeSelect", "", false);
        InitEditHouseData(obj);
        $("#editHouse").unbind("click");
        $("#editHouse").on("click", function () {
            var thisObj = this;
            $(thisObj).attr("disabled", "disabled");
            var house = GetHouseObj();
            var houseJson = JSON.stringify(house);
            $.post("/House/UpdateHouse",
                {
                    house: houseJson
                },
                function (data) {
                    if (data == "1") {
                        alert("success");
                    }
                    $(thisObj).removeAttr("disabled");
                });
        });
    });
}

//表格加载前
function BeforeHouseDataLoading() {
    $("#customer-tabel-div").hide();
    $("#customer-table tbody").remove();
    $("#loadImg").show();
}

//表格加载后
function AfterHouseDataLoading() {
    $("#loadImg").hide();
    $("#customer-tabel-div").show();
}

function GetHouseType1(roomCount, hallCount, toiletCount, balconyCount) {
    return roomCount + "-" + hallCount + "-" + toiletCount + "-" + balconyCount;
}

function InitTableColSelect() {
    $("#customer-table tbody .col-select").on("click", function () {
        var thisObj = this;
        var checked = $(thisObj).hasClass("cbr-checked");
        if (checked) {
            $(thisObj).removeClass("cbr-checked");
        }
        else {
            $(thisObj).addClass("cbr-checked");
        }
    });
}

function GetPageCountHtml(totalLength, activeIndex) {
    var houseMaxCount = GetSysConf("customerMaxCount");
    var count = totalLength / houseMaxCount;
    var html = "";
    for (var i = 0; i < count; i++) {
        var active = "";
        if (i == activeIndex - 1) {
            active = "active";
        }
        html += "<li class='paginate_button " + active + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (i + 1) + ">" + (i + 1) + "</a></li>";
    }
    return html;
}

function InitCustomerTableSort() {
    $("#customer-table th").on("click", function () {
        var trArr = "";
        var sortCol = $(this).attr("class");
        var sortType = $(this).attr("sortType");
        var isFirstClick = sortType == null;
        if (isFirstClick || sortType == "Asc") {
            trArr = CustomerTableAscSort(sortCol);
            $(this).attr("sortType", "Desc");
        } else {
            trArr = CustomerTableDescSort(sortCol);
            $(this).attr("sortType", "Asc");
        }
        $("#customer-table tbody tr").remove();
        $("#customer-table tbody").append(trArr);
    });
}

function CustomerTableAscSort(sortCol) {
    var trArr = $("#customer-table tbody tr");
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
        case "colCustomerStatus":
            trArr = trArr.sort(CustomerStatusAscSort);
            break;
        case "colHousingLetter":
            trArr = trArr.sort(HousingLetterAscSort);
            break;
        case "colHouseSource":
            trArr = trArr.sort(HouseSourceAscSort);
            break;
        case "colLastFollowDate":
            trArr = trArr.sort(LastFollowDateAscSort);
            break;
        case "colRemarks":
            trArr = trArr.sort(RemarksAscSort);
            break;
        case "colGrade":
            trArr = trArr.sort(GradeAscSort);
            break;
        case "colHouseUseType":
            trArr = trArr.sort(HouseUseTypeAscSort);
            break;
    }
    return trArr;
}

function CustomerTableDescSort(sortCol) {
    var trArr = $("#customer-table tbody tr");
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
        case "colCustomerStatus":
            trArr = trArr.sort(CustomerStatusDescSort);
            break;
        case "colHousingLetter":
            trArr = trArr.sort(HousingLetterDescSort);
            break;
        case "colHouseSource":
            trArr = trArr.sort(HouseSourceDescSort);
            break;
        case "colLastFollowDate":
            trArr = trArr.sort(LastFollowDateDescSort);
            break;
        case "colRemarks":
            trArr = trArr.sort(RemarksDescSort);
            break;
        case "colGrade":
            trArr = trArr.sort(GradeDescSort);
            break;
        case "colHouseUseType":
            trArr = trArr.sort(HouseUseTypeDescSort);
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

function CustomertStatusAscSort(a, b) {
    return $(a).find("td.colCustomerStatus").text().localeCompare($(b).find("td.colCustomerStatus").text());
}

function HousingLetterAscSort(a, b) {
    return $(a).find("td.colHousingLetter").text().localeCompare($(b).find("td.colHousingLetter").text());
}

function HouseSourceAscSort(a, b) {
    return $(a).find("td.colHouseSource").text().localeCompare($(b).find("td.colHouseSource").text());
}

function LastFollowDateAscSort(a, b) {
    var dt = new Date($(a).find("td.colLastFollowDate").text());
    var dt2 = new Date($(b).find("td.colLastFollowDate").text());
    return dt > dt2 ? 1 : -1;
}

function RemarksAscSort(a, b) {
    return $(a).find("td.colRemarks").text().localeCompare($(b).find("td.colRemarks").text());
}

function GradeAscSort(a, b) {
    return $(a).find("td.colGrade").text().localeCompare($(b).find("td.colGrade").text());
}

function HouseUseTypeAscSort(a, b) {
    return $(a).find("td.colHouseUseType").text().localeCompare($(b).find("td.colHouseUseType").text());
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

function CustomerStatusDescSort(a, b) {
    return $(a).find("td.colCustomerStatus").text().localeCompare($(b).find("td.colCustomerStatus").text());
}

function HousingLetterDescSort(a, b) {
    return $(b).find("td.colHousingLetter").text().localeCompare($(a).find("td.colHousingLetter").text());
}

function HouseSourceDescSort(a, b) {
    return $(b).find("td.colHouseSource").text().localeCompare($(a).find("td.colHouseSource").text());
}

function LastFollowDateDescSort(a, b) {
    var dt = new Date($(a).find("td.colLastFollowDate").text());
    var dt2 = new Date($(b).find("td.colLastFollowDate").text());
    return dt > dt2 ? -1 : 1;
}

function RemarksDescSort(a, b) {
    return $(b).find("td.colRemarks").text().localeCompare($(a).find("td.colRemarks").text());
}

function GradeDescSort(a, b) {
    return $(b).find("td.colGrade").text().localeCompare($(a).find("td.colGrade").text());
}

function HouseUseTypeDescSort(a, b) {
    return $(b).find("td.colHouseUseType").text().localeCompare($(a).find("td.colHouseUseType").text());
}

function IntentionDescSort(a, b) {
    return $(b).find("td.colIntention").text().localeCompare($(a).find("td.colIntention").text());
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
