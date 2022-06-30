const User = require("../models/user.js");


exports.startlogin = function (request, response) {
    response.render("login.hbs");
};

exports.login = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const login = request.body.login;
    const password = request.body.password;
    var result;
    await User.find({ Login: login, Password: password }).then(res => {
        result = res;
    });
    if (result[0]) {
        response.cookie('login', login);
        response.redirect("/");
    }
    else{
        response.redirect("/login");
    }
};

exports.startregister = function (request, response) {
    response.render("register.hbs");
};

exports.register = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const login = request.body.login;
    const email = request.body.email;
    const password = request.body.password;
    var result;
    var result2;
    await User.find({ Login: login }).then(res => {
        result = res;
    });
    await User.find({ Email: email }).then(res => {
        result2 = res;
    });

    if (result[0] || result2[0]) {
        response.redirect("/register");
    }
    else {
        const user = new User({ Login: login, Email: email, Password: password });

        user.save(function (err) {
            if (err) return console.log(err);
            response.redirect("/login");
        });
    }
};