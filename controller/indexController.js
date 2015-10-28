module.exports = function (app, translation, blog, portfolio) {
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
        query.exec(function (err, blogs) {
            var query2 = portfolio.find(null);
            query2.limit(2);
            query2.sort({data: -1});
            query2.exec(function (err, portfolios) {
                if (currentLanguage === "en") {
                    res.render("index", {"translation": translation.en, "blogs": blogs, "portfolios": portfolios});
                    console.log(portfolios);
                } else if (currentLanguage === "fr") {
                    res.render("index", {"translation": translation.fr, "blogs": blogs, "portfolios": portfolios});
                } else if (currentLanguage === "es") {
                    res.render("index", {"translation": translation.es, "blogs": blogs, "portfolios": portfolios});
                } else {
                    res.render("index", {"translation": translation.en, "blogs": blogs, "portfolios": portfolios});
                }
            });
        });
    });
};
