const Genre = require("../models/genres.js");
const Movie = require("../models/movie.js");

exports.Genre = function (request, response){
    response.render("genres.hbs");
};

exports.postGenre= async function(request, response){
    if(!request.body) return response.sendStatus(400);
    const GenreName = request.body.GenreName;
    var result;
    await Genre.find({ GenreName: GenreName }).then(res => 
        {
            result = res;
        });
if(result[0]){
    response.redirect("/Genre");
}
else{
    const genre = new Genre({GenreName: GenreName});

    genre.save(function(err){
        if(err) return console.log(err);
        response.redirect("/Genre");
    });
}
    
};

exports.deleteGenre = async function (request, response) {
    if (!request.body) return response.sendStatus(400);
    var GenreName = request.body.GenreName;

    await Genre.deleteOne({ GenreName: GenreName });
    await Movie.deleteMany({ GenreName: GenreName });

    response.redirect("/Genre");
};