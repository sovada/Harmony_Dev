module.exports = function (app, translation, blog) {
    // scope.
    var currentLanguage,
    blogID;

    app.get("/blog", function (req, res) {
        // déifnis la variable a la langue utilisé par le navigateur.
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // Affiche la vue en fonction de la langue
        // si la langue du navigateur ne fait pas partie des langues dispo, automatiquement traduit en anglais.
        // translation.en = le fichier lang dans config.
        // blog.find correspond a un querie dans ma db
        blog.find(null, function (err, data) {
            if (currentLanguage === "en") {
                res.render("blog/index", {"translation": translation.en, "datas": data});
            } else if (currentLanguage === "fr") {
                res.render("blog/index", {"translation": translation.fr, "datas": data});
            } else if (currentLanguage === "es") {
                res.render("blog/index", {"translation": translation.es, "datas": data});
            } else {
                res.render("blog/index", {"translation": translation.en, "datas": data});
            }
        });
    });

    app.get("/blog/:blogID", function (req, res, next) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

        // recup le parametre portfolioID de mon URL.
        blogID = req.params.blogID;

        blog.findOne({"_id": blogID}, function (err, data) {
            if (currentLanguage === "en") {
                res.render("blog/single", {"translation": translation.en, "id": blogID, "data": data});
            } else if (currentLanguage === "fr") {
                res.render("blog/single", {"translation": translation.fr, "id": blogID, "data": data});
            } else if (currentLanguage === "es") {
                res.render("blog/single", {"translation": translation.es, "id": blogID, "data": data});
            } else {
                res.render("blog/single", {"translation": translation.en, "id": blogID, "data": data});
            }
        });
    });
};
