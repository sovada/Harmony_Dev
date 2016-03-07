module.exports = function (app, admin, blog, portfolio, subscribe, contact) {
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
                res.render("admin/portfolio/index", {"data": data});
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

    app.use(multer({ dest: './assets/uploads'}).single("img"));

    app.post("/hd-admin/blog/added",  function (req, res) {


        var titleEN   = req.body.titleEN,
            titleFR   = req.body.titleFR,
            titleES   = req.body.titleES,

            contentEN = req.body.contentEN,
            contentFR = req.body.contentFR,
            contentES = req.body.contentES,

            img       = "/uploads/" + req.body.img,
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

    app.get("/hd-admin/contact", function (req, res) {
        if (req.cookies.admin) {
            contact.find(function (err, data) {
                res.render("admin/contact/index", {"data": data});
            }).sort({date: -1});
        } else {
            res.redirect("/");
        }
    });

    app.post("/hd-admin/contact/delete", function (req, res, next) {
        if (req.cookies.admin) {
            contact.remove({"_id": req.body.contactID}, function (err, data) {});
        } else {
            res.status(404).send("Sorry you can't go here!");
        }
    });

    app.get("/hd-admin/blog/update/:blogID", function (req, res) {
        blogID = req.params.blogID;

        blog.findOne({"_id": blogID}, function (err, data) {
            res.render("admin/blog/update", {"data": data});
        });
    });

    app.post("/hd-admin/blog/updated/:blogID", function (req, res) {
        if (req.cookies.admin) {
            blogID = req.params.blogID;

            var titleEN   = req.body.titleEN,
                titleFR   = req.body.titleFR,
                titleES   = req.body.titleES,

                contentEN = req.body.contentEN,
                contentFR = req.body.contentFR,
                contentES = req.body.contentES,

                img       = req.body.img,
                date      = moment().format("DD/MM/YYYY"),
                author    = "Harmony_dev",
                category  = req.body.category;

                blog.findOne({"_id": blogID}, function (err, data) {
                    data.titleEN   = titleEN;
                    data.titleFR   = titleFR;
                    data.titleES   = titleES;

                    data.contentEN = contentEN;
                    data.contentFR = contentFR;
                    data.contentES = contentES;

                    data.img       ="/uploads/" + img;
                    data.date      = date;
                    data.author    = author;
                    data.category  = category;

                    data.save();
                });

                blog.find(function (err, data) {
                    res.render("admin/blog/index", {"data": data});
                }).sort({date: -1});
        } else {
            res.status(404).send("Sorry you can't go here!");
        }
    });

    app.get("/hd-admin/portfolio/add", function (req, res) {
        req.cookies.admin ? res.render("admin/portfolio/add") : res.status(404).send("Sorry you can't go here!");
    });

    app.post("/hd-admin/portfolio/added", function (req, res) {
        var titleEN   = req.body.titleEN,
            titleFR   = req.body.titleFR,
            titleES   = req.body.titleES,

            contentEN = req.body.contentEN,
            contentFR = req.body.contentFR,
            contentES = req.body.contentES,

            img      = ["uploads/" + req.body.img1, "uploads/" + req.body.img2, "uploads/" + req.body.img3],
            date      = moment().format("DD/MM/YYYY"),
            author    = "Harmony_dev",
            category  = req.body.category,
            url       = req.body.URL;

        var add = new portfolio ({
            titleEN     : titleEN,
            titleFR     : titleFR,
            titleES     : titleES,
            contentEN   : contentEN,
            contentFR   : contentFR,
            contentES   : contentES,
            img         : img,
            date        : date,
            author      : author,
            category    : category,
            url         : url
        }).save(function (err, data) {
            !err ? res.redirect("/hd-admin/portfolio") : console.log("err");
        });
    });

    app.get("/hd-admin/portfolio/update/:portfolioID", function (req, res) {
        if (req.cookies.admin) {
            portfolioID = req.params.portfolioID;

            portfolio.findOne({"_id": portfolioID}, function (err, data) {
                res.render("admin/portfolio/update", {"data": data});
            });
        }
    } );

    app.post("/hd-admin/portfolio/updated/:portfolioID", function (req, res) {
        if (req.cookies.admin) {
            portfolioID    = req.params.portfolioID;

            var titleEN    = req.body.titleEN,
                titleFR    = req.body.titleFR,
                titleES    = req.body.titleES,

                contentEN  = req.body.contentEN,
                contentFR  = req.body.contentFR,
                contentES  = req.body.contentES,

                img1       = req.body.img1,
                img2       = req.body.img2,
                img3       = req.body.img3,
                date       = moment().format("DD/MM/YYYY"),
                author     = "Harmony_dev",
                category   = req.body.category,
                url        = req.body.url;

                portfolio.findOne({"_id": portfolioID}, function (err, data) {
                    data.titleEN   = titleEN;
                    data.titleFR   = titleFR;
                    data.titleES   = titleES;

                    data.contentEN = contentEN;
                    data.contentFR = contentFR;
                    data.contentES = contentES;

                    data.img[0]    ="/uploads/" + img1;
                    data.img[1]    ="/uploads/" + img2;
                    data.img[2]    ="/uploads/" + img3;

                    data.date      = date;
                    data.author    = author;
                    data.category  = category;
                    data.url       = url;

                    data.save();
                });

                portfolio.find(function (err, data) {
                    res.render("admin/portfolio/index", {"data": data});
                }).sort({date: -1});
        } else {
            res.redirect("/");
        }
    });

    app.post("/hd-admin/portfolio/delete", function (req, res) {
        if (req.cookies.admin) {
            portfolio.remove({"_id": req.body.portfolioID}, function (err, data) {});
        } else {
            res.status(404).send("Sorry you can't go here!");
        }
    } );

    app.get("/hd-admin/logout", function (req, res) {
        // supprime le cookie admin
        res.clearCookie("admin", {path: "/"});
        res.redirect("/");
    });

};
// Pour ajouter des image, il faut rajouter l'image dans le dossier assets/uploads et push heroku
