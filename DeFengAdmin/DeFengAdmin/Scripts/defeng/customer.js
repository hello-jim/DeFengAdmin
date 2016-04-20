$(document).ready(function () {
    $("#main-menu li").removeClass("active");
    $(".customer-menu").addClass("opened active");
    InitHouseAdd();

});

function GetEntrustStartDateObj() {
    var entrustStartDateVal = parseInt($("#entrustStartDateSearchSelect").val());
    var entrustStartDate = new Date();
    if (entrustStartDateVal == -1) {
        entrustStartDate = new Date("1900-01-01");
    } else {
        entrustStartDate.setDate(proxyStartDate.getDate() - entrustStartDateVal);
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

