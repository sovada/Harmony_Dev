module.exports = function (app, admin, blog, portfolio, subscribe) {
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
        req.cookies.admin ? res.render("admin/blog") : res.redirect("/");
    });

    app.get("/hd-admin/portfolio", function (req, res) {
        req.cookies.admin ? res.render("admin/portfolio") : res.redirect("/");
    });

    app.get("/hd-admin/logout", function (req, res) {
        // supprime le cookie admin
        res.clearCookie("admin", {path: "/"});
        res.redirect("/");
    });
};