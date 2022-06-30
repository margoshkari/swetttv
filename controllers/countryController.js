const Country = require("../models/country.js");
const Movie = require("../models/movie.js");

exports.Country = async function (request, response) {
    response.render("country.hbs");
};

exports.postCountry = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const CountryName = request.body.CountryName;
    var result;

    await Country.find({ CountryName: CountryName }).then(res => {
        result = res;
    });

    if (result[0]) {
        response.redirect("/Country");
    }
    else {
        const country = new Country({ CountryName: CountryName });

        country.save(function (err) {
            if (err) return console.log(err);
            response.redirect("/Country");
        });
    }
};

exports.deleteCountry = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    var CountryName = request.body.CountryName;

    await Country.deleteOne({ CountryName: CountryName });
    await Movie.deleteMany({ CountryName: CountryName });

    response.redirect("/Country");
};