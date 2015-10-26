;$(document).ready(function () {
    $("#frameGoogle").hide();
    $("#notClicked").hide();

    var clicked = document.getElementById("clicked");
    var notClicked = document.getElementById("notClicked");

    clicked.addEventListener("click", function () {
        $("#frameGoogle").fadeIn(1500);
        $("#clicked").hide();
        $("#notClicked").show();
    })

    notClicked.addEventListener("click", function () {
        $("#frameGoogle").fadeOut();
        $("#clicked").show();
        $("#notClicked").hide();
    });

    $("#subscribe").hide();
    $("#thanks").hide();
    var getEmail = document.getElementById("getEmail");

    getEmail.addEventListener("click", function() {
        $("#subscribe").fadeIn(1000);
    });

    document.getElementById("emailClicked").addEventListener("click", function() {
        $("#subscribe").fadeOut(500);
        setTimeout(function() {
            $("#getEmail").hide(500);
            $("#thanks").show(1000);
        }, 502);
    });
});
