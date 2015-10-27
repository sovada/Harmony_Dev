module.exports = function (app, translation) {
    app.get("/", function (req, res){
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        if (currentLanguage === "en") {
            res.render("index", {"translation": translation.en});
        } else if (currentLanguage === "fr") {
            res.render("index", {"translation": translation.fr});
        } else if (currentLanguage === "es") {
            res.render("index", {"translation": translation.es});
        } else {
            res.render("index", {"translation": translation.en});
        }
    });
};
