;$(document).ready(function () {
    $("#frameGoogle").hide();
    $("#notClicked").hide();

    var clicked = document.getElementById("clicked");
    var notClicked = document.getElementById("notClicked");

    clicked.addEventListener("click", function () {
        $("#frameGoogle").fadeIn(2000);
        $("#clicked").hide();
        $("#notClicked").show();
    })

    notClicked.addEventListener("click", function () {
        $("#frameGoogle").fadeOut();
        $("#clicked").show();
        $("#notClicked").hide();
    });
});
