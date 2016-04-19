$(document).ready(function () {
    $("#main-menu li").removeClass("active");
    $(".customer-menu").addClass("opened active");

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




