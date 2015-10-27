var express             = require("express"),
    fs                  = require("fs"),
    app                 = express(),
    blogController      = require("./controller/blogController"),
    portfolioController = require("./controller/portfolioController"),
    deviController      = require("./controller/deviController"),
    indexController     = require("./controller/indexController"),
    port                = process.env.PORT || 9000,
    env                 = "localhost://",
    translationFile     = JSON.parse(fs.readFileSync(__dirname + "/config/lang.json")),
    translation         = translationFile.lang;

// Tout ce qui trouve dans le dossier assets sera accessible via les url /img, /css etc
// donc possibilité d'utiliser en html l'appel a mes fichier css, js, img qui sont dans se dossier
app.use(express.static('assets'));
// Ici je définis mon template
app.set("view engine", "ejs");

// Routing, controller
indexController(app, translation);
deviController(app, translation);
portfolioController(app, translation);
blogController(app, translation);


app.listen(port);
console.log(`Server's running at ${env}${port}`);
