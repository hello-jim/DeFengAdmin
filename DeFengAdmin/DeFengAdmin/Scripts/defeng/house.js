var searchAction = "";

$(document).ready(function () {
    $("#main-menu li").removeClass("active");
    $(".house-menu").addClass("opened active");
    InitProvince("#provinceSearchSelect", "#citySearchSelect", "#districtSearchSelect", "#areaSearchSelect", true);
    InitTransactionType("#transactionTypeSearchSelect", "全部", true);
    InitHouseUseType("#houseUseTypeSearchSelect", "全部", true);
    InitOrientation("#orientationSearchSelect", "全部", true);
    InitHouseType("#houseTypeSearchSelect", "全部", true);
    InitHouseStatus("#houseStatusJoinSearchSelect", "全部", true);//联合搜索
    InitHouseStatus("#houseStatusSearchSelect", "全部", true);
    HouseAdd();
    InitFileUp();
    InitHouseTableSort();
    InitTableColChecked("HouseTableColChecked", ".table-col-menu", false);
    InitDisplayStatus();
    InitHouseDelete();
    $("#search").on("click", function () {
        $(".pageCount").remove();
        var house = GetJointSearchObj();
        var houseJson = JSON.stringify(house);
        BeforeHouseDataLoading();
        $.post(
            "/House/SearchHouse",
             {
                 house: houseJson
             },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateHouseTable(json);
                searchAction = "jointSearch";
            }
            );
    });

    $("#multipleSearchItem").on("click", function () {
        $("#multipleSearchDiv").toggle(500);
    });

    $("#proxyStartDateSearchSelect").on("change", function () {
        $(".pageCount").remove();
        var house = GetProxyStartDateObj();
        var houseJson = JSON.stringify(house);
        BeforeHouseDataLoading();
        $.post("/House/SearchHouse",
               {
                   house: houseJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateHouseTable(json);
                searchAction = "proxyStartDate";
            });
    });

    $("#houseSaleDateSearchSelect").on("change", function () {
        $(".pageCount").remove();
        var house = GetSaleHouseDateObj();
        var houseJson = JSON.stringify(house);
        BeforeHouseDataLoading();
        $.post("/House/SearchHouse",
               {
                   house: houseJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateHouseTable(json);
                searchAction = "houseSaleDate";
            });
    });

    $("#houseLeaseDateSearchSelect").on("change", function () {
        $(".pageCount").remove();
        var house = GetHouseLeaseDateObj();
        var houseJson = JSON.stringify(house);
        BeforeHouseDataLoading();
        $.post("/House/SearchHouse",
               {
                   house: houseJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateHouseTable(json);
                searchAction = "houseLeaseDate";
            });
    });

    $("#houseStatusSearchSelect").on("change", function () {
        $(".pageCount").remove();
        var house = GetHouseStatusObj();
        var houseJson = JSON.stringify(house);
        BeforeHouseDataLoading();
        $.post("/House/SearchHouse",
               {
                   house: houseJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateHouseTable(json);
                searchAction = "houseStatus";
            });
    });

    $("#houseQualitySearchSelect").on("change", function () {
        $(".pageCount").remove();
        var house = GetHouseQualityObj();
        var houseJson = JSON.stringify(house);
        BeforeHouseDataLoading();
        $.post("/House/SearchHouse",
               {
                   house: houseJson
               },
            function (data) {
                var json = "";
                if (data != "") {
                    json = $.parseJSON(data);
                }
                CreateHouseTable(json);
                searchAction = "houseQuality";
            });
    });
});

function CreateHouseTable(json) {
    var html = "";
    if (json == "") {
        html += "没有数据";
    }
    else {
        html += "<tbody>";
        var IDPrefix = "df000";
        for (var i = 0; i < json.length; i++) {
            html += "<tr class='houseTabTr' houseID=" + json[i].ID + " houseJson='" + JSON.stringify(json[i]) + "'>";
            html += "<td><div  class='cbr-replaced col-select' houseID=" + json[i].ID + "><div class='cbr-input'><input type='checkbox' class='cbr cbr-done col-checked'></div><div class='cbr-state'><span></span></div></div></td>";
            html += "<td class='colHouseID'>" + IDPrefix + json[i].ID + "</td>";
            html += "<td class='colTransactionType' transactionTypeID='" + json[i].TransactionType.ID + "'>" + json[i].TransactionType.TransactionTypeName + "</td>";
            html += "<td class='colDistrict' districtID='" + json[i].District.ID + "'>" + json[i].District.Name + "</td>";
            html += "<td class='colArea' areaID='" + json[i].Area.ID + "'>" + json[i].Area.AreaName + "</td>";
            html += "<td class='colResidentialDistrict' colResidentialDistrictID='" + json[i].ResidentialDistrict.ID + "'>" + json[i].ResidentialDistrict.Name + "</td>";
            html += "<td class='colResidentialDistrictAddr'>" + json[i].ResidentialDistrict.Address + "</td>";
            html += "<td class='colHousePosition'>" + json[i].HousePosition + "</td>";
            html += "<td class='colHouseNumber'>" + json[i].HouseNumber + "</td>";
            html += "<td class='colTotalFloor'>" + json[i].TotalFloor + "</td>";
            html += "<td class='colHouseType1'>" + GetHouseType1(json[i].RoomCount, json[i].HallCount, json[i].ToiletCount, json[i].BalconyCount) + "</td>";
            html += "<td class='colHouseSize'>" + json[i].HouseSize + "</td>";
            html += "<td class='colHouseUseSize'>" + json[i].HouseUseSize + "</td>";
            html += "<td class='colOrientation' colOrientationID='" + json[i].Orientation.ID + "'>" + json[i].Orientation.OrientationName + "</td>";
            html += "<td class='colSaleTotalPrice'>" + json[i].SaleTotalPrice + "</td>";
            html += "<td class='colSaleUnitPrice'>" + GetHouseUnitPrice(json[i].SaleTotalPrice, json[i].HouseSize) + "</td>";
            html += "<td class='colLeaseTotalPrice'>" + json[i].LeaseTotalPrice + "</td>";
            html += "<td class='colLeaseUnitPrice'>" + GetHouseUnitPrice(json[i].LeaseTotalPrice, json[i].HouseSize) + "</td>";
            html += "<td class='colProxyStartDate'>" + DateTimeConvert_yyyyMMdd(json[i].ProxyStartDate) + "</td>";
            html += "<td class='colLookHouseType' colLookHouseTypeID='" + json[i].LookHouseType.ID + "'>" + json[i].LookHouseType.TypeName + "</td>";
            html += "<td class='colDepartment'>" + "暂无" + "</td>";
            html += "<td class='colStaff'>" + "暂无" + "</td>";
            html += "<td class='colHouseStatus' colHouseStatusID='" + json[i].HouseStatus.ID + "'>" + json[i].HouseStatus.StatusName + "</td>";
            html += "<td class='colHousingLetter' colHousingLetterID='" + json[i].HousingLetter.ID + "'>" + json[i].HousingLetter.LetterName + "</td>";
            html += "<td class='colHouseSource'>" + json[i].Source.SourceName + "</td>";
            // html += "<td class='colImgCount'>" + "暂无" + "</td>";
            html += "<td class='colLastFollowDate'>" + DateTimeConvert_yyyyMMdd(json[i].LastFollowDate) + "</td>";
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

    $("#houseTable").append(html);
    $("#houseTabelDiv").append(pageIndexHtml);
    InitPageIndex();
    HouseTableDoubleClick();
    HideTableCol();
    InitTableColSelect();
    AfterHouseDataLoading();
}

function GetHouseUnitPrice(totalPrice, size) {
    return totalPrice / size;
}

function GetHouseType1(roomCount, hallCount, toiletCount, balconyCount) {
    return roomCount + "-" + hallCount + "-" + toiletCount + "-" + balconyCount;
}

function GetPageCountHtml(totalLength, activeIndex) {
    var houseMaxCount = GetSysConf("houseMaxCount");
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

//获取系统配置


function InitPageIndex() {
    $(".paginate_button").on("click", function () {
        $(".paginate_button.active").removeClass("active");
        $(this).addClass("active");
        BeforeHouseDataLoading();
        var pageIndex = $(".paginate_button.active a").attr("pageIndex");
        $(".pageCount").remove();
        var house = new Object();
        switch (searchAction) {
            case "proxyStartDate":
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
        $.post("/House/SearchHouse",
            {
                house: houseJosn
            },
            function (data) {
                var json = $.parseJSON(data);
                CreateHouseTable(json);
            });
    });
}

function GetSaleHouseDateObj() {
    var transactionType = new Object();
    transactionType.ID = 2;

    var houseSaleDateVal = parseInt($("#houseSaleDateSearchSelect").val());
    var proxyStartDate = new Date();
    if (houseSaleDateVal == -1) {
        proxyStartDate = new Date("1900-01-01");
    } else {
        proxyStartDate.setDate(proxyStartDate.getDate() - houseSaleDateVal);
    }

    var house = new Object();
    house.TransactionType = transactionType;
    house.proxyStartDate = proxyStartDate;

    return house;
}

function GetProxyStartDateObj() {
    var proxyStartDateVal = parseInt($("#proxyStartDateSearchSelect").val());
    var proxyStartDate = new Date();
    if (proxyStartDateVal == -1) {
        proxyStartDate = new Date("1900-01-01");
    } else {
        proxyStartDate.setDate(proxyStartDate.getDate() - proxyStartDateVal);
    }
    var house = new Object();
    house.ProxyStartDate = proxyStartDate;

    return house;
}

function GetHouseLeaseDateObj() {
    var transactionType = new Object();
    transactionType.ID = 1;

    var houseLeaseDateVal = parseInt($("#houseLeaseDateSearchSelect").val());
    var proxyStartDate = new Date();
    if (transactionType.ID == -1) {
        proxyStartDate = new Date("1900-01-01");
    } else {
        proxyStartDate.setDate(proxyStartDate.getDate() - houseLeaseDateVal);
    }

    var house = new Object();
    house.TransactionType = transactionType;
    house.proxyStartDate = proxyStartDate;

    return house;
}

function GetHouseStatusObj() {
    var houseStatus = new Object();
    houseStatus.ID = $("#houseStatusSearchSelect").val();
    var house = new Object();
    house.HouseStatus = houseStatus;
    return house;
}

function GetHouseQualityObj() {
    var houseQuality = new Object();
    houseQuality.ID = $("#houseQualitySearchSelect").val();

    var house = new Object();
    house.HouseQuality = houseQuality;

    return house;
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
    var transactionType = new Object();
    transactionType.ID = $("#transactionTypeSearchSelect").val();
    if (transactionType.ID == 0) {
        transactionType = null;
    }
    var houseType = new Object();
    houseType.ID = $("#houseTypeSearchSelect").val();
    if (houseType.ID == 0) {
        houseType = null;
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
    var house = new Object();
    house.District = district;
    house.Area = area;
    house.HouseUseType = houseUseType;
    house.TransactionType = transactionType;
    house.HouseType = houseType;
    house.Orientation = orientation;
    house.SalePriceFrom = salePriceFrom;
    house.SalePriceTo = salePriceTo;
    house.HouseSizeFrom = houseSizeFrom;
    house.HouseSizeTo = houseSizeTo;
    house.FloorFrom = floorFrom;
    house.FloorTo = floorTo;
    return house;
}

function GetObjArrVal(arr) {
    var result = "";
    for (var i = 0; i < arr.length; i++) {
        result += arr[i].value + ",";
    }
    result = result.substring(0, result.lastIndexOf(','));
    result = result != "" ? result : "";
    return result;
}

function HouseTableDoubleClick() {
    $(".houseTabTr").on("dblclick", function () {
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

function GetHouseObj() {
    var house = new Object();
    house.ID = $("#houseID").val();
    var province = new Object();
    province.ID = $("#provinceSelect").val();
    house.Province = province;
    //城
    var city = new Object();
    city.ID = $("#citySelect").val();
    house.City = city;
    //区
    var district = new Object();
    district.ID = $("#districtSelect").val();
    house.District = district;
    //片区
    var area = new Object();
    area.ID = $("#areaSelect").val() != null ? $("#areaSelect").val() : 24;
    house.Area = area;
    //楼盘
    var residentialDistrict = new Object();
    residentialDistrict.ID = $("#residentialDistrictSelect").val();
    house.ResidentialDistrict = residentialDistrict;
    //栋楼位置
    house.HousePosition = $("#housePositionTxt").val();
    //房号
    house.HouseNumber = $("#houseNumberTxt").val();
    //楼层
    house.Floor = $("#floorTxt").val() != "" ? $("#floorTxt").val() : 0;
    //总层
    house.TotalFloor = $("#totalFloorTxt").val() != "" ? $("#totalFloorTxt").val() : 0;
    //房间
    house.RoomCount = $("#roomCountTxt").val() != "" ? $("#roomCountTxt").val() : 0;
    //厅
    house.HallCount = $("#hallCountTxt").val() != "" ? $("#hallCountTxt").val() : 0;
    //卫
    house.ToiletCount = $("#toiletCountTxt").val() != "" ? $("#toiletCountTxt").val() : 0;
    //阳台
    house.BalconyCount = $("#balconyCountTxt").val() != "" ? $("#balconyCountTxt").val() : 0;
    //用途
    var houseUseType = new Object();
    houseUseType.ID = $("#houseUseTypeSelect").val() != null ? $("#houseUseTypeSelect").val() : 0;
    house.HouseUseType = houseUseType;
    //房源资质
    var houseQuality = new Object();
    houseQuality.ID = $("#houseQualitySelect").val();
    house.HouseQuality = houseQuality;
    //面积
    house.HouseSize = $("#houseSizeTxt").val() != "" ? $("#houseSizeTxt").val() : 0;
    //套内
    house.HouseUseSize = $("#houseUseSizeTxt").val() != "" ? $("#houseUseSizeTxt").val() : 0;
    //朝向
    var orientation = new Object();
    orientation.ID = $("#orientationSelect").val();
    house.Orientation = orientation;
    //类型
    var houseType = new Object();
    houseType.ID = $("#houseTypeSelect").val();
    house.HouseType = houseType;
    //盘符
    var housingLetter = new Object();
    housingLetter.ID = $("#housingLetterSelect").val();
    house.HousingLetter = housingLetter;
    //交易
    var transactionType = new Object();
    transactionType.ID = $("#transactionTypeSelect").val();
    house.TransactionType = transactionType;
    //状态
    var houseStatus = new Object();
    houseStatus.ID = $("#houseStatusSelect").val();
    house.HouseStatus = houseStatus;
    //销售总价
    house.SaleTotalPrice = $("#saleTotalPriceTxt").val() != "" ? $("#saleTotalPriceTxt").val() : 0;
    //底价
    house.MinSalePrice = $("#minSalePriceTxt").val() != "" ? $("#minSalePriceTxt").val() : 0;
    //税费支付类型
    var taxPayType = new Object();
    taxPayType.ID = $("#taxPayTypeSelect").val();
    house.TaxPayType = taxPayType;
    //租价
    house.LeaseTotalPrice = $("#leaseTotalPriceTxt").val() != "" ? $("#leaseTotalPriceTxt").val() : 0;
    //底价
    house.MinLeasePrice = $("#minLeasePriceTxt").val() != "" ? $("#minLeasePriceTxt").val() : 0;
    //委托方式
    var entrustType = new Object();
    entrustType.ID = $("#entrustTypeSelect").val() != null ? $("#entrustTypeSelect").val() : 0;
    house.EntrustType = entrustType;
    //管理费
    house.ManagementPrice = $("#managementPriceTxt").val() != "" ? $("#managementPriceTxt").val() : 0;
    //交房日期
    house.SubmitHouseDate = $("#submitHouseDate").val();
    //委托编号
    house.EntrustID = $("#entrustIDTxt").val();
    //来源
    var source = new Object();
    source.ID = $("#sourceSelect").val() != null ? $("#sourceSelect").val() : 0;
    house.Source = source;
    //现状
    var current = new Object();
    current.ID = $("#currentSelect").val() != null ? $("#currentSelect").val() : 0;
    house.Current = current;
    //产权
    var propertyOwn = new Object();
    propertyOwn.ID = $("#propertyOwnSelect").val() != null ? $("#propertyOwnSelect").val() : 0;
    house.PropertyOwn = propertyOwn;
    //装修
    var decorationType = new Object();
    decorationType.ID = $("#decorationTypeSelect").val() != null ? $("#decorationTypeSelect").val() : 0;
    house.DecorationType = decorationType;
    //证件
    var houseDocumentType = new Object();
    houseDocumentType.ID = $("#houseDocumentTypeSelect").val() != null ? $("#houseDocumentTypeSelect").val() : 0;
    house.HouseDocumentType = houseDocumentType;
    //配套
    house.Supporting = $("#supportingSelect").val() != null ? $("#supportingSelect").val().toString() : "0";
    //付款
    var housePayType = new Object();
    housePayType.ID = $("#housePayTypeSelect").val() != null ? $("#housePayTypeSelect").val().toString() : "0";
    house.HousePayType = housePayType;
    //家具
    var furniture = new Object();
    furniture.ID = $("#furnitureSelect").val() != null ? $("#furnitureSelect").val().toString() : "0";
    house.Furniture = furniture;
    //付佣
    var commissionPayType = new Object();
    commissionPayType.ID = $("#commissionPayTypeSelect").val() != null ? $("#commissionPayTypeSelect").val().toString() : "0";
    house.CommissionPayType = commissionPayType;
    //家电
    var appliance = new Object();
    appliance.ID = $("#applianceSelect").val() != null ? $("#applianceSelect").val().toString() : "0";
    house.Appliance = appliance;
    //看房
    var lookHouseType = new Object();
    lookHouseType.ID = $("#lookHouseTypeSelect").val() != null ? $("#lookHouseTypeSelect").val().toString() : "0";
    house.LookHouseType = lookHouseType;
    return house;
}

//初始化编辑房源
function InitEditHouseData(obj) {
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

//初始化添加房源
function HouseAdd() {
    $("#addHousePanel").on("click", function () {
        ShowHousePanel("addHouse");
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

//房源面板
function ShowHousePanel(action) {
    $(".housePanelDiv *").unbind("click");
    InitHousePanelClose();
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
    $(".housePanelDiv").show();
    var scrollTop = $(document).scrollTop();
    $(".housePanelDiv").css("top", scrollTop + 400 + "px");
    if (action == "editHouse") {
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

//初始化图片上传
function InitFileUp() {
    $("#fileUp").on("click", function () {
        $(".img-panel-close").on("click", function () {
            $(".imgPanellDiv").hide();
        });

        $("input[name='houseID']").val($("#houseID").val());
        $(".imgPanellDiv").removeClass("display");
        var scrollTop = $(document).scrollTop();
        $(".imgPanellDiv").css("top", scrollTop + 50 + "px");
        var id = $("#houseID").val();
        $.ajax({
            url: "/House/LoadHouseImages",
            data: { houseID: id },
            success: function (data) {
                if (data != "") {
                    var json = $.parseJSON(data);
                    var imagesHtml = "<div class='col-sm-9 gallery-right'><div class='album-images row'>";
                    for (var i = 0; i < json.length; i++) {
                        imagesHtml += "<div class='col-md-3 col-sm-4 col-xs-6 img-div'>";
                        imagesHtml += "<div class='album-image'>";
                        imagesHtml += "<a href='#' class='thumb' data-action='edit'>";
                        imagesHtml += "<img src='/Content/images/house/imgID_" + json[i].ID + "_" + json[i].FileName + "' class='img-responsive'  style='height:200px;width:200px;'/>";
                        imagesHtml += "</a>";
                        imagesHtml += "<a href='#' class='name'>";
                        imagesHtml += "<span>" + json[i].FileName + "</span>";
                        imagesHtml += "<em></em>";
                        imagesHtml += "</a>";
                        imagesHtml += "<div class='image-options'>";
                        imagesHtml += "<a href='#' data-action='trash'><i class='fa-trash img-delete' imgID=" + json[i].ID + "></i></a>";
                        imagesHtml += "</div>";
                        imagesHtml += "</div>";
                        imagesHtml += "</div>";
                    }
                    imagesHtml += "</div></div>"
                    $(".album-images").html(imagesHtml);
                    $(".img-delete").on("click", function () {
                        var thisObj = this;
                        var imgID = $(thisObj).attr("imgID");
                        $.post("/House/DeleteHouseImage",
                            {
                                imgID: imgID
                            },
                            function (data) {
                                if (data) {
                                    $(thisObj).parents(".img-div").remove();
                                }
                            });

                    });
                }
            }
        });
    });
}

function InitHousePanelClose() {
    $("#houserPanelClose").on("click", function () {
        $(".housePanelDiv").hide();
    });
}

//表格排序
function InitHouseTableSort() {
    $("#houseTable th").on("click", function () {
        var trArr = "";
        var sortCol = $(this).attr("class");
        var sortType = $(this).attr("sortType");
        var isFirstClick = sortType == null;
        if (isFirstClick || sortType == "Asc") {
            trArr = TableAscSort(sortCol);
            $(this).attr("sortType", "Desc");
        } else {
            trArr = TableDescSort(sortCol);
            $(this).attr("sortType", "Asc");
        }
        $("#houseTable tbody tr").remove();
        $("#houseTable tbody").append(trArr);
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

//列显示状态
function InitDisplayStatus() {
    $(".table-col-Select").on("click", function () {
        $(".table-col-menu").toggle();
    });
    $(".cbr-replaced").on("click", function () {
        var thisObj = $(this);
        var checked = $(thisObj).hasClass("cbr-checked");
        var col = $(thisObj).attr("col");
        if (checked) {
            $(".col" + col).hide();
            $(thisObj).removeClass("cbr-checked");
        }
        else {
            $(".col" + col).show();
            $(thisObj).addClass("cbr-checked");
        }
        var colID = $(thisObj).attr("colID");
        var status = $(thisObj).hasClass("cbr-checked");
        $.post("/Common/ChangeHouseTableColStatus",
            {
                id: colID,
                status: status
            },
            function (data) {

            });
    });
}

function InitTableColSelect() {
    $("#houseTable tbody .col-select").on("click", function () {
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


function InitHouseDelete() {
    $("#deleteHouse").on("click", function () {
        var objArr = $(".col-select.cbr-checked");
        var idArr = new Array();
        for (var i = 0; i < objArr.length; i++) {
            idArr.push(objArr[i].attributes["houseID"].value);
        }
        $.post("/House/DeleteHouse",
            {
                idArr: idArr
            },
            function (data) {
                if (data) {
                    $(".col-select.cbr-checked").parents("tr").remove();
                }
            });
    });
}

//初始化跟进记录面板
function InitFollowRecord() {
    $(".follow-record-panel-close").on("click", function () {
        $(".follow-record-panel").hide();
    });

    //添加
    $(".follow-record-save").on("click", function () {
        var saveBtn = this;
        $(saveBtn).attr("disabled", "disabled");
        var record = GetFollowRecordObj();
        var recordJson = JSON.stringify(record);
        $.post("/House/AddHouseFollowRecord",
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
        var record = GetFollowRecordObj();
        record.ID = $(thisObj).attr("recordID");
        $.post("",
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
        $.post("",
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

//获取跟进记录
function GetFollowRecordObj() {
    var record = new Object();
    var followType = new Object();
    followType.ID = $("#followType").val() != null ? $("#followType").val() : 0;
    var followStaff = new Object();
    followStaff.ID = $("#followStaff").val() != null ? $("#followStaff").val() : 0;
    var followDepartment = new Object();
    followDepartment.ID = $("#followDepartment").val() != null ? $("#followDepartment").val() : 0;
    var followContent = $("#followContent").val();
    record.FollowType = followType;
    record.FollowStaff = followStaff;
    record.FollowDepartment = followDepartment;
    record.FollowContent = followContent;
    record.HouseID = $(".housePanelDiv .panel input[id=houseID]").val();
    return record;
}

function ShowFollowRecordPanel() {
    $(".follow-record-panel *").unbind("click");
    InitFollowType("#followType", "", true);
    $(".follow-record-panel").show();
    InitFollowRecord();
}

function CreateFollowRecord(houseID) {
    $.ajax(
           {
               url: "/House/LoadHouseFollowRecord",
               data: { houseID: houseID },
               success: function (data) {
                   var json = $.parseJSON(data);
                   var html = "";
                   for (var i = 0; i < json.length; i++) {
                       html += "<tr>"
                       html += "<td style='width:70%;'>" + json[i].FollowContent + "</td>";
                       html += "<td style='width:15%;'>暂无</td>";
                       html += "<td style='width:15%;'>" + DateTimeConvert_yyyyMMddhhmm(json[i].CreateDate) + "</td>";
                       html += "</tr>";
                   }
                   $(".follow-record div table").html(html);
               }
           });

}