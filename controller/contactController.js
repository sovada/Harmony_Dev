module.exports = function (app, translation, contact) {
    var currentLanguage;

    app.get("/contact", function (req, res) {

        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        if (currentLanguage === "en") { res.render("contact", {"translation": translation.en}); }
        else if (currentLanguage === "fr") { res.render("contact", {"translation": translation.fr}); }
        else if (currentLanguage === "es") { res.render("contact", {"translation": translation.es}); }
        else { res.render("contact", {"translation": translation.en}); };
    });

    app.post("/contact/checked", function (req, res) {
        var name    = req.body.name;
        var email   = req.body.email;
        var message = req.body.message;

        var add = new contact ({
            name    : name,
            email   : email,
            message : message
        }).save(function (err, data) {
            !err ? res.redirect("/success") : console.log("err");
        });
    });

    app.get("/success", function (req, res) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        if (currentLanguage === "en") { res.render("contact-success", {"translation": translation.en}); }
        else if (currentLanguage === "fr") { res.render("contact-success", {"translation": translation.fr}); }
        else if (currentLanguage === "es") { res.render("contact-success", {"translation": translation.es}); }
        else { res.render("contact-success", {"translation": translation.en}); };
    });
};
