module.exports = function (app, translation, blog) {
    // scope.
    var currentLanguage;

    app.get("/", function (req, res){
        // déifnis la variable a la langue utilisé par le navigateur.
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // Affiche la vue en fonction de la langue
        // si la langue du navigateur ne fait pas partie des langues dispo, automatiquement traduit en anglais.
        // translation.en = le fichier lang dans config.
        var query = blog.find(null);
        query.limit(2);
        query.sort({date: -1});
        query.exec(function (err, data) {
            if (currentLanguage === "en") {
                res.render("index", {"translation": translation.en, "datas": data});
            } else if (currentLanguage === "fr") {
                res.render("index", {"translation": translation.fr, "datas": data});
            } else if (currentLanguage === "es") {
                res.render("index", {"translation": translation.es, "datas": data});
            } else {
                res.render("index", {"translation": translation.en, "datas": data});
            }
        });
    });
};
