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
        var query = blog.find(null).sort({date: -1});
        query.exec(null, function (err, data) {
            var query = blog.find().distinct("category", function (err, category) {
                if (currentLanguage === "en") {
                    res.render("blog/index", {"translation": translation.en, "datas": data, "category" : category});
                } else if (currentLanguage === "fr") {
                    res.render("blog/index", {"translation": translation.fr, "datas": data, "category" : category});
                } else if (currentLanguage === "es") {
                    res.render("blog/index", {"translation": translation.es, "datas": data, "category" : category});
                } else {
                    res.render("blog/index", {"translation": translation.en, "datas": data, "category" : category});
                }
            });
        });
    });

    app.get("/blog/:blogID", function (req, res, next) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];
        // recup le parametre portfolioID de mon URL.
        blogID = req.params.blogID;

        blog.findOne({"_id": blogID}, function (err, data) {
            var query = blog.find().distinct("category", function (err, category) {
                var query = blog.find().sort({date: -1}).exec(null, function (err, blog) {
                    if (currentLanguage === "en") {
                        res.render("blog/single", {"translation": translation.en, "id": blogID, "data": data, "category" : category, "blog": blog});
                    } else if (currentLanguage === "fr") {
                        res.render("blog/single", {"translation": translation.fr, "id": blogID, "data": data, "category" : category, "blog": blog});
                    } else if (currentLanguage === "es") {
                        res.render("blog/single", {"translation": translation.es, "id": blogID, "data": data, "category" : category, "blog": blog});
                    } else {
                        res.render("blog/single", {"translation": translation.en, "id": blogID, "data": data, "category" : category, "blog": blog});
                    }
                });
            });
        });
    });

    app.get("/blog/category/:category", function (req, res, next) {
        currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];
        categoryUrl = req.params.category;

        blog.find({"category": categoryUrl}, function (err, data) {
            var query = blog.find().distinct("category", function (err, category) {
                if (currentLanguage === "en") {
                    res.render("blog/category", {"translation": translation.en, "datas": data, "category" : category, "categoryUrl": categoryUrl});
                } else if (currentLanguage === "fr") {
                    res.render("blog/category", {"translation": translation.fr, "datas": data, "category" : category, "categoryUrl": categoryUrl});
                } else if (currentLanguage === "es") {
                    res.render("blog/category", {"translation": translation.es, "datas": data, "category" : category, "categoryUrl": categoryUrl});
                } else {
                    res.render("blog/category", {"translation": translation.en, "datas": data, "category" : category, "categoryUrl": categoryUrl});
                }
            });
        })
    });
};
