var verify = function () {
    var name    = $(".name").val();
    var email   = $(".email").val();
    var message = $(".message").val();

    var correctName    = true;
    var correctEmail   = true;
    var correctMessage = true;

    if (name.length < 5) {
        $(".alert-name").fadeIn(300);
        correctName = false;
    } else {
        $(".alert-name").hide();
        correctName = true;
    };

    if (email.indexOf("@") != -1 && email.indexOf(".") != -1 && email.length > 8) {
        $(".alert-email").hide();
        correctEmail = true;
    } else {
        $(".alert-email").fadeIn(300);
        correctEmail = false;
    };

    if (message.length < 25) {
        $(".alert-message").fadeIn(300);
        correctMessage = false;
    } else {
        $(".alert-message").hide();
        correctMessage = true;
    };

    if (correctName && correctEmail && correctMessage) {
        $(".verify").hide();
        $(".submitCorrect").fadeIn(300);
    }
};
