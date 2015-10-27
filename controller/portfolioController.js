module.exports = function (app, translation) {
    // scope.
    var currentLanguage,
    portfolioID;

    app.get("/portfolio", function (req, res) {
        // déifnis la variable a la langue utilisé par le navigateur.
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // Affiche la vue en fonction de la langue
        // si la langue du navigateur ne fait pas partie des langues dispo, automatiquement traduit en anglais.
        // translation.en = le fichier lang dans config.
        if (currentLanguage === "en") {
            res.render("portfolio/index", {"translation": translation.en});
        } else if (currentLanguage === "fr") {
            res.render("portfolio/index", {"translation": translation.fr});
        } else if (currentLanguage === "es") {
            res.render("portfolio/index", {"translation": translation.es});
        } else {
            res.render("portfolio/index", {"translation": translation.en});
        }
    });

    app.get("/portfolio/:portfolioID", function (req, res, next) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // recupère le parametre blogID de mon URL.
        portfolioID = req.params.portfolioID;

        if (currentLanguage === "en") {
            res.render("portfolio/single", {"translation": translation.en, "id": portfolioID});
        } else if (currentLanguage === "fr") {
            res.render("portfolio/single", {"translation": translation.fr, "id": portfolioID});
        } else if (currentLanguage === "es") {
            res.render("portfolio/single", {"translation": translation.es, "id": portfolioID});
        } else {
            res.render("portfolio/single", {"translation": translation.en, "id": portfolioID});
        }
    });
};
