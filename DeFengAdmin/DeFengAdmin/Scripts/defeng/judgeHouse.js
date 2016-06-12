$("#hallCountTxt").on("blur", function () {
    var hallCountTxt = $("#hallCountTxt").val();
    if (hallCountTxt != "") {
        $(".HallCount").hide();
    }
    else {
        $(".HallCount").show();
        return false;
    }
});
$("#toiletCountTxt").on("blur", function () {
    var toiletCountTxt = $("#toiletCountTxt").val();
    if (toiletCountTxt != "") {
        $(".ToiletCount").hide();
    }
    else {
        $(".ToiletCount").show();
        return false;
    }
});
$("#balconyCountTxt").on("blur", function () {
    var balconyCountTxt = $("#balconyCountTxt").val();
    if (balconyCountTxt != "") {
        $(".BalconyCount").hide();
    }
    else {
        $(".BalconyCount").show();
        return false;
    }
});
$("#houseSizeTxt").on("blur", function () {
    var houseSizeTxt = $("#houseSizeTxt").val();
    var houseSize = $('.HouseSize');
    if (houseSizeTxt != "") {
        $(".HouseSize").hide();
    }
    else {
        $(".HouseSize").show();
        return false;
    }
});
$("#layerNumberTxt").on("blur", function () {
    var layerNumberTxt = $("#layerNumberTxt").val();
    if (layerNumberTxt != "") {
        $(".LayerNumber").hide();
    }
    else {
        $(".LayerNumber").show();
        return false;
    }
});

