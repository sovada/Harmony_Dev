module.exports = function (app, admin, blog, portfolio, subscribe) {
    var moment    = require("moment"),
        multer    = require("multer");

    // Verifie si l'admin est déjà connecter si non affiche le form de connexion
    app.get("/hd-admin", function (req, res) {
        req.cookies.admin ? res.redirect("hd-admin/home") : res.render("admin/connexion");
    });

    // connexion a l'admin
    app.post("/hd-admin", function (req, res) {
        // parametre POST du form
        var email = req.body.email;
        var password = req.body.password;

        // find l'admin correspondant a l'email du champ entré
        admin.find({"email": email}, function (err, data) {
            dbPass = data[0].password;
            // Vérifie si les mots de passes concordent
            if (dbPass == password) {
                var cookie = req.cookies.cookieName;
                if (cookie === undefined) {
                    // Créer le cookies qui prouve que l'admin est connecté si tout s'est bien passé
                    res.cookie('admin', {connected: true});
                    res.redirect("hd-admin/home");
                }
            } else {
                // si les mot de passes ne concordent pas redirect a l'acceuil
                res.redirect("/hd-admin");
            }
        });
    });

    app.get("/hd-admin/home", function (req, res) {
        // si le cookies admin existe on va dans l'admin sinon c'est qu'il n'est pas connecté => accueil
        req.cookies.admin ? res.render("admin/index") : res.redirect("/");
    });

    app.get("/hd-admin/subscribe", function (req, res) {
        if (req.cookies.admin) {
            subscribe.find(function (err, data) {
                res.render("admin/subscribe", {"data": data});
            });
        } else {
            res.redirect("/");
        }
    });

    app.get("/hd-admin/blog", function (req, res) {
        if (req.cookies.admin) {
            blog.find(function (err, data) {
                res.render("admin/blog/index", {"data": data});
            }).sort({date: -1});
        } else {
            res.redirect("/");
        }
    });

    app.get("/hd-admin/portfolio", function (req, res) {
        if (req.cookies.admin) {
            portfolio.find(function (err, data) {
                res.render("admin/portfolio", {"data": data});
            });
        } else {
            res.redirect("/");
        }
    });

    app.post("/hd-admin/blog/delete", function (req, res, next) {
        if (req.cookies.admin) {
            blog.remove({"_id": req.body.blogID}, function (err, data) {});
        } else {
            res.status(404).send("Sorry you can't go here!");
        }
    });

    app.get("/hd-admin/blog/add", function (req, res) {
        req.cookies.admin ? res.render("admin/blog/add") : res.status(404).send("Sorry you can't go here!");
    });

    app.use(multer({ dest: './assets/uploads',
        rename: function (fieldname, filename) {
            return filename+"_"+Date.now();
            console.log(filename);
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
            done=true;
        }
    }).single("img"));


    app.post("/hd-admin/blog/added",  function (req, res) {


        var titleEN   = req.body.titleEN,
            titleFR   = req.body.titleFR,
            titleES   = req.body.titleES,

            contentEN = req.body.contentEN,
            contentFR = req.body.contentFR,
            contentES = req.body.contentES,

            img       = "uploads/" + req.file.originalname,
            date      = moment().format("DD/MM/YYYY"),
            author    = "Harmony_dev",
            category  = req.body.category,
            url       = req.body.URL;

        var add = new blog ({
            titleEN     : titleEN,
            titleFR     : titleFR,
            titleES     : titleES,
            contentEN   : contentEN,
            contentFR   : contentFR,
            contentES   : contentES,
            img         : img,
            date        : date,
            author      : author,
            category    : category
        }).save(function (err, data) {
            !err ? res.redirect("/hd-admin/blog") : console.log("err");
        });
    });

    app.get("/hd-admin/logout", function (req, res) {
        // supprime le cookie admin
        res.clearCookie("admin", {path: "/"});
        res.redirect("/");
    });

};
