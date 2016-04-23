$(document).ready(function () {
    $("#main-menu li").removeClass("active");
    $(".customer-menu").addClass("opened active");
    InitHouseAdd();
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
});

function GetEntrustStartDateObj() {
    var entrustStartDateVal = parseInt($("#entrustStartDateSearchSelect").val());
    var entrustStartDate = new Date();
    if (entrustStartDateVal == -1) {
        entrustStartDate = new Date("1900-01-01");
    } else {
        entrustStartDate.setDate(entrustStartDate.getDate() - entrustStartDateVal);
    }
    var house = new Object();
    house.EntrustStartDate = entrustStartDate;
    return house;
}

function GetCustomerBuyDateObj() {
    var transactionType = new Object();
    transactionType.ID = 2;
    var customerBuyDateVal = parseInt($("#customerBuyDateSearchSelect").val());
    var proxyStartDate = new Date();
    if (houseBuyDateVal == -1) {
        proxyStartDate = new Date("1900-01-01");
    } else {
        proxyStartDate.setDate(proxyStartDate.getDate() - customerBuyDateVal);
    }
    var house = new Object();
    house.TransactionType = transactionType;
    house.proxyStartDate = proxyStartDate;
    return house;
}

function GetCustomerLeaseDateObj() {
    var transactionType = new Object();
    transactionType.ID = 1;
    var customerLeaseDateVal = parseInt($("#customerLeaseDateSearchSelect").val());
    var proxyStartDate = new Date();
    if (transactionType.ID == -1) {
        proxyStartDate = new Date("1900-01-01");
    } else {
        proxyStartDate.setDate(proxyStartDate.getDate() - customerLeaseDateVal);
    }
    var house = new Object();
    house.TransactionType = transactionType;
    house.proxyStartDate = proxyStartDate;
    return house;
}

function GetCustomerStatusObj() {
    var customerStatus = new Object();
    customerStatus.ID = $("#customerStatusSearchSelect").val();
    var house = new Object();
    house.CustomerStatus = customerStatus;
    return house;
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
            html += "<td class='colTransactionType' transactionTypeID='" + json[i].TransactionType.ID + "'>" + json[i].TransactionType.TransactionTypeName + "</td>";
            html += "<td class='colEntrustStartDate'>" + DateTimeConvert_yyyyMMdd(json[i].EntrustStartDate) + "</td>";
            html += "<td class='colDistrict' districtID='" + json[i].District.ID + "'>" + json[i].District.Name + "</td>";
            html += "<td class='colArea' areaID='" + json[i].Area.ID + "'>" + json[i].Area.AreaName + "</td>";
            html += "<td class='colResidentialDistrict' colResidentialDistrictID='" + json[i].ResidentialDistrict.ID + "'>" + json[i].ResidentialDistrict.Name + "</td>";
            html += "<td class='colHousePosition'>" + json[i].HousePosition + "</td>";
            html += "<td class='colFloor'>" + json[i].Floor + "</td>";
            html += "<td class='colHouseType1'>" + GetHouseType1(json[i].RoomCount, json[i].HallCount, json[i].ToiletCount, json[i].BalconyCount) + "</td>";
            html += "<td class='colHouseSize'>" + json[i].HouseSize + "</td>";
            html += "<td class='colOrientation' colOrientationID='" + json[i].Orientation.ID + "'>" + json[i].Orientation.OrientationName + "</td>";
            html += "<td class='colPrice'>" + json[i].Price + "</td>";
            html += "<td class='colDecorationType'>" + json[i].DecorationType.TypeName + "</td>";
            html += "<td class='colSupporting'>" + json[i].Supporting + "</td>";
            html += "<td class='colHouseUseType'>" + json[i].HouseUseType.Name + "</td>";
            html += "<td class='colHouseType' colHouseTypeID='" + json[i].HouseType.ID + "'>" + json[i].HouseType.TypeName + "</td>";
            html += "<td class='colRemarks'>" + json[i].Remarks + "</td>";
            html += "<td class='colGrade'>" + json[i].Grade + "</td>";
            html += "<td class='colRemarks'>" + json[i].Remarks + "</td>";
            html += "<td class='colLookHouseType'>" + json[i].LookHouseType.TypeName + "</td>";
            html += "<td class='colStaff'>" + "暂无" + "</td>";
            html += "<td class='colDepartment'>" + "暂无" + "</td>";
            html += "<td class='colCustomerStatus'>" + json[i].CustomerStatus.StatusName + "</td>";
            html += "<td class='colCustomerLetter'>" + json[i].CustomerLetter + "</td>";
            html += "<td class='colLastFollowDate'>" + json[i].LastFollowDate + "</td>";
            html += "<td class='colEntrustType'>" + json[i].EntrustType.TypeName + "</td>";        
            html += "<td class='colSource'>" + json[i].HouseStatus.Source.SourceName + "</td>";
            html += "<td class='colCustomerType'>" + json[i].CustomerType.TypeName + "</td>";
            html += "<td class='colIntention'>" + json[i].Intention.IntentionName + "</td>";
            html += "<td class='colEntrustOverDate'>" + DateTimeConvert_yyyyMMdd(json[i].EntrustOverDate) + "</td>";
            html += "</tr>";
        }
        html += "</tbody>";
        // html += "</table>";
        var pageIndexHtml = "";
        pageIndexHtml += "<div class='row pageCount'>";
        pageIndexHtml += "<div class='col-md-6'></div>";
        pageIndexHtml += "<div class='col-md-6'><div class='dataTables_paginate paging_simple_numbers' id='example-1_paginate'><ul class='pagination'><li class='paginate_button previous disabled' aria-controls='example-1' tabindex='0' id='example-1_previous'><a href='#'>Previous</a></li>";
        pageIndexHtml += GetPageCountHtml(json[0].TotalHouseCount, json[0].PageIndex);
        pageIndexHtml += "<li class='paginate_button next' aria-controls='example-1' tabindex='0' id='example-1_next'><a href='#'>Next</a></li></ul></div></div></div>";
    }
    $("#customer-table").append(html);
    $("#customer-tabel-div").append(pageIndexHtml);
    InitPageIndex();
    HouseTableDoubleClick();
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
        var house = new Object();
        switch (searchAction) {
            case "entrustStartDate":
                house = GetProxyStartDateObj();
                break;
            case "houseSaleDate":
                house = GetSaleHouseDateObj();
                break;
            case "houseLeaseDate":
                house = GetHouseLeaseDateObj();
                break;
            case "houseStatus":
                house = GetHouseStatusObj();
                break;
            case "houseQuality":
                house = GetHouseQualityObj();
                break;
            case "jointSearch":
                house = GetJointSearchObj();
                break;
        }
        house.PageIndex = pageIndex;
        var houseJosn = JSON.stringify(house);
        $.post("/Customer/Search",
            {
                house: houseJosn
            },
            function (data) {
                var json = $.parseJSON(data);
                CreateHouseTable(json);
            });
    });
}

function HouseTableDoubleClick() {
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
    $("houseTabelDiv").addClass("display");
    $("#houseTable tbody").remove();
    $("#loadImg").removeClass("display");
}

//表格加载后
function AfterHouseDataLoading() {
    $("#loadImg").addClass("display");
    $("houseTabelDiv").removeClass("display");
}