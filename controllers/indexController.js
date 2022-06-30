const Movie = require("../models/movie.js");
const Genre = require("../models/genres.js");
const Country = require("../models/country.js");
const YearModel = require("../models/year.js");

exports.index = async function (request, response) {

    var movieres;
    var genreres;
    var countryres;
    var yearres;
    await Movie.find({}).then(res => {
        movieres = res;

    });
    await Genre.find({}).then(res => {
        genreres = res;
    });
    await Country.find({}).then(res => {
        countryres = res;
    });
    await YearModel.find({}).sort('Year').then(res => {
        yearres = res;
    });

    var selectedgenreres = { GenreName: {GenreName: "All Movies"}};

    if (request.cookies['login'] == "admin") {
        response.redirect("/admin");
    }
    else {
        response.render("index.hbs", {
            movies: movieres,
            genres: genreres,
            countries: countryres,
            years: yearres,
            selectedgenres: selectedgenreres
        });
    }
};

exports.getMovieByFilter = async function (request, response) {
    if (!request.body) return response.sendStatus(400);

    var GenreName = request.body.genre;
    var CountryName = request.body.country;
    var Year = request.body.year;
    var movieres;
    var genreres;
    var countryres;
    var yearres;
    var selectedgenreres;
    var req = Select(GenreName, CountryName, Year);

    await Genre.find({}).then(res => {
        genreres = res;
    });
    await Genre.find({ GenreName: GenreName }).then(res => {
        selectedgenreres = res;
    });
    await Country.find({}).then(res => {
        countryres = res;
    });
    await YearModel.find({}).sort('Year').then(res => {
        yearres = res;
    });
    if (!selectedgenreres[0]) {
        selectedgenreres = { GenreName: {GenreName: "All Movies"}};
    }

    await Movie.find(req).then(res => {
        movieres = res;
    });

    if (request.cookies['login'] != "admin") {
        response.render("index.hbs", {
            movies: movieres,
            genres: genreres,
            countries: countryres,
            years: yearres,
            selectedgenres: selectedgenreres
        });
    }
    else {
        response.render("admin.hbs", {
            movies: movieres,
            genres: genreres,
            countries: countryres,
            years: yearres,
            selectedgenres: selectedgenreres
        });
    }
};

function Select(GenreName, CountryName, Year) {
    var req;
    if (GenreName != "" && CountryName != "" && Year != "")
        req = { GenreName: GenreName, CountryName: CountryName, Year: Year };
    else if (GenreName != "" && CountryName != "")
        req = { GenreName: GenreName, CountryName: CountryName };
    else if (GenreName != "" && Year != "")
        req = { GenreName: GenreName, Year: Year };
    else if (CountryName != "" && Year != "")
        req = { CountryName: CountryName, Year: Year };
    else if (GenreName != "")
        req = { GenreName: GenreName };
    else if (CountryName != "")
        req = { CountryName: CountryName };
    else if (Year != "")
        req = { Year: Year };

    return req;
}

exports.admin = async function (request, response) {

    if (request.cookies['login'] != "admin") {
        response.redirect("/");
    }
    var movieres;
    var genreres;
    var countryres;
    var yearres;
    await Movie.find({}).then(res => {
        movieres = res;

    });
    await Genre.find({}).then(res => {
        genreres = res;
    });
    await Country.find({}).then(res => {
        countryres = res;
    });
    await YearModel.find({}).sort('Year').then(res => {
        yearres = res;
    });
    var selectedgenreres = { GenreName: {GenreName: "All Movies"}};
    response.render("admin.hbs", {
        movies: movieres,
        genres: genreres,
        countries: countryres,
        years: yearres,
        selectedgenres: selectedgenreres
    });
};

exports.deleteMovie = async function (request, response) {

    if (!request.body) return response.sendStatus(400);
    var MovieName = request.body.movie;
    var movieres;
    var genreres;
    var countryres;
    var yearres;
    await Movie.deleteOne({ MovieName: MovieName });

    await Movie.find({}).then(res => {
        movieres = res;

    });
    await Genre.find({}).then(res => {
        genreres = res;
    });
    await Country.find({}).then(res => {
        countryres = res;
    });
    await YearModel.find({}).sort('Year').then(res => {
        yearres = res;
    });
    var selectedgenreres = { GenreName: {GenreName: "All Movies"}};
    response.render("admin.hbs", {
        movies: movieres,
        genres: genreres,
        countries: countryres,
        years: yearres,
        selectedgenres: selectedgenreres
    });
};