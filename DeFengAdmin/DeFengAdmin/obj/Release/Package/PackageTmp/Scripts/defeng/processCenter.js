//$('#pdfOpen').click(function () {
//    $('.pdfOpen').hide();
//    $('.pdfOpen').slideDown(200);
//});
//$('#pdfOpen').click(function () {
//    $('.pdfOpen').show();
//});
//$('.close').click(function () {
//    $('.pdfOpen').hide();
//    $('.pdfOpen').slideUp(200);
//});
$(document).ready(function () {
    $('.pdfOpens').click(function () {
        $('.pdfOpen').show();
    });

    $('.theme-poptit .close').click(function () {
        $('.pdfOpen').hide();
        $('.pdfOpen').slideUp(200);
    });
});