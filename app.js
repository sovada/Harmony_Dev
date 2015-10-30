var express             = require("express"),
    fs                  = require("fs"),
    mongoose            = require("mongoose"),
    bodyParser          = require("body-parser")
    app                 = express(),
    blogController      = require("./controller/blogController"),
    portfolioController = require("./controller/portfolioController"),
    deviController      = require("./controller/deviController"),
    indexController     = require("./controller/indexController"),
    adminController     = require("./controller/adminController"),
    port                = process.env.PORT || 9000,
    env                 = "localhost://",
    translationFile     = JSON.parse(fs.readFileSync(__dirname + "/config/lang.json")),
    translation         = translationFile.lang,
    Schema              = mongoose.Schema;

// Blog model
var blogSchema = new Schema ({
    title       : String,
    content     : String,
    img         : Array,
    date        : String,
    author      : String,
    category    : String
});
var blog = mongoose.model("Blog", blogSchema);
// end Blog model

// Portfolio model
var portfolioSchema = new Schema ({
    title       : String,
    content     : String,
    img         : String,
    date        : String,
    author      : String,
    category    : String,
    url         : String
});
var portfolio = mongoose.model("Portfolio", portfolioSchema);
// end Portfolio model

// Subscribe model
var subscribeSchema = new Schema ({
    email       : String
});
var subscribe = mongoose.model("Subscribe", subscribeSchema);
// end Subscribe model

// Connexion à la base de donnée
mongoose.connect("mongodb://root:PGGSfAUH1325@ds039504.mongolab.com:39504/harmony_dev");

// Tout ce qui trouve dans le dossier assets sera accessible via les url /img, /css etc
// donc possibilité d'utiliser en html l'appel à mes fichier css, js, img qui sont dans ce dossier.
app.use(express.static('assets'));
// Ici je définis mon template.
app.set("view engine", "ejs");
// body parser en middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Routing, controller.
indexController(app, translation, blog, portfolio, subscribe);
deviController(app, translation, mongoose);
portfolioController(app, translation, portfolio);
blogController(app, translation, blog);
adminController(app, blog, portfolio);

app.listen(port);
console.log(`Server's running at ${env}${port}`);
