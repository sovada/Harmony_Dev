var express             = require("express"),
    fs                  = require("fs"),
    mongoose            = require("mongoose"),
    app                 = express(),
    blogController      = require("./controller/blogController"),
    portfolioController = require("./controller/portfolioController"),
    deviController      = require("./controller/deviController"),
    indexController     = require("./controller/indexController"),
    port                = process.env.PORT || 9000,
    env                 = "localhost://",
    translationFile     = JSON.parse(fs.readFileSync(__dirname + "/config/lang.json")),
    translation         = translationFile.lang;

// Connexion à la base de donnée
mongoose.connect("mongodb://root:PGGSfAUH1325@ds039504.mongolab.com:39504/harmony_dev");

// Tout ce qui trouve dans le dossier assets sera accessible via les url /img, /css etc
// donc possibilité d'utiliser en html l'appel à mes fichier css, js, img qui sont dans ce dossier.
app.use(express.static('assets'));
// Ici je définis mon template.
app.set("view engine", "ejs");

// Routing, controller.
indexController(app, translation, mongoose);
deviController(app, translation, mongoose);
portfolioController(app, translation, mongoose);
blogController(app, translation, mongoose);

app.listen(port);
console.log(`Server's running at ${env}${port}`);
