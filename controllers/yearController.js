const YearModel = require("../models/year.js");
const Movie = require("../models/movie.js");

exports.Year = function (request, response) {
    response.render("year.hbs");
};

exports.postYear = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    var Year = request.body.Year;
    var result;
    await YearModel.find({ Year: Year }).then(res => {
        result = res;
    });


    if (result[0]) {
        response.redirect("/Year");
    }
    else {
        const year = new YearModel({ Year: Year });

        year.save(function (err) {
            if (err) return console.log(err);
            response.redirect("/Year");
        });
    }

};

exports.deleteYear = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    var Year = request.body.Year;

    await YearModel.deleteOne({ Year: Year });
    await Movie.deleteMany({ Year: Year });

    response.redirect("/Year");
};