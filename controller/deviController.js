module.exports = function (app, translation) {
    // scope.
    var currentLanguage;

    app.get("/price", function (req, res) {
        // déifnis la variable a la langue utilisé par le navigateur.
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // Affiche la vue en fonction de la langue
        // si la langue du navigateur ne fait pas partie des langues dispo, automatiquement traduit en anglais.
        // translation.en = le fichier lang dans config.
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
