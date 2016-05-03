var searchAction = "";

$(document).ready(function () {
    InitDistrict("#districtSearchSelect", 195, "#areaSearchSelect", "", true);
    InitCustomerTransactionType("#customerTransactionTypeSearchSelect", "全部", true);
    InitCustomerStatus("#customerStatusJoinSearchSelect", "全部", true);
    InitHousePayType("#houseUseTypeSearchSelect", "全部", true);
    InitHouseType("#houseTypeSearchSelect", "全部", true);
    InitOrientation("#orientationSearchSelect", "全部", true);
    InitCustomerType("#customerTypeSearchSelect", "全部", true);
    InitCustomerTableSort();
    $("#main-menu li").removeClass("active");
    $(".customer-menu").addClass("opened active");
    InitCustomerAdd();
    $("#multipleSearchItem").on("click", function () {
        $("#multipleSearchDiv").toggle(500);
    });
    $("#search").on("click", function () {
        $(".pageCount").remove();
        var customer = GetJointSearchObj();
        var customerJson = JSON.stringify(customer);
        BeforeHouseDataLoading();
        $.post(
            "/Customer/Search",
             {
                 customer: customerJson
             },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateCustomerTable(json);
                searchAction = "jointSearch";
            }
            );
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
    var customerStatus = new Object();
    customerStatus.ID = $("#customerStatusJoinSearchSelect").val();
    if (customerStatus.ID == 0) {
        customerStatus = null;
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
    customer.CustomerType = customerType;
    customer.CustomerStatus = customerStatus;
    customer.Orientation = orientation;
    customer.PriceFrom = salePriceFrom;
    customer.PriceTo = salePriceTo;
    customer.HouseSizeFrom = houseSizeFrom;
    customer.HouseSizeTo = houseSizeTo;
    customer.FloorFrom = floorFrom;
    customer.FloorTo = floorTo;
    return customer;
}

function GetCustomerObj() {
    var customer = new Object();
    customer.CustomerName = $("#customerNameTxt").val() != "" ? $("#customerNameTxt").val() : 0;
    customer.CustomerPhone = $("#customerPhoneTxt").val() != "" ? $("#customerNameTxt").val() : 0;
    customer.Contacts = $("#contactsTxt").val() != "" ? $("#contactsTxt").val() : 0;
    customer.IdCard = $("#idCardTxt").val() != "" ? $("#idCardTxt").val() : 0;
    customer.PresentAddress = $("#presentAddressTxt").val() != "" ? $("#presentAddressTxt").val() : 0;
    //交易
    var customerTransactionType = new Object();
    customerTransactionType.ID = $("#customerTransactionTypeSelect").val();
    customer.CustomerTransactionType = customerTransactionType;
    //状态
    var customerStatus = new Object();
    customerStatus.ID = $("#customerStatusSelect").val();
    customer.CustomerStatus = customerStatus;
    //城
    var city = new Object();
    city.ID = $("#citySelect").val();
    customer.City = city;
    //区
    var district = new Object();
    district.ID = $("#districtSelect").val();
    customer.District = district;
    //片区
    var area = new Object();
    area.ID = $("#areaSelect").val() != null ? $("#areaSelect").val() : 24;
    customer.Area = area;
    //楼盘
    var residentialDistrict = new Object();
    residentialDistrict.ID = $("#residentialDistrictSelect").val();
    customer.ResidentialDistrict = residentialDistrict;
    //客户需求
    var customerDemand = new Object();
    customerDemand.ID = $("#customerDemandSelect").val() != null ? $("#customerDemandSelect").val() : 0;
    customer.CustomerDemand = customerDemand;
    //客户状态
    var customerStatus = new Object();
    customerStatus.ID = $("#customerStatusSelect").val() != null ? $("#customerStatusSelect").val() : 0;
    customer.CustomerStatus = customerStatus;
    //交易
    var customerTransactionType = new Object();
    customerTransactionType.ID = $("#customerTransactionTypeSelect").val() != null ? $("#customerTransactionTypeSelect").val() : 0;
    customer.CustomerTransactionType = customerTransactionType;
    //房
    customer.RoomCount = $("#roomCountTxt").val() != "" ? $("#roomCountTxt").val() : 0;
    //厅
    customer.HallCount = $("#hallCountTxt").val() != "" ? $("#hallCountTxt").val() : 0;
    //卫
    customer.ToiletCount = $("#toiletCountTxt").val() != "" ? $("#toiletCountTxt").val() : 0;
    //阳台
    customer.BalconyCount = $("#balconyCountTxt").val() != "" ? $("#balconyCountTxt").val() : 0;
    //面积
    customer.HouseSizeFrom = $("#houseSizeFromTxt").val() != "" ? $("#houseSizeFromTxt").val() : 0;
    customer.HouseSizeTo = $("#houseSizeToTxt").val() != "" ? $("#houseSizeToTxt").val() : 0;
    //价格
    customer.PriceFrom = $("#priceFromTxt").val() != "" ? $("#priceFromTxt").val() : 0;
    customer.PriceTo = $("#priceToTxt").val() != "" ? $("#priceToTxt").val() : 0;
    //委托日期
    customer.EntrustStartDate = $("#entrustStartDateTxt").val() != "" ? $("#entrustStartDateTxt").val() : 0;
    //等级
    var grade = new Object();
    grade.ID = $("#gradeSelect").val() != null ? $("#gradeSelect").val() : 0;
    customer.Grade = grade;
    //朝向
    var orientation = new Object();
    orientation.ID = $("#orientationSelect").val();
    customer.Orientation = orientation;
    //国籍
    var nationality = new Object();
    nationality.ID = $("#nationalitySelect").val() != null ? $("#nationalitySelect").val() : 0;
    customer.Nationality = nationality;
    //委托结束日期
    customer.EntrustOverDate = $("#entrustOverDateTxt").val() != "" ? $("#entrustOverDateTxt").val() : 0;
    customer.Floor = $("#floorTxt").val() != "" ? $("#floorTxt").val() : 0;//楼层
    //装修
    var decorationType = new Object();
    decorationType.ID = $("#decorationTypeSelect").val() != null ? $("#decorationTypeSelect").val() : 0;
    customer.DecorationType = decorationType;
    //房屋类型
    var houseType = new Object();
    houseType.ID = $("#houseTypeSelect").val() != null ? $("#houseTypeSelect").val() : 0;
    customer.HouseType = houseType;
    //用途
    var houseUseType = new Object();
    houseUseType.ID = $("#houseUseTypeSelect").val() != null ? $("#houseUseTypeSelect").val() : 0;
    customer.HouseUseType = houseUseType;
    //用途
    var landPlan = new Object();
    landPlan.ID = $("#landPlanSelect").val() != null ? $("#landPlanSelect").val() : 0;
    customer.LandPlan = landPlan;
    //配套
    customer.Supporting = $("#supportingSelect").val() != null ? $("#supportingSelect").val().toString() : "0";
    //付佣
    var commissionPayType = new Object();
    commissionPayType.ID = $("#commissionPayTypeSelect").val() != null ? $("#commissionPayTypeSelect").val().toString() : "0";
    customer.CommissionPayType = commissionPayType;
    //委托方式
    var entrustType = new Object();
    entrustType.ID = $("#entrustTypeSelect").val() != null ? $("#entrustTypeSelect").val() : 0;
    customer.EntrustType = entrustType;
    //客户类型
    var customerType = new Object();
    customerType.ID = $("#customerTypeSelect").val() != null ? $("#customerTypeSelect").val() : 0;
    customer.CustomerType = customerType;
    customer.Remarks = $("#remarksTxt").val() != "" ? $("#remarksTxt").val() : 0;
    //商铺位置
    var shopLocation = new Object();
    shopLocation.ID = $("#shopLocationSelect").val() != null ? $("#shopLocationSelect").val() : 0;
    customer.ShopLocation = shopLocation;
    //行业
    customer.Industry = $("#industryTxt").val() != "" ? $("#industryTxt").val() : 0;
    //围墙
    var wall = new Object();
    wall.ID = $("#wallSelect").val() != null ? $("#wallSelect").val() : 0;
    customer.Wall = wall;
    //电量
    customer.Electricity = $("#electricityTxt").val() != "" ? $("#electricityTxt").val() : 0;
    //停车
    customer.Park = $("#parkTxt").val() != "" ? $("#parkTxt").val() : 0;
    //地皮类型
    var landType = new Object();
    landType.ID = $("#landTypeSelect").val() != null ? $("#landTypeSelect").val() : 0;
    customer.LandType = landType;
    //容纳工人数量
    customer.WorkerCount = $("#workerCountTxt").val() != "" ? $("#workerCountTxt").val() : 0;
    //宿舍数量
    customer.DormCount = $("#dormCountTxt").val() != "" ? $("#dormCountTxt").val() : 0;
    //总层
    customer.TotalFloor = $("#totalFloorTxt").val() != "" ? $("#totalFloorTxt").val() : 0;
    //办公室数量
    customer.OfficeCount = $("#officeCountTxt").val() != "" ? $("#officeCountTxt").val() : 0;
    //办公室数量
    customer.ClearingCount = $("#clearingCountTxt").val() != "" ? $("#clearingCountTxt").val() : 0;
    //办公室等级
    var officeLevel = new Object();
    officeLevel.ID = $("#officeLevelSelect").val();
    customer.OfficeLevel = officeLevel;
    //办公室等级
    var carPark = new Object();
    carPark.ID = $("#carParkSelect").val();
    customer.CarPark = carPark;
    //类型
    var current = new Object();
    current.ID = $("#currentSelect").val();
    customer.Current = current;
    //来源
    var source = new Object();
    source.ID = $("#sourceSelect").val() != null ? $("#sourceSelect").val() : 0;
    customer.Source = source;
    //现状
    var current = new Object();
    current.ID = $("#currentSelect").val() != null ? $("#currentSelect").val() : 0;
    customer.Current = current;
    //付款
    var housePayType = new Object();
    housePayType.ID = $("#housePayTypeSelect").val() != null ? $("#housePayTypeSelect").val().toString() : "0";
    customer.HousePayType = housePayType;
    //付款
    var intention = new Object();
    intention.ID = $("#intentionSelect").val() != null ? $("#intentionSelect").val().toString() : "0";
    customer.Intention = intention;
    return customer;
}

function InitCustomerAdd() {
    $(".add-customer").on("click", function () {
        ShowCustomerPanel("addCustomer");
        InitCity("#citySelect", 19, "#districtSelect", "#areaSelect", true, "");
        InitResidentialDistrict("#residentialDistrictSelect", " ", true);
        InitCustomerType("#customerTypeSelect", " ", true);
        InitHouseUseType("#houseUseTypeSelect", " ", true);
        InitHouseType("#houseTypeSelect", " ", true);
        InitOrientation("#orientationSelect", " ", true);
        InitHousingLetter("#housingLetterSelect", " ", true);
        InitHouseQuality("#houseQualitySelect", " ", true);
        InitCustomerTransactionType("#customerTransactionTypeSelect", " ", true);
        InitCustomerStatus("#customerStatusSelect", " ", true);
        InitOfficeLevel("#officeLevelSelect", " ", true);
        InitLandType("#landTypeSelect", " ", true);
        InitTaxPayType("#taxPayTypeSelect", " ", true);
        InitEntrustType("#entrustTypeSelect", " ", true);
        InitSource("#sourceSelect", " ", true);
        InitCurrent("#currentSelect", " ", true);
        InitPropertyOwn("#propertyOwnSelect", " ", true);
        InitDecorationType("#decorationTypeSelect", " ", true);
        InitHouseDocumentType("#houseDocumentTypeSelect", " ", true);
        InitCommissionPayType("#commissionPayTypeSelect", " ", true);
        InitSupporting("#supportingSelect", " ", true);
        InitHousePayType("#housePayTypeSelect", " ", true);
        InitFurniture("#furnitureSelect", " ", true);
        InitAppliance("#applianceSelect", " ", true);
        InitLookHouseType("#lookHouseTypeSelect", " ", true);
        InitCarPark("#carParkSelect", " ", true);
        InitGrade("#gradeSelect", " ", true);
        InitIntention("#intentionSelect", " ", true);
        InitCountry("#nationalitySelect", " ", true);
        InitWall("#wallSelect", " ", true);
        InitLandPlan("#landPlanSelect", " ", true);
        InitShopArea("#shopAreaSelect", " ", true);
        InitShopLocation("#shopLocationSelect", " ", true);
        $("#entrustStartDateTxt").val(DateTimeConvert_yyyyMMdd(new Date()));
        $("#addHouse").on("click", function () {
            var customer = GetCustomerObj();
            var customerJson = JSON.stringify(customer);
            $.post("/Customer/AddCustomer",
                {
                    customer: customerJson
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
        html = "";
    }
    else {
        html += "<tbody>";
        var IDPrefix = "df000";
        for (var i = 0; i < json.length; i++) {
            html += "<tr class='customer-tab-tr' houseID=" + json[i].ID + " customerJson='" + JSON.stringify(json[i]) + "'>";
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
        pageIndexHtml += "<div class='col-md-6'><div class='dataTables_paginate paging_simple_numbers' id='example-1_paginate'><ul class='pagination'><li class='paginate_button previous page-up' aria-controls='example-1' tabindex='0' id='example-1_previous' ><a href='#'>上一页</a></li>";
        pageIndexHtml += GetPageCountHtml(json[0].TotalCustomerCount, json[0].PageIndex);
        pageIndexHtml += "<li class='paginate_button page-next' aria-controls='example-1' tabindex='0' id='example-1_next'><a href='#'>下一页</a></li><li class='paginate_button page-last' aria-controls='example-1' tabindex='0' id='example-1_next' ><a href='#' pageIndex=" + json[0].TotalCustomerCount + ">最后一页</a></li></ul></div></div></div>";
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
        // $(".paginate_button.active").removeClass("active");
        // $(this).addClass("active");
        BeforeHouseDataLoading();
        var pageIndex = $(this).find("a").attr("pageIndex");
        if (pageIndex == null) {
            pageIndex = parseInt($(".paginate_button.active a").attr("pageIndex"));
            if ($(this).hasClass("page-up")) {
                if (!pageIndex <= 1) {
                    pageIndex--;
                }
            }
            if ($(this).hasClass("page-next")) {
                var totalPageLength = $(".paginate_button").length - 3;
                if (pageIndex != totalPageLength) {
                    pageIndex++;
                }
            }
        }
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
        ShowHousePanel("editCustomer");
        var obj = $.parseJSON($(this).attr("customerJson"));
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
        InitEditCustomerData(obj);
        $("#editHouse").on("click", function () {
            var thisObj = this;
            $(thisObj).attr("disabled", "disabled");
            var customer = GetCustomerObj();
            var customerJson = JSON.stringify(customer);
            $.post("/Customer/UpdateCustomer",
                {
                    customer: customerJson
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
function InitEditCustomerData(obj) {
    $(".owner-show").on("click", function () {
        $(this).hide();
        $(".owner-info").show();
        $(".follow-record").hide();
        $(".follow-record-show").show();
    });
    $(".follow-record-show").on("click", function () {
        $(this).hide();
        $(".owner-info").hide();
        $(".follow-record").show();
        $(".owner-show").show();
    });
    $("#houseID").val(obj.ID);
    var arr = { "pro": obj.Province.ID, "city": obj.City.ID, "district": obj.District.ID, "area": obj.Area.ID };

    //省
    InitProvince("#provinceSelect", "#citySelect", "#districtSelect", "#areaSelect", false, arr);
    $("#provinceSelect [value=" + obj.Province.ID + "]").attr("selected", "selected");
    $("#provinceSelect").prev().find("a span")[0].innerText = $("#provinceSelect :selected").text();
    //城
    $("#citySelect [value=" + obj.City.ID + "]").attr("selected", "selected");
    $("#citySelect").prev().find("a span")[0].innerText = $("#citySelect :selected").text();
    //区
    $("#districtSelect [value=" + obj.District.ID + "]").attr("selected", "selected");
    $("#districtSelect").prev().find("a span")[0].innerText = $("#districtSelect :selected").text();
    //片区
    $("#areaSelect [value=" + obj.Area.ID + "]").attr("selected", "selected");
    $("#areaSelect").prev().find("a span")[0].innerText = $("#areaSelect :selected").text();
    //楼盘
    $("#residentialDistrictSelect [value=" + obj.ResidentialDistrict.ID + "]").attr("selected", "selected");
    $("#residentialDistrictSelect").prev().find("a span")[0].innerText = $("#residentialDistrictSelect :selected").text();
    //栋楼位置
    $("#housePositionTxt").val(obj.HousePosition);
    //楼层
    $("#floorTxt").val(obj.Floor);
    //总层
    $("#totalFloorTxt").val(obj.TotalFloor);
    //房间
    $("#roomCountTxt").val(obj.RoomCount);
    //厅
    $("#hallCountTxt").val(obj.HallCount);
    //卫
    $("#toiletCountTxt").val(obj.ToiletCount);
    //阳台
    $("#balconyCountTxt").val(obj.BalconyCount);
    //用途
    $("#houseUseTypeSelect [value=" + obj.HouseUseType.ID + "]").attr("selected", "selected");
    $("#houseUseTypeSelect").prev().find("a span")[0].innerText = $("#houseUseTypeSelect :selected").text();
    //房源资质
    $("#houseQualitySelect [value=" + obj.HouseQuality.ID + "]").attr("selected", "selected");
    $("#houseQualitySelect").prev().find("a span")[0].innerText = $("#houseQualitySelect :selected").text();
    //面积
    $("#houseSizeTxt").val(obj.HouseSize);
    //套内
    $("#houseUseSizeTxt").val(obj.HouseUseSize);
    //朝向
    $("#orientationSelect [value=" + obj.Orientation.ID + "]").attr("selected", "selected");
    $("#orientationSelect").prev().find("a span")[0].innerText = $("#orientationSelect :selected").text();
    //类型
    $("#houseTypeSelect [value=" + obj.HouseType.ID + "]").attr("selected", "selected");
    $("#houseTypeSelect").prev().find("a span")[0].innerText = $("#houseTypeSelect :selected").text();
    //盘符
    $("#housingLetterSelect [value=" + obj.HousingLetter.ID + "]").attr("selected", "selected");
    $("#housingLetterSelect").prev().find("a span")[0].innerText = $("#housingLetterSelect :selected").text();
    //交易
    $("#transactionTypeSelect [value=" + obj.TransactionType.ID + "]").attr("selected", "selected");
    $("#transactionTypeSelect").prev().find("a span")[0].innerText = $("#transactionTypeSelect :selected").text();
    //状态
    $("#houseStatusSelect [value=" + obj.HouseStatus.ID + "]").attr("selected", "selected");
    $("#houseStatusSelect").prev().find("a span")[0].innerText = $("#houseStatusSelect :selected").text();
    //销售总价
    $("#saleTotalPriceTxt").val(obj.SaleTotalPrice);
    //底价
    $("#minSalePriceTxt").val(obj.MinSalePrice);
    //税费支付类型
    $("#taxPayTypeSelect [value=" + obj.TaxPayType.ID + "]").attr("selected", "selected");
    $("#taxPayTypeSelect").prev().find("a span")[0].innerText = $("#taxPayTypeSelect :selected").text();
    //租价
    $("#leaseTotalPriceTxt").val(obj.LeaseTotalPrice);
    //底价
    $("#minLeasePriceTxt").val(obj.MinLeasePrice);
    //委托方式
    $("#entrustTypeSelect [value=" + (obj.EntrustType != null ? obj.EntrustType.ID : 0) + "]").attr("selected", "selected");
    $("#entrustTypeSelect").prev().find("a span")[0].innerText = $("#entrustTypeSelect :selected").text();
    //交房日期
    $("#submitHouseDate").val(DateTimeConvert_yyyyMMdd(obj.SubmitHouseDate));
    //管理费
    $("#managementPriceTxt").val(obj.ManagementPrice);
    //委托编号
    $("#entrustIDTxt").val(obj.EntrustID);
    //来源
    $("#sourceSelect [value=" + (obj.Source != null ? obj.Source.ID : 0) + "]").attr("selected", "selected");
    $("#sourceSelect").prev().find("a span")[0].innerText = $("#sourceSelect :selected").text();
    //现状
    $("#currentSelect [value=" + (obj.Current != null ? obj.Current.ID : 0) + "]").attr("selected", "selected");
    $("#currentSelect").prev().find("a span")[0].innerText = $("#currentSelect :selected").text();
    //产权
    $("#propertyOwnSelect [value=" + (obj.PropertyOwn != null ? obj.PropertyOwn.ID : 0) + "]").attr("selected", "selected");
    $("#propertyOwnSelect").prev().find("a span")[0].innerText = $("#propertyOwnSelect :selected").text();
    //装修
    $("#decorationTypeSelect [value=" + (obj.DecorationType != null ? obj.DecorationType.ID : 0) + "]").attr("selected", "selected");
    $("#decorationTypeSelect").prev().find("a span")[0].innerText = $("#decorationTypeSelect :selected").text();
    //证件
    $("#houseDocumentTypeSelect [value=" + (obj.HouseDocumentType != null ? obj.HouseDocumentType.ID : 0) + "]").attr("selected", "selected");
    $("#houseDocumentTypeSelect").prev().find("a span")[0].innerText = $("#houseDocumentTypeSelect :selected").text();
    //配套
    InitMultipleSelectData("#supportingSelect", obj.Supporting.ItemValue);
    //付款
    $("#housePayTypeSelect [value=" + (obj.HousePayType != null ? obj.HousePayType.ID : 0) + "]").attr("selected", "selected");
    $("#housePayTypeSelect").prev().find("a span")[0].innerText = $("#housePayTypeSelect :selected").text();
    //家具
    $("#furnitureSelect [value=" + (obj.Furniture != null ? obj.Furniture.ID : 0) + "]").attr("selected", "selected");
    $("#furnitureSelect").prev().find("a span")[0].innerText = $("#furnitureSelect :selected").text();
    //付佣
    $("#commissionPayTypeSelect [value=" + (obj.CommissionPayType != null ? obj.CommissionPayType.ID : 0) + "]").attr("selected", "selected");
    $("#commissionPayTypeSelect").prev().find("a span")[0].innerText = $("#commissionPayTypeSelect :selected").text();
    //家电
    $("#applianceSelect [value=" + (obj.Appliance != null ? obj.Appliance.ID : 0) + "]").attr("selected", "selected");
    $("#applianceSelect").prev().find("a span")[0].innerText = $("#applianceSelect :selected").text();
    //看房
    $("#lookHouseTypeSelect [value=" + (obj.LookHouseType != null ? obj.LookHouseType.ID : 0) + "]").attr("selected", "selected");
    $("#lookHouseTypeSelect").prev().find("a span")[0].innerText = $("#lookHouseTypeSelect :selected").text();
    //跟进记录
    CreateFollowRecord(obj.ID);
    $("#ownerTxt").val(obj.OwnerName);
    $("#ownerPhoneTxt").val(obj.OwnerPhone);
    $("#contactsTxt").val(obj.Contacts);
    $("#contactPhoneTxt").val(obj.ContactPhone);
    $("#editSave").on("click", function () {
        var house = GetHouseObj();
        var houseJosn = JSON.stringify(house);
        $.post("/House/UpdateHouse",
            {
                house: houseJosn
            }, function (data) {

            });
    });
}

//房源面板
function ShowHousePanel(action) {
    $(".customer-panel *").unbind("click");
    //InitHousePanelClose();
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
    if (action == "editCustomer") {
        $("#fileUp").show();
        $(".follow-record-panel-show").show();
        var recordBtnIsShow = $(".follow-record-show").css("display") == "inline-block";
        if (recordBtnIsShow) {
            $(".owner-show").hide();
        }
        $("#addHouse").hide();
        var houseID = $("#houseID").val();
    } else {
        $("#fileUp").hide();
        $(".follow-record-panel-show").hide();
        $(".owner-show").hide();
        $("#addHouse").show();
    }
    $("#" + action + "").removeClass("display");
    $(".follow-record-panel-show").on("click", function () {
        $(".follow-record-panel").css("top", scrollTop + 500 + "px");
        ShowFollowRecordPanel();
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
    var active = "active";
    html += "<li class='paginate_button " + (activeIndex == 1 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=1>1</a></li>";
    html += "<li class='paginate_button " + (activeIndex == 2 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=2>2</a></li>";
    if (activeIndex > 5) {
        html += "<li><a href='javascript:void()'>.......</a><li/>";
        html += "<li class='paginate_button " + (activeIndex == 2 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex - 1) + ">" + (activeIndex - 1) + "</a></li>"
        html += "<li class='paginate_button active' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + activeIndex + ">" + activeIndex + "</a></li>"
        html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 1) + ">" + (activeIndex + 1) + "</a></li>"
        html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 2) + ">" + (activeIndex + 2) + "</a></li>"
        html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 3) + ">" + (activeIndex + 3) + "</a></li>"
    }
    else {
        html += "<li class='paginate_button " + (activeIndex == 3 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=3>3</a></li>"
        html += "<li class='paginate_button " + (activeIndex == 4 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=4>4</a></li>"
        html += "<li class='paginate_button " + (activeIndex == 5 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=5>5</a></li>"
        html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=6>6</a></li>"
        html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=7>7</a></li>"
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
