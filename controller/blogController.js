module.exports = function (app, translation) {
    // scope.
    var currentLanguage,
    blogID;

    app.get("/blog", function (req, res) {
        // déifnis la variable a la langue utilisé par le navigateur.
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // Affiche la vue en fonction de la langue
        // si la langue du navigateur ne fait pas partie des langues dispo, automatiquement traduit en anglais.
        // translation.en = le fichier lang dans config.
        if (currentLanguage === "en") {
            res.render("blog/index", {"translation": translation.en});
        } else if (currentLanguage === "fr") {
            res.render("blog/index", {"translation": translation.fr});
        } else if (currentLanguage === "es") {
            res.render("blog/index", {"translation": translation.es});
        } else {
            res.render("blog/index", {"translation": translation.en});
        }
    });

    app.get("/blog/:blogID", function (req, res, next) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // recup le parametre portfolioID de mon URL.
        blogID = req.params.blogID;

        if (currentLanguage === "en") {
            res.render("blog/single", {"translation": translation.en, "id": blogID});
        } else if (currentLanguage === "fr") {
            res.render("blog/single", {"translation": translation.fr, "id": blogID});
        } else if (currentLanguage === "es") {
            res.render("blog/single", {"translation": translation.es, "id": blogID});
        } else {
            res.render("blog/single", {"translation": translation.en, "id": blogID});
        }
    });
};
