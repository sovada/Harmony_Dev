var express         = require("express"),
    fs              = require("fs"),
    app             = express(),
    port            = process.env.port || 9000,
    env             = "localhost://",
    translationFile = JSON.parse(fs.readFileSync(__dirname + "/config/lang.json")),
    translation     = translationFile.lang,
    currentLanguage;

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
    res.render("portfolio");
});

app.get("/blog", function (req, res) {
    res.render("blog");
})

app.listen(port);
console.log(`Server's running at ${env}${port}`);