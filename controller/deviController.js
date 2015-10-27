module.exports = function (app, translation) {
    var currentLanguage;

    app.get("/price", function (req, res) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        if (currentLanguage === "en") {
            res.render("price", {"translation": translation.en});
        } else if (currentLanguage === "fr") {
            res.render("price", {"translation": translation.fr});
        } else if (currentLanguage === "es") {
            res.render("price", {"translation": translation.es});
        } else {
            res.render("price", {"translation": translation.en});
        }
    });
};
