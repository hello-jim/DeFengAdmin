var searchAction = "";
customerMaxCount = GetSysConf("customerMaxCount");
type = "Customer";
$(document).ready(function () {
    var customerSearchVal = $("#customerSearchObj").val();
    if (customerSearchVal != "") {
        var initCustomerObj = $.parseJSON(customerSearchVal);
        if (initCustomerObj.CustomerTransactionType != null) {
            $("#customerTransactionTypeSelect [value=" + initCustomerObj.CustomerTransactionType.ID + "]").attr("selected", "selected");
            $("#customerTransactionTypeSelect").prev().find("a span")[0].innerText = initCustomerObj.CustomerTransactionType.TypeName;
        }
        if (initCustomerObj.District != null) {
            $("#districtSelect [value=" + initCustomerObj.District.ID + "]").attr("selected", "selected");
            $("#districtSelect").prev().find("a span")[0].innerText = initCustomerObj.District.Name;
        }
        if (initCustomerObj.Area != null) {
            $("#areaSelect [value=" + initCustomerObj.Area.ID + "]").attr("selected", "selected");
            $("#areaSelect").prev().find("a span")[0].innerText = obj.Area.AreaName;
        }
        if (initCustomerObj.ResidentialDistrict) {
            $("#residentialDistrictSelect [value=" + initCustomerObj.ResidentialDistrict.ID + "]").attr("selected", "selected");
            $("#residentialDistrictSelect").prev().find("a span")[0].innerText = initCustomerObj.ResidentialDistrict.Name;
        }
        if (initCustomerObj.HouseUseType != null) {
            $("#houseUseTypeSelect [value=" + initCustomerObj.HouseUseType.ID + "]").attr("selected", "selected");
            $("#houseUseTypeSelect").prev().find("a span")[0].innerText = initCustomerObj.HouseUseType.TypeName;
        }
        $("#houseSizeFromSearchTxt").val(initCustomerObj.HouseSizeFrom);
        $("#priceFromSearchTxt").val();
        $(".pageCount").remove();
        BeforeHouseDataLoading();
        $.post("/Customer/Search",
            {
                customer: customerSearchVal
            },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateCustomerTable(json);
                searchAction = "jointSearch";
            });
    }
    InitDistrict("#districtSearchSelect", 195, "#areaSearchSelect", "", true);
    InitCustomerTransactionType("#customerTransactionTypeSearchSelect", "全部", true);
    InitCustomerStatus("#customerStatusJoinSearchSelect", "全部", true);
    InitHouseUseType("#houseUseTypeSearchSelect", "全部", true);
    InitHouseType("#houseTypeSearchSelect", "全部", true);
    InitOrientation("#orientationSearchSelect", "全部", true);
    InitCustomerType("#customerTypeSearchSelect", "全部", true);
    InitTableColChecked("CustomerTableColChecked", ".table-col-menu", false);
    InitDisplayStatus(type);
    InitTableSort("#customer-table");
    InitDelete(type);

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
    $("#customerMatchHouse").on("click", function () {
        var matchCustomer = $(".col-select.cbr-checked");
        if (matchCustomer.length > 0) {
            var matchCustomerObj = $.parseJSON($(matchCustomer[0]).parents("tr").attr("customerJson"));
            ShowMatchPanel(type);
            InitMatchData(matchCustomerObj);
        }
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
    var houseType = new Object();
    houseType.ID = $("#houseTypeSearchSelect").val();
    if (houseType.ID == 0) {
        houseType = null;
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
    var privatePublice = parseInt($("#customserPrivatePubliceSearchSelect").val());
    var salePriceFrom = $("#priceFromSearchTxt").val() != "" ? $("#priceFromSearchTxt").val() : 0;
    var salePriceTo = $("#priceToSearchTxt").val() != "" ? $("#priceToSearchTxt").val() : 0;
    var houseSizeFrom = $("#houseSizeFromSearchTxt").val() != "" ? $("#houseSizeFromSearchTxt").val() : 0;
    var houseSizeTo = $("#houseSizeToSearchTxt").val() != "" ? $("#houseSizeToSearchTxt").val() : 0;
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
    if (privatePublice == 1) {
        customer.IsPubliceCustomer = true;
    }
    else if (privatePublice == 2) {
        customer.IsPrivateCustomer = true;
    }
    customer.PriceFrom = salePriceFrom;
    customer.PriceTo = salePriceTo;
    customer.HouseSizeFrom = houseSizeFrom;
    customer.HouseSizeTo = houseSizeTo;
    customer.FloorFrom = floorFrom;
    customer.FloorTo = floorTo;
    customer.HouseType = houseType;
    return customer;
}

//客配房
function GetCustomerMatchHouseObj() {
    var house = new Object();
    //交易
    var customerTransactionType = new Object();
    customerTransactionType.ID = $("#customerTransactionTypeSelect").val();
    house.CustomerTransactionType = customerTransactionType;
    //城
    var city = new Object();
    city.ID = $("#citySelect").val();
    house.City = city;
    //区
    var district = new Object();
    district.ID = $("#districtSelect").val();
    house.District = district;
    //用途
    var houseUseType = new Object();
    houseUseType.ID = $("#houseUseTypeSelect").val() != null ? $("#houseUseTypeSelect").val() : 0;
    house.HouseUseType = houseUseType;
    //面积
    house.HouseSizeFrom = $("#houseSizeFromTxt").val() != "" ? $("#houseSizeFromTxt").val() : 0;
    house.HouseSizeTo = $("#houseSizeToTxt").val() != "" ? $("#houseSizeToTxt").val() : 0;
    //价格
    house.PriceFrom = $("#priceFromTxt").val() != "" ? $("#priceFromTxt").val() : 0;
    house.PriceTo = $("#priceToTxt").val() != "" ? $("#priceToTxt").val() : 0;
}

function GetCustomerObj() {
    var customer = new Object();
    customer.CustomerName = $("#customerNameTxt").val() != "" ? $("#customerNameTxt").val() : 0;
    customer.CustomerPhone = $("#customerPhoneTxt").val() != "" ? $("#customerPhoneTxt").val() : 0;
    customer.Contacts = $("#contactsTxt").val() != "" ? $("#contactsTxt").val() : 0;
    customer.ContactsPhone = $("#contactsPhoneTxt").val() != "" ? $("#contactsPhoneTxt").val() : 0;
    customer.IdCard = $("#idCardTxt").val() != "" ? $("#idCardTxt").val() : 0;
    customer.PresentAddress = $("#presentAddressTxt").val() != "" ? $("#presentAddressTxt").val() : 0;
    customer.ID = $("#customerID").val();
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
    customer.IsPrivateCustomer = $(".private-customer-check").hasClass("cbr-checked");
    customer.IsQualityCustomer = $(".quality-customer-check").hasClass("cbr-checked");
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
    //期限
    var entrustOverDate = new Object();
    entrustOverDate.ID = $("#entrustOverDateSelect").val() != "" ? $("#entrustOverDateSelect").val() : 0;;
    customer.EntrustOverDate = entrustOverDate;
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
    //地段
    var shopArea = new Object();
    shopArea.ID = $("#shopAreaSelect").val() != null ? $("#shopAreaSelect").val() : 0;
    customer.ShopArea = shopArea;
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
    //意向
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
        //Useless
        InitHousingLetter("#housingLetterSelect", " ", true);
        //Useless
        InitHouseQuality("#houseQualitySelect", " ", true);
        InitCustomerTransactionType("#customerTransactionTypeSelect", " ", true);
        InitCustomerStatus("#customerStatusSelect", " ", true);
        InitOfficeLevel("#officeLevelSelect", " ", true);
        InitLandType("#landTypeSelect", " ", true);
        //Useless
        InitTaxPayType("#taxPayTypeSelect", " ", true);
        InitEntrustType("#entrustTypeSelect", " ", true);
        InitSource("#sourceSelect", " ", true);
        //Useless
        InitCurrent("#currentSelect", " ", true);
        //Useless
        InitPropertyOwn("#propertyOwnSelect", " ", true);
        InitDecorationType("#decorationTypeSelect", " ", true);
        //Useless
        InitHouseDocumentType("#houseDocumentTypeSelect", " ", true);
        InitCommissionPayType("#commissionPayTypeSelect", " ", true);
        InitSupporting("#supportingSelect", " ", true);
        InitHousePayType("#housePayTypeSelect", " ", true);
        //Useless
        InitFurniture("#furnitureSelect", " ", true);
        //Useless
        InitAppliance("#applianceSelect", " ", true);
        //Useless
        InitLookHouseType("#lookHouseTypeSelect", " ", true);
        InitCarPark("#carParkSelect", " ", true);
        InitGrade("#gradeSelect", " ", true);
        InitIntention("#intentionSelect", " ", true);
        InitCountry("#nationalitySelect", " ", true);
        InitWall("#wallSelect", " ", true);
        InitLandPlan("#landPlanSelect", " ", true);
        InitShopArea("#shopAreaSelect", " ", true);
        InitShopLocation("#shopLocationSelect", " ", true);
        InitEntrustOverDate("#entrustOverDateSelect", "", true);
        $("#entrustStartDateTxt").val(DateTimeConvert_yyyyMMdd(new Date()));
        $("#addCustomer").on("click", function () {
            var customer = GetCustomerObj();
            var customerJson = JSON.stringify(customer);
            $.post("/Customer/AddCustomer",
                {
                    customer: customerJson
                }, function (data) {
                    if (data == "1") {
                        alert("success");
                        $(".customer-panel").hide();
                    }
                });
        });
    });

}

function ShowCustomerPanel(action) {
    $(".customer-panel *").unbind("click");
    $(".customer-panel-close a").on("click", function () {
        $(".customer-panel").hide();
    });
    InitCheckBox();
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

    $("#houseUseTypeSelect").on("click", function () {
        var checkHouseUseType = $("#houseUseTypeSelect").val();
        switch (checkHouseUseType) {
            //住宅
            case "1":
                $(".room").show();
                $(".hall").show();
                $(".toilet").show();
                $(".balcony").show();
                $(".shopLocation").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".floor").show();
                $(".houseType").show();
                $(".orientation").show();
                $(".decorationType").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".industry").hide();
                $(".electricity").hide();
                $(".park").hide();
                $(".layerNumber").hide();
                $(".landType").hide();
                $(".lavatory").hide();
                $(".wall").hide();
                $(".shopArea").hide();
                $(".commissionPayType").show();


                break;
                //商住
            case "2":
                $(".room").show();
                $(".hall").show();
                $(".toilet").show();
                $(".balcony").show();
                $(".shopLocation").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".floor").show();
                $(".houseType").show();
                $(".orientation").show();
                $(".decorationType").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".industry").hide();
                $(".electricity").hide();
                $(".park").hide();
                $(".layerNumber").hide();
                $(".landType").hide();
                $(".lavatory").hide();
                $(".wall").hide();
                $(".shopArea").hide();
                $(".commissionPayType").show();
                break;
                //商铺
            case "3":
                $(".shopLocation").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".industry").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".lavatory").show();
                $(".housePayType").show();
                $(".shopArea").show();
                $(".commissionPayType").show();
                $(".landType").hide();
                $(".orientation").hide();
                $(".electricity").hide();
                $(".park").hide();
                $(".floor").hide();
                $(".decorationType").hide();
                $(".wall").hide();
                $(".supporting").hide();
                break;
                //地皮
            case "4":
                $(".landPlan").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".shopLocation").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".park").show();
                $(".houseType").show();
                $(".landType").show();
                $(".wall").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".commissionPayType").show();
                $(".floor").hide();
                $(".industry").hide();
                $(".electricity").hide();
                $(".orientation").hide();
                $(".decorationType").hide();
                $(".lavatory").hide();
                $(".shopArea").hide();
                $(".layerNumber").hide();




                break;
                //其他
            case "5":
                $(".room").show();
                $(".hall").show();
                $(".toilet").show();
                $(".balcony").show();
                $(".shopLocation").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".floor").show();
                $(".houseType").show();
                $(".orientation").show();
                $(".decorationType").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".commissionPayType").show();
                $(".industry").hide();
                $(".electricity").hide();
                $(".park").hide();
                $(".layerNumber").hide();
                $(".landType").hide();
                $(".lavatory").hide();
                $(".wall").hide();
                $(".shopArea").hide();


                break;
                //写字楼
            case "6":
                $(".officeLevel").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".shopLocation").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".floor").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".lavatory").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".industry").hide();
                $(".commissionPayType").show();
                $(".electricity").hide();
                $(".park").hide();
                $(".orientation").hide();
                $(".landType").hide();
                $(".decorationType").hide();
                $(".wall").hide();
                $(".shopArea").hide();
                break;
                //网点
            case "7":
                $(".shopLocation").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".industry").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".lavatory").show();
                $(".housePayType").show();
                $(".shopArea").show();
                $(".commissionPayType").show();
                $(".landType").hide();
                $(".orientation").hide();
                $(".electricity").hide();
                $(".park").hide();
                $(".floor").hide();
                $(".decorationType").hide();
                $(".wall").hide();
                $(".supporting").hide();
                break;
                //厂房
            case "8":
                $(".workerCount").show();
                $(".dormCount").show();
                $(".officeCount").show();
                $(".clearingCount").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".shopLocation").hide();
                $(".officeLevel").hide();
                $(".landPlan").hide();

                $(".electricity").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".wall").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".commissionPayType").show();
                $(".floor").hide();
                $(".industry").hide();
                $(".park").hide();
                $(".orientation").hide();
                $(".landType").hide();
                $(".decorationType").hide();
                $(".lavatory").hide();
                $(".shopArea").hide();

                break;
                //写厂
            case "9":
                $(".officeLevel").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".shopLocation").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".floor").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".lavatory").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".industry").hide();
                $(".commissionPayType").show();
                $(".electricity").hide();
                $(".park").hide();
                $(".orientation").hide();
                $(".landType").hide();
                $(".decorationType").hide();
                $(".wall").hide();
                $(".shopArea").hide();

                break;
                //辅厂
            case "10":
                $(".shopLocation").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".industry").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".lavatory").show();
                $(".housePayType").show();
                $(".shopArea").show();
                $(".commissionPayType").show();
                $(".landType").hide();
                $(".orientation").hide();
                $(".electricity").hide();
                $(".park").hide();
                $(".floor").hide();
                $(".decorationType").hide();
                $(".wall").hide();
                $(".supporting").hide();

                break;
                //仓库
            case "11":
                $(".workerCount").show();
                $(".dormCount").show();
                $(".officeCount").show();
                $(".clearingCount").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".shopLocation").hide();
                $(".officeLevel").hide();
                $(".landPlan").hide();
                $(".electricity").show();
                $(".houseType").show();
                $(".layerNumber").show();
                $(".wall").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".commissionPayType").show();
                $(".floor").hide();
                $(".industry").hide();
                $(".park").hide();
                $(".orientation").hide();
                $(".landType").hide();
                $(".decorationType").hide();
                $(".lavatory").hide();
                $(".shopArea").hide();
                break;
                //车位
            case "12":
                $(".shopLocation").show();
                $(".room").hide();
                $(".hall").hide();
                $(".toilet").hide();
                $(".balcony").hide();
                $(".officeLevel").hide();
                $(".workerCount").hide();
                $(".dormCount").hide();
                $(".officeCount").hide();
                $(".clearingCount").hide();
                $(".landPlan").hide();
                $(".park").show();
                $(".houseType").show();
                $(".landType").show();
                $(".wall").show();
                $(".housePayType").show();
                $(".supporting").show();
                $(".commissionPayType").show();
                $(".floor").hide();
                $(".industry").hide();
                $(".electricity").hide();
                $(".orientation").hide();
                $(".decorationType").hide();
                $(".lavatory").hide();
                $(".shopArea").hide();
                $(".layerNumber").hide();

                break;

        }
    })
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
            html += "<td><div  class='cbr-replaced col-select' customerID=" + json[i].ID + "><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div></td>";
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
        pageIndexHtml += "<div class='col-md-6'><div class='dataTables_paginate paging_simple_numbers' id='example-1_paginate'><ul class='pagination'><li class='paginate_button previous page-up' aria-controls='example-1' tabindex='0' id='example-1_previous' ><a href='javascript:void(0);'>上一页</a></li>";
        pageIndexHtml += GetPageCountHtml(json[0].TotalCustomerCount, json[0].PageIndex, customerMaxCount);
        pageIndexHtml += "<li class='paginate_button page-next' aria-controls='example-1' tabindex='0' id='example-1_next'><a href='javascript:void(0);'>下一页</a></li><li class='paginate_button page-last' aria-controls='example-1' tabindex='0' id='example-1_next' ><a href='javascript:void(0);' pageIndex=" + GetTotalPageCount(json[0].TotalCustomerCount, customerMaxCount) + ">最后一页</a></li></ul></div></div></div>";
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

        var pageIndex = $(this).find("a").attr("pageIndex");
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
        BeforeHouseDataLoading();
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
        ShowCustomerPanel("editCustomer");
        var obj = $.parseJSON($(this).attr("customerJson"));
        $("#customerID").val(obj.ID);
        //客户
        $("#customerNameTxt").val(obj.CustomerName);
        //联系人
        $("#contactsTxt").val(obj.Contacts);
        //身份证
        $("#idCardTxt").val(obj.IdCard);
        //现住址
        $("#presentAddressTxt").val(obj.PresentAddress);
        //手机
        $("#contactsPhoneTxt").val(obj.ContactsPhone);
        //房
        $("#roomCountTxt").val(obj.RoomCount);
        //厅
        $("#hallCountTxt").val(obj.HallCount);
        //卫
        $("#toiletCountTxt").val(obj.ToiletCount);
        //阳台
        $("#balconyCountTxt").val(obj.BalconyCount);
        //员工数量
        $("#workerCountTxt").val(obj.WorkerCount);
        //宿舍数量
        $("#dormCountTxt").val(obj.DormCount);
        //办公室数量
        $("#officeCountTxt").val(obj.OfficeCount);
        //空地
        $("#clearingCountTxt").val(obj.ClearingCount);
        //面积From
        $("#houseSizeFromTxt").val(obj.HouseSizeFrom);
        //面积To
        $("#houseSizeToTxt").val(obj.HouseSizeTo);
        //价格From
        $("#priceFromTxt").val(obj.PriceFrom);
        //价格To
        $("#priceToTxt").val(obj.PriceTo);
        //委托日期
        $("#entrustStartDateTxt").val(DateTimeConvert_yyyyMMdd(obj.EntrustStartDate));
        //停车
        $("#parkTxt").val(obj.Park);
        //行业
        $("#industryTxt").val(obj.Industry);
        //电量
        $("#electricityTxt").val(obj.Electricity);
        //备注
        $("#remarksTxt").val(obj.Remarks);
        //楼层
        $("#floorTxt").val(obj.Floor);
        //总层
        $("#totalFloorTxt").val(obj.TotalFloor);
        $("#balconyCountTxt").val(obj.BalconyCount);

        InitCity("#citySelect", 19, "#districtSelect", "#areaSelect", false, "");
        //城
        $("#citySelect [value=" + obj.City.ID + "]").attr("selected", "selected");
        $("#citySelect").prev().find("a span")[0].innerText = obj.City.Name
        //区
        $("#districtSelect [value=" + obj.District.ID + "]").attr("selected", "selected");
        $("#districtSelect").prev().find("a span")[0].innerText = obj.District.Name
        //片区
        $("#areaSelect [value=" + obj.Area.ID + "]").attr("selected", "selected");
        $("#areaSelect").prev().find("a span")[0].innerText = obj.Area.AreaName;
        //楼盘
        InitResidentialDistrict("#residentialDistrictSelect", " ", false);
        $("#residentialDistrictSelect [value=" + obj.ResidentialDistrict.ID + "]").attr("selected", "selected");
        $("#residentialDistrictSelect").prev().find("a span")[0].innerText = obj.ResidentialDistrict.Name;
        //客户类型
        InitCustomerType("#customerTypeSelect", " ", false);
        $("#customerTypeSelect [value=" + obj.CustomerType.ID + "]").attr("selected", "selected");
        $("#customerTypeSelect").prev().find("a span")[0].innerText = obj.CustomerType.TypeName;
        //房屋使用类型
        InitHouseUseType("#houseUseTypeSelect", " ", false);
        $("#houseUseTypeSelect [value=" + obj.HouseUseType.ID + "]").attr("selected", "selected");
        $("#houseUseTypeSelect").prev().find("a span")[0].innerText = obj.HouseUseType.TypeName;
        //房屋类型
        InitHouseType("#houseTypeSelect", " ", false);
        $("#houseTypeSelect [value=" + obj.HouseType.ID + "]").attr("selected", "selected");
        $("#houseTypeSelect").prev().find("a span")[0].innerText = obj.HouseType.TypeName;
        InitOrientation("#orientationSelect", " ", false);
        InitHousingLetter("#housingLetterSelect", " ", false);
        InitHouseQuality("#houseQualitySelect", " ", false);
        //交易
        InitCustomerTransactionType("#customerTransactionTypeSelect", " ", false);
        $("#customerTransactionTypeSelect [value=" + obj.CustomerTransactionType.ID + "]").attr("selected", "selected");
        $("#customerTransactionTypeSelect").prev().find("a span")[0].innerText = obj.CustomerTransactionType.TypeName;
        //状态
        InitCustomerStatus("#customerStatusSelect", " ", false);
        $("#customerStatusSelect [value=" + obj.CustomerStatus.ID + "]").attr("selected", "selected");
        $("#customerStatusSelect").prev().find("a span")[0].innerText = obj.CustomerStatus.StatusName;
        //写字楼等级
        InitOfficeLevel("#officeLevelSelect", " ", false);
        $("#officeLevelSelect [value=" + obj.OfficeLevel.ID + "]").attr("selected", "selected");
        $("#officeLevelSelect").prev().find("a span")[0].innerText = obj.OfficeLevel.LevelName;
        //土地状况
        InitLandType("#landTypeSelect", " ", false);
        $("#landTypeSelect [value=" + obj.LandType.ID + "]").attr("selected", "selected");
        $("#landTypeSelect").prev().find("a span")[0].innerText = obj.LandType.TypeName;
        InitTaxPayType("#taxPayTypeSelect", " ", false);
        //委托方式
        InitEntrustType("#entrustTypeSelect", " ", false);
        $("#entrustTypeSelect [value=" + obj.EntrustType.ID + "]").attr("selected", "selected");
        $("#entrustTypeSelect").prev().find("a span")[0].innerText = obj.EntrustType.TypeName;
        //来源
        InitSource("#sourceSelect", " ", false);
        $("#sourceSelect [value=" + obj.Source.ID + "]").attr("selected", "selected");
        $("#sourceSelect").prev().find("a span")[0].innerText = obj.Source.SourceName;
        InitCurrent("#currentSelect", " ", false);
        InitPropertyOwn("#propertyOwnSelect", " ", false);
        //装修
        InitDecorationType("#decorationTypeSelect", " ", false);
        $("#decorationTypeSelect [value=" + obj.DecorationType.ID + "]").attr("selected", "selected");
        $("#decorationTypeSelect").prev().find("a span")[0].innerText = obj.DecorationType.TypeName;
        InitHouseDocumentType("#houseDocumentTypeSelect", " ", false);
        //配套
        InitSupporting("#supportingSelect", " ", false);
        InitMultipleSelectData("#supportingSelect", obj.Supporting);
        InitEntrustOverDate("#entrustOverDateSelect", "", false);
        $("#entrustOverDateSelect [value=" + obj.EntrustOverDate.ID + "]").attr("selected", "selected");
        $("#entrustOverDateSelect").prev().find("a span")[0].innerText = obj.EntrustOverDate.Name;
        //佣金支付
        InitCommissionPayType("#commissionPayTypeSelect", " ", false);
        $("#commissionPayTypeSelect [value=" + obj.CommissionPayType.ID + "]").attr("selected", "selected");
        $("#commissionPayTypeSelect").prev().find("a span")[0].innerText = obj.CommissionPayType.TypeName;
        //支付方式
        InitHousePayType("#housePayTypeSelect", " ", false);
        $("#housePayTypeSelect [value=" + obj.HousePayType.ID + "]").attr("selected", "selected");
        $("#housePayTypeSelect").prev().find("a span")[0].innerText = obj.HousePayType.TypeName;
        InitFurniture("#furnitureSelect", " ", false);
        InitAppliance("#applianceSelect", " ", false);
        InitLookHouseType("#lookHouseTypeSelect", " ", false);
        //停车场
        InitCarPark("#carParkSelect", " ", false);
        $("#carParkSelect [value=" + obj.CarPark.ID + "]").attr("selected", "selected");
        $("#carParkSelect").prev().find("a span")[0].innerText = obj.CarPark.Name;
        InitGrade("#gradeSelect", " ", false);
        $("#gradeSelect [value=" + obj.Grade.ID + "]").attr("selected", "selected");
        $("#gradeSelect").prev().find("a span")[0].innerText = obj.Grade.GradeName;
        //意向
        InitIntention("#intentionSelect", " ", false);
        $("#intentionSelect [value=" + obj.Intention.ID + "]").attr("selected", "selected");
        $("#intentionSelect").prev().find("a span")[0].innerText = obj.Intention.IntentionName;
        //国籍
        InitCountry("#nationalitySelect", " ", false);
        $("#nationalitySelect [value=" + obj.Nationality.ID + "]").attr("selected", "selected");
        $("#nationalitySelect").prev().find("a span")[0].innerText = obj.Nationality.ChineseName;
        //围墙
        InitWall("#wallSelect", " ", false);
        $("#wallSelect [value=" + obj.Wall.ID + "]").attr("selected", "selected");
        $("#wallSelect").prev().find("a span")[0].innerText = obj.Wall.Item;
        //规划
        InitLandPlan("#landPlanSelect", " ", false);
        $("#landPlanSelect [value=" + obj.LandPlan.ID + "]").attr("selected", "selected");
        $("#landPlanSelect").prev().find("a span")[0].innerText = obj.LandPlan.PlanName;

        //地段
        InitShopArea("#shopAreaSelect", " ", false);
        $("#shopAreaSelect [value=" + obj.ShopArea.ID + "]").attr("selected", "selected");
        $("#shopAreaSelect").prev().find("a span")[0].innerText = obj.ShopArea.ShopAreaName;
        //商铺位置
        InitShopLocation("#shopLocationSelect", " ", false);
        $("#shopLocationSelect [value=" + obj.ShopLocation.ID + "]").attr("selected", "selected");
        $("#shopLocationSelect").prev().find("a span")[0].innerText = obj.ShopLocation.Item;

        $("#editCustomer").on("click", function () {
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
                        $(".customer-panel").hide();
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

    //跟进记录
    CreateFollowRecord(obj.ID, type);
    //$("#ownerTxt").val(obj.OwnerName);
    //$("#ownerPhoneTxt").val(obj.OwnerPhone);
    //$("#contactsTxt").val(obj.Contacts);
    //$("#contactPhoneTxt").val(obj.ContactPhone);
    $("#editSave").on("click", function () {
        var customer = GetCustomerObj();
        var customerJosn = JSON.stringify(customer);
        $.post("/Customer/UpdateCustomer",
            {
                customer: customerJosn
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

function ShowFollowRecordPanel() {
    $(".follow-record-panel *").unbind("click");
    InitFollowType("#followType", "", true);
    $(".follow-record-panel").show();
    InitFollowRecord();
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

//初始化跟进记录面板事件
function InitFollowRecord() {
    $(".follow-record-panel-close").on("click", function () {
        $(".follow-record-panel").hide();
    });

    //添加
    $(".follow-record-save").on("click", function () {
        var saveBtn = this;
        $(saveBtn).attr("disabled", "disabled");
        var record = GetFollowRecordObj(type);
        var recordJson = JSON.stringify(record);
        $.post("/Customer/AddCustomerFollowRecord",
            {
                record: recordJson
            },
            function (data) {
                $(saveBtn).removeAttr("disabled");
                if (data) {
                    alert("success");
                }
            });
    });
    //编辑
    $(".follow-record-edit").on("click", function () {
        var thisObj = this;
        var record = GetFollowRecordObj(type);
        record.ID = $(thisObj).attr("recordID");
        $.post("/Customer/UpdateCustomerFollowRecord",
            {
                record: record
            },
            function (data) {
                if (data) {
                    alert("success");
                }
            });
    });
    //删除
    $(".follow-record-delete").on("click", function () {
        var thisObj = this;
        var recordID = $(thisObj).attr("recordID");
        $.post("/Customer/DeleteCustomerFollowRecord",
            {
                recordID: recordID
            },
            function (data) {
                if (data) {
                    alert("success");
                }
            });
    });
}

function HideTableCol() {
    var objArr = $(".table-col-menu .cbr-replaced:not('.cbr-checked')");
    for (var i = 0; i < objArr.length; i++) {
        $(".col" + objArr[i].attributes["col"].value).hide();
    }
}

function GetMatchObj() {
    var customer = new Object();
    var customerTransactionType = new Object();
    if (!$(".match-check[checkType=customerTransactionType]").hasClass("cbr-checked")) {
        customerTransactionType.ID = 0;
    } else {
        customerTransactionType.ID = $("#matchCustomerTransactionTypeSelect").val();
    }
    var district = new Object();
    if (!$(".match-check[checkType=district]").hasClass("cbr-checked")) {
        district.ID = 0;
    } else {
        district.ID = $("#matchDistrictSelect").val();
    }
    var area = new Object();
    if (!$(".match-check[checkType=area]").hasClass("cbr-checked")) {
        area.ID = 0;
    } else {
        area.ID = $("#matchAreaSelect").val();
    }
    var residentialDistrict = new Object();
    if (!$(".match-check[checkType=area]").hasClass("cbr-checked")) {
        residentialDistrict.ID = 0;
    } else {
        residentialDistrict.ID = $("#matchResidentialDistrictSelect").val();
    }
    var houseUseType = new Object();
    if (!$(".match-check[checkType=houseUseType]").hasClass("cbr-checked")) {
        houseUseType.ID = 0;
    } else {
        houseUseType.ID = $("#matchHouseUseTypeSelect").val();
    }
    if (!$(".match-check[checkType=houseSize]").hasClass("cbr-checked")) {
        customer.HouseSizeFrom = 0;
        customer.HouseSizeTo = 0;
    } else {
        customer.HouseSizeFrom = $("#matchHouseSizeFrom").val();
        customer.HouseSizeTo = $("#matchHouseSizeTo").val();
    }
    if (!$(".match-check[checkType=price]").hasClass("cbr-checked")) {
        customer.PriceFrom = 0;
        customer.PriceTo = 0;
    } else {
        customer.PriceFrom = $("#matchPriceFrom").val();
        customer.PriceTo = $("#matchPriceTo").val();
    }

    customer.ResidentialDistrict = residentialDistrict;
    customer.Area = area;
    customer.District = district;
    customer.CustomerTransactionType = customerTransactionType;
    customer.HouseUseType = houseUseType;
    return customer;
}

function InitMatchData(obj) {
    InitCustomerTransactionType("#matchCustomerTransactionTypeSelect", "", false);
    $("#matchCustomerTransactionTypeSelect [value=" + obj.CustomerTransactionType.ID + "]").attr("selected", "selected");
    $("#matchCustomerTransactionTypeSelect").prev().find("a span")[0].innerText = obj.CustomerTransactionType.TypeName;
    InitDistrict("#matchDistrictSelect", 195, "#matchAreaSelect", "", false, "");
    $("#matchDistrictSelect [value=" + obj.District.ID + "]").attr("selected", "selected");
    $("#matchDistrictSelect").prev().find("a span")[0].innerText = obj.District.Name;
    $("#matchAreaSelect [value=" + obj.Area.ID + "]").attr("selected", "selected");
    $("#matchAreaSelect").prev().find("a span")[0].innerText = obj.Area.AreaName;
    InitResidentialDistrict("#matchResidentialDistrictSelect", "", false);
    $("#matchResidentialDistrictSelect [value=" + obj.ResidentialDistrict.ID + "]").attr("selected", "selected");
    $("#matchResidentialDistrictSelect").prev().find("a span")[0].innerText = obj.ResidentialDistrict.Name;
    InitHouseUseType("#matchHouseUseTypeSelect", "", false);
    $("#matchHouseUseTypeSelect [value=" + obj.HouseUseType.ID + "]").attr("selected", "selected");
    $("#matchHouseUseTypeSelect").prev().find("a span")[0].innerText = obj.HouseUseType.TypeName;
    $("#matchHouseSizeFrom").val(obj.HouseSizeFrom);
    $("#matchHouseSizeTo").val(obj.HouseSizeTo);
    $("#matchPriceFrom").val(obj.PriceFrom);
    $("#matchPriceTo").val(obj.PriceTo);
}

