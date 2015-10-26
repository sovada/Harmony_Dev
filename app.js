var express         = require("express"),
    fs              = require("fs"),
    app             = express(),
    port            = process.env.PORT || 9000,
    env             = "localhost://",
    translationFile = JSON.parse(fs.readFileSync(__dirname + "/config/lang.json")),
    translation     = translationFile.lang,
    currentLanguage,
    portfolioID;

// Tout ce qui trouve dans le dossier assets sera accessible via les url /img, /css etc
// donc possibilité d'utiliser en html l'appel a mes fichier css, js, img qui sont dans se dossier
app.use(express.static('assets'));
// Ici je définis mon template
app.set("view engine", "ejs");

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

app.get("/portfolio", function (req, res) {
    currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

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
    // recup le parametre portfolioID de mon URL
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

app.get("/blog", function (req, res) {
    currentLanguage = req.headers["accept-language"][0] + req.headers["accept-language"][1];

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
    // recup le parametre portfolioID de mon URL
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

app.listen(port);
console.log(`Server's running at ${env}${port}`);
