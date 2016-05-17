function GetSysConf(key) {
    var value = "";
    $.ajax({
        url: "/Common/GetSysConf",
        data: { key: key },
        async: false,
        success: function (data) {
            value = data;
        }
    });
    return value;
}

///初始化省
function InitProvince(id, cityID, districtID, areaID, async, arr) {
    $.ajax({
        url: "/Common/LoadProvince",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            var selectedValue = $.cookie("provinceID");
            if (arr != null) {
                selectedValue = arr["pro"];
            }
            for (var i = 0; i < json.length; i++) {
                var selected = "";
                if (json[i].ID == selectedValue) {
                    selected = "selected=selected";
                }
                html += "<option value=" + json[i].ID + " " + selected + ">" + json[i].Name + "</option>";
            }
            $(id).html(html);
            var proIsEmpty = $("" + id + " option").length < 1;
            if (selectedValue != null || !proIsEmpty) {
                InitCity(cityID, id, districtID, areaID, async, arr);
            }
            $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
            $(id).on("change", function () {
                InitCity(cityID, id, districtID, areaID, async, "");
                $.cookie("provinceID", $(this).val());
            })
        }
    });
}

//初始化市
function InitCity(id, proID, districtID, areaID, async, arr) {
    // var proID = $(proID).val();
    $.ajax({
        url: "/Common/LoadCity",
        data: { proID: proID },
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var selectedValue = $.cookie("cityID");
            if (arr != null) {
                selectedValue = arr["city"];
            }
            var html = "";
            for (var i = 0; i < json.length; i++) {
                var selected = "";
                if (json[i].ID == selectedValue) {
                    selected = "selected=selected";
                }
                html += "<option value=" + json[i].ID + " " + selected + ">" + json[i].Name + "</option>";
            }
            $(id).html(html);
            $(id).select2({
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
            var cityIsEmpty = $("" + id + " option").length < 1;
            if (selectedValue != null || !cityIsEmpty) {
                var cityID = $(id).val();
                InitDistrict(districtID, cityID, areaID, "", async, arr);
            }

            $(id).on("change", function () {
                var selectID = $(this).val();
                InitDistrict(districtID, selectID, areaID, "", async, "");
                $.cookie("cityID", $(this).val());
            });
        }
    });
}

///初始化区
function InitDistrict(id, cityID, areaID, firstText, async, arr) {
    $("" + id + " option").remove();
    $(id).prev().find("ul .select2-search-choice").remove();
    //var cityID = $(cityID).val();
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
            var selectedValue = 0;
            if (arr != null) {
                selectedValue = arr["district"];
            }
            for (var i = 0; i < json.length; i++) {
                var selected = "";
                if (json[i].ID == selectedValue) {
                    selected = "selected"
                }
                html += "<option value=" + json[i].ID + " " + selected + ">" + json[i].Name + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: '',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
            if ($("" + id + " :selected").length > 0) {

                InitArea(areaID, $(id).val(), firstText, async, arr);
            }
            // $(id).prev().find("a span")[0].innerText = $("" + id + " :selected").text();
            $(id).on("change", function () {
                if ($("" + id + " :selected").length == 1) {
                    InitArea(areaID, $(id)[0].value, firstText, async, "");
                    $(areaID).removeAttr("disabled");
                } else {
                    $(areaID).prev().find("ul .select2-search-choice").remove()
                    $(areaID).attr("disabled", "disabled");
                }

            });
        }
    });
}

function InitArea(id, disID, firstText, async, arr) {
    $("" + id + " option").remove();
    //var disID = $(disID)[0].value;
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
            var selectedValue = 0;
            if (arr != null) {
                selectedValue = arr["area"];
            }
            for (var i = 0; i < json.length; i++) {
                var seleced = "";
                if (json[i].ID == selectedValue) {
                    seleced = "selected";
                }
                html += "<option value=" + json[i].ID + " " + seleced + ">" + json[i].AreaName + "</option>";
            }
            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}
//初始化房源资质
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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

function InitCustomerTransactionType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCustomerTransactionType",
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}
//初始化客户状态
function InitCustomerStatus(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCustomerStatus",
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitCustomerType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCustomerType",
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitOfficeLevel(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadOfficeLevel",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].LevelName + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitLandType(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadLandType",
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitCarPark(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCarPark",
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
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitGrade(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadGrade",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].GradeName + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitIntention(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadIntention",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].IntentionName + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitCountry(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadCountry",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].ChineseName + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitWall(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadWall",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].Item + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitLandPlan(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadLandPlan",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].PlanName + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitShopArea(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadShopArea",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].ShopAreaName + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
        }
    });
}

function InitShopLocation(id, firstText, async) {
    $.ajax({
        url: "/Common/LoadShopLocation",
        async: async,
        success: function (data) {
            var json = $.parseJSON(data);
            var html = "";
            if (firstText != "") {
                html += "<option value=0 >" + firstText + "</option>";
            }
            for (var i = 0; i < json.length; i++) {
                html += "<option value=" + json[i].ID + ">" + json[i].Item + "</option>";
            }

            $(id).html(html);
            $(id).select2({
                placeholder: 'Select your country...',
                allowClear: true
            }).on('select2-open', function () {
                // Adding Custom Scrollbar
                $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
            });
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

//获取PageIndex
function GetPageCountHtml(totalLength, activeIndex, maxCount) {
    var html = "";
    var active = "active";
    var totalPageCount = GetTotalPageCount(totalLength, maxCount);
    html += "<li class='paginate_button " + (activeIndex == 1 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=1>1</a></li>";
    if (totalPageCount > 1) {
        html += "<li class='paginate_button " + (activeIndex == 2 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=2>2</a></li>";
    }
    if (activeIndex > 5) {
        html += "<li><a href='javascript:void(0);'>.......</a><li/>";
        html += "<li class='paginate_button " + (activeIndex == 2 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex - 1) + ">" + (activeIndex - 1) + "</a></li>";
        html += "<li class='paginate_button active' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + activeIndex + ">" + activeIndex + "</a></li>";
        if (totalPageCount - activeIndex == 1) {
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 1) + ">" + (activeIndex + 1) + "</a></li>";
        }
        if (totalPageCount - activeIndex == 2) {
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 1) + ">" + (activeIndex + 1) + "</a></li>";
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 2) + ">" + (activeIndex + 2) + "</a></li>";
        }
        if (totalPageCount - activeIndex >= 3) {
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 1) + ">" + (activeIndex + 1) + "</a></li>";
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 2) + ">" + (activeIndex + 2) + "</a></li>";
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=" + (activeIndex + 3) + ">" + (activeIndex + 3) + "</a></li>";
        }
    }
    else {
        if (totalPageCount > 2) {
            html += "<li class='paginate_button " + (activeIndex == 3 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=3>3</a></li>";
        }
        if (totalPageCount > 3) {
            html += "<li class='paginate_button " + (activeIndex == 4 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=4>4</a></li>";
        }
        if (totalPageCount > 4) {
            html += "<li class='paginate_button " + (activeIndex == 5 ? active : "") + "' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=5>5</a></li>";
        }
        if (totalPageCount > 5) {
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=6>6</a></li>";
        }
        if (totalPageCount > 6) {
            html += "<li class='paginate_button' aria-controls='example-1' tabindex='0'><a href='#' pageIndex=7>7</a></li>";
        }
    }
    return html;
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

//列显示状态
function InitDisplayStatus(type) {
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
        $.post("/Common/Change" + type + "TableColStatus",
            {
                id: colID,
                status: status
            },
            function (data) {

            });
    });
}

function InitTableSort(table) {
    $("" + table + " th").on("click", function () {
        var trArr = "";
        var sortCol = $(this).attr("class");
        var sortType = $(this).attr("sortType");
        var isFirstClick = sortType == null;
        if (isFirstClick || sortType == "Asc") {
            trArr = TableAscSort(table, sortCol);
            $(this).attr("sortType", "Desc");
        } else {
            trArr = TableDescSort(table, sortCol);
            $(this).attr("sortType", "Asc");
        }
        $("" + table + " tbody tr").remove();
        $("" + table + " tbody").append(trArr);
    });
}

function TableAscSort(table, sortCol) {
    var trArr = $("" + table + " tbody tr");
    var sortArr = "";
    switch (sortCol) {
        case "colCustomerID":
            trArr = trArr.sort(CustomerIDAscSort);
            break;
        case "colCity":
            trArr = trArr.sort(CityAscSort);
            break;
        case "colDistrict":
            trArr = trArr.sort(DistrictAscSort);
            break;
        case "colArea":
            trArr = trArr.sort(AreaAscSort);
            break;
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
        case "colHouseStatus":
            trArr = trArr.sort(HouseStatusAscSort);
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
        case "colCustomerName":
            trArr = trArr.sort(CustomerNameAscSort);
            break;
        case "colEntrustStartDate":
            trArr = trArr.sort(EntrustStartDateAscSort);
            break;
        case "colHouseUseType":
            trArr = trArr.sort(HouseUseTypeAscSort);
            break;
        case "colRemarks":
            trArr = trArr.sort(RemarksAscSort);
            break;
        case "colGrade":
            trArr = trArr.sort(GradeAscSort);
            break;
        case "colEntrustType":
            trArr = trArr.sort(EntrustTypeAscSort);
            break;
        case "colSource":
            trArr = trArr.sort(SourceAscSort);
            break;
        case "colCustomerType":
            trArr = trArr.sort(CustomerTypeAscSort);
            break;
        case "colIntention":
            trArr = trArr.sort(IntentionAscSort);
            break;
        case "colEntrustOverDate":
            trArr = trArr.sort(EntrustOverDateAscSort);
            break;
    }
    return trArr;
}

function TableDescSort(table, sortCol) {
    var trArr = $("" + table + " tbody tr");
    var sortArr = "";
    switch (sortCol) {
        case "colCustomerID":
            trArr = trArr.sort(CustomerIDDescSort);
            break;
        case "colCity":
            trArr = trArr.sort(CityDescSort);
            break;
        case "colDistrict":
            trArr = trArr.sort(DistrictDescSort);
            break;
        case "colArea":
            trArr = trArr.sort(AreaDescSort);
            break;
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
        case "colLastFollowDate":
            trArr = trArr.sort(LastFollowDateDescSort);
            break;
        case "colCustomerName":
            trArr = trArr.sort(CustomerNameDescSort);
            break;
        case "colEntrustStartDate":
            trArr = trArr.sort(EntrustStartDateDescSort);
            break;
        case "colHouseUseType":
            trArr = trArr.sort(HouseUseTypeDescSort);
            break;
        case "colRemarks":
            trArr = trArr.sort(RemarksDescSort);
            break;
        case "colGrade":
            trArr = trArr.sort(GradeDescSort);
            break;
        case "colEntrustType":
            trArr = trArr.sort(EntrustTypeDescSort);
            break;
        case "colSource":
            trArr = trArr.sort(SourceDescSort);
            break;
        case "colIntention":
            trArr = trArr.sort(IntentionDescSort);
            break;
        case "colEntrustOverDate":
            trArr = trArr.sort(EntrustOverDateDescSort);
            break;
    }
    return trArr;
}

//升序
function CustomerIDAscSort(a, b) {
    return $(a).find("td.colCustomerID").text().localeCompare($(b).find("td.colCustomerID").text());
}

function CityAscSort(a, b) {
    return $(a).find("td.colArea").text().localeCompare($(b).find("td.colArea").text());
}

function DistrictAscSort(a, b) {
    return $(a).find("td.colDistrict").text().localeCompare($(b).find("td.colDistrict").text());
}

function AreaAscSort(a, b) {
    return $(a).find("td.colArea").text().localeCompare($(b).find("td.colArea").text());
}

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

function LastFollowDateAscSort(a, b) {
    var dt = new Date($(a).find("td.colLastFollowDate").text());
    var dt2 = new Date($(b).find("td.colLastFollowDate").text());
    return dt > dt2 ? 1 : -1;
}

function CustomerNameAscSort(a, b) {
    return $(a).find("td.colCustomerName").text().localeCompare($(b).find("td.colCustomerName").text());
}

function RemarksAscSort(a, b) {
    return $(a).find("td.colRemarks").text().localeCompare($(b).find("td.colRemarks").text());
}

function EntrustStartDateAscSort(a, b) {
    var dt = new Date($(a).find("td.colEntrustStartDate").text());
    var dt2 = new Date($(b).find("td.colEntrustStartDate").text());
    return dt > dt2 ? 1 : -1;
}

function HouseUseTypeAscSort(a, b) {
    return $(a).find("td.colHouseUseType").text().localeCompare($(b).find("td.colHouseUseType").text());
}

function GradeAscSort(a, b) {
    return $(a).find("td.colGrade").text().localeCompare($(b).find("td.colGrade").text());
}

function EntrustTypeAscSort(a, b) {
    return $(a).find("td.colEntrustType").text().localeCompare($(b).find("td.colEntrustType").text());
}

function SourceAscSort(a, b) {
    return $(a).find("td.colSource").text().localeCompare($(b).find("td.colSource").text());
}

function CustomerTypeAscSort(a, b) {
    return $(a).find("td.colCustomerType").text().localeCompare($(b).find("td.colCustomerType").text());
}

function IntentionAscSort(a, b) {
    return $(a).find("td.colIntention").text().localeCompare($(b).find("td.colIntention").text());
}

function EntrustOverDateAscSort(a, b) {
    var dt = new Date($(a).find("td.colEntrustOverDate").text());
    var dt2 = new Date($(b).find("td.colEntrustOverDate").text());
    return dt > dt2 ? 1 : -1;
}

//降序
function CustomerIDDescSort(a, b) {
    return $(b).find("td.colCustomerID").text().localeCompare($(a).find("td.colCustomerID").text());
}

function CityDescSort(a, b) {
    return $(b).find("td.colArea").text().localeCompare($(a).find("td.colArea").text());
}

function DistrictDescSort(a, b) {
    return $(b).find("td.colDistrict").text().localeCompare($(a).find("td.colDistrict").text());
}

function AreaDescSort(a, b) {
    return $(b).find("td.colArea").text().localeCompare($(a).find("td.colArea").text());
}

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

function LastFollowDateDescSort(a, b) {
    var dt = new Date($(a).find("td.colLastFollowDate").text());
    var dt2 = new Date($(b).find("td.colLastFollowDate").text());
    return dt > dt2 ? -1 : 1;
}

function CustomerNameDescSort(a, b) {
    return $(b).find("td.colCustomerName").text().localeCompare($(a).find("td.colCustomerName").text());
}

function EntrustStartDateDescSort(a, b) {
    var dt = new Date($(a).find("td.colEntrustStartDate").text());
    var dt2 = new Date($(b).find("td.colEntrustStartDate").text());
    return dt > dt2 ? -1 : 1;
}

function HouseUseTypeDescSort(a, b) {
    return $(b).find("td.colHouseUseType").text().localeCompare($(a).find("td.colHouseUseType").text());
}

function RemarksDescSort(a, b) {
    return $(b).find("td.colRemarks").text().localeCompare($(a).find("td.colRemarks").text());
}

function GradeDescSort(a, b) {
    return $(b).find("td.colGrade").text().localeCompare($(a).find("td.colGrade").text());
}

function EntrustTypeDescSort(a, b) {
    return $(b).find("td.colEntrustType").text().localeCompare($(a).find("td.colEntrustType").text());
}

function SourceDescSort(a, b) {
    return $(b).find("td.colSource").text().localeCompare($(a).find("td.colSource").text());
}

function CustomerTypeDescSort(a, b) {
    return $(b).find("td.colCustomerType").text().localeCompare($(a).find("td.colCustomerType").text());
}

function IntentionDescSort(a, b) {
    return $(b).find("td.colIntention").text().localeCompare($(a).find("td.colIntention").text());
}

function EntrustOverDateDescSort(a, b) {
    var dt = new Date($(a).find("td.colEntrustOverDate").text());
    var dt2 = new Date($(b).find("td.colEntrustOverDate").text());
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

function GetObjArrVal(arr) {
    var result = "";
    for (var i = 0; i < arr.length; i++) {
        result += arr[i].value + ",";
    }
    result = result.substring(0, result.lastIndexOf(','));
    result = result != "" ? result : "";
    return result;
}

//获取总页数
function GetTotalPageCount(totalCount, maxCount) {
    var totalPageCount = totalCount / maxCount;
    var numberArr = totalPageCount.toString().split(".");
    var number = numberArr.length > 1 ? parseInt(numberArr[1]) : 0;
    if (number >= 1) {
        totalPageCount++;
    }
    return parseInt(totalPageCount);
}

//创建跟进记录
function CreateFollowRecord(id, type) {
    $.ajax(
           {
               url: "/" + type + "/Load" + type + "FollowRecord",
               data: { id: id },
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
function GetFollowRecordObj(type) {
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
    record[type + "ID"] = $(".panel input[id=" + type.toLowerCase() + "ID]").val();
    return record;
}


function InitDelete(type) {
    $("#delete" + type).on("click", function () {
        var objArr = $(".col-select.cbr-checked");
        if (objArr.length > 0) {
            var isDelete = confirm("确定要删除吗？");
            if (isDelete) {

                var idArr = new Array();
                for (var i = 0; i < objArr.length; i++) {
                    idArr.push(objArr[i].attributes[type.toLowerCase() + "ID"].value);
                }
                $.post("/" + type + "/Delete" + type,
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
            }
        } else {
            return;
        }
    });
}

function InitContrast() {
    var trArr = $(".col-select.cbr-checked").parents("tr");
    for (var i = 0; i < trArr.length; i++) {
        var json = $(trArr[i]).attr(type.toLowerCase() + "Json");
        var obj = $.parseJSON(json);
        $("#contrastID" + i).text(obj.ID);//编号
        $("#contrastTransactionType" + i).text(obj.TransactionType.TypeName);//交易
        $("#contrastDistrict" + i).text(obj.District.Name);//城区  #contrast
        $("#contrastResidentialDistrictAddr" + i).text(obj.ResidentialDistrict.Name);//地址
        $("#contrastHouseType1" + i).text();//房型
        $("#contrastFloor" + i).text(obj.Floor);//楼层
        $("#contrastOrientation" + i).text(obj.Orientation.OrientationName);//朝向
        $("#contrastHouseSize" + i).text(obj.HouseSize);//面积
        $("#contrastSaleTotalPrice" + i).text(obj.SaleTotalPrice);//售价
        $("#contrastLeaseTotalPrice" + i).text(obj.LeaseTotalPrice);//租价
        $("#contrastHouseUseType" + i).text(obj.HouseUseType.TypeName);//用途
        $("#contrastCurrent" + i).text(obj.Current.CurrentName);//现状
        $("#contrastSupporting" + i).text(obj.Supporting);//配套
        $("#contrastDecorationType" + i).text(obj.DecorationType.TypeName);//装修
        $("#contrastHouseDocumentType" + i).text(obj.HouseDocumentType.TypeName);//产权
        $("#contrastLookHouseType" + i).text(obj.LookHouseType.TypeName);//看房
        $("#contrastEntrustType" + i).text(obj.EntrustType.TypeName);//委托
        $("#contrastOwnerName" + i).text(obj.OwnerName);//业主
        $("#contrastRemarks" + i).text(obj.Remarks);//备注
        // $("#contrast").text();//归属
    }
}


function ShowMatchPanel(type, obj) {
    $("." + type + "-Match-panel").show();
    InitTransactionType(id, firstText, async);
    $("#match-submit").on("click", function () {

    });
}

