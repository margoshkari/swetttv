const Country = require("../models/country.js");
const Genre = require("../models/genres.js");
const YearModel = require("../models/year.js");
const Movie = require("../models/movie.js");

exports.addMovie = function (request, response) {
    response.render("movie.hbs");
};

exports.postMovie = async function (request, response) {
    if (!request.body) return response.sendStatus(400);

    const CountryName = request.body.CountryName;
    const GenreName = request.body.GenreName;
    const Year = request.body.Year;

    const country = new Country({ CountryName: CountryName });
    const genre = new Genre({ GenreName: GenreName });
    const year = new YearModel({ Year: Year });

    await Country.find({ CountryName: CountryName }).then(countries => {
        if (!countries[0]) {
            country.save(function (err) {
                if (err) return console.log(err);
            });
        }
    });
    await Genre.find({ GenreName: GenreName }).then(genres => {
        if (!genres[0]) {
            genre.save(function (err) {
                if (err) return console.log(err);
            });
        }
    });
    await YearModel.find({ Year: Year }).then(years => {
        if (!years[0]) {
            year.save(function (err) {
                if (err) return console.log(err);
            });
        }
    });
    var Image = request.body.Image;
    var MovieName = request.body.MovieName;
    var Info = request.body.Info;
    var MovieLink = request.body.MovieLink;

    var result;
    await Movie.find({ MovieName: MovieName }).then(movies => {
        result = movies;
    });

    if (result[0]) {
        response.redirect("/addMovie");
    }
    else {
        const movie = new Movie({ MovieName: MovieName, Info: Info, ImageName: Image, MovieLink: MovieLink, GenreName: GenreName, CountryName: CountryName, Year: Year });

        movie.save(function (err) {
            if (err) return console.log(err);
            response.redirect("/addMovie");
        });
    }

};

exports.getMovie = function (request, response) {
    if (!request.body) return response.sendStatus(400);

    var MovieName = request.body.movie;
    Movie.find({ MovieName: MovieName }).then(res => {
        if (!res[0]) {
            response.redirect("/");
        }
        else {
            response.render("movieInfo.hbs", {
                movies: res
            });
        }
    });
};