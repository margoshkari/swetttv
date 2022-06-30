const express = require("express");
const yearController = require("../controllers/yearController.js");
const genreController = require("../controllers/genreController.js");
const countryController = require("../controllers/countryController.js");
const movieController = require("../controllers/movieController.js");
const indexController = require("../controllers/indexController.js");
const authorizationController = require("../controllers/authorizationController.js");
const dataRouter = express.Router();

//----------FILTER----------
dataRouter.post("/filter", indexController.getMovieByFilter);

//----------AUTHIRIZATION----------
dataRouter.post("/postLogin", authorizationController.login);
dataRouter.post("/postRegister", authorizationController.register);

//----------REDIRECT TO PAGE----------
dataRouter.use("/admin", indexController.admin);
dataRouter.use("/register", authorizationController.startregister);
dataRouter.use("/login", authorizationController.startlogin);
dataRouter.use("/Year", yearController.Year);
dataRouter.use("/Genre", genreController.Genre);
dataRouter.use("/Country", countryController.Country);
dataRouter.use("/addMovie", movieController.addMovie);

//----------DELETE----------
dataRouter.post("/deleteYear", yearController.deleteYear);
dataRouter.post("/deleteGenre", genreController.deleteGenre);
dataRouter.post("/deleteCountry", countryController.deleteCountry);
dataRouter.post("/deleteMovie", indexController.deleteMovie);

//----------ADD----------
dataRouter.post("/postYear", yearController.postYear);
dataRouter.post("/postGenre", genreController.postGenre);
dataRouter.post("/postCountry", countryController.postCountry);
dataRouter.post("/postMovie", movieController.postMovie);

//----------GET INFO----------
dataRouter.post("/movieinfo", movieController.getMovie);


dataRouter.use("/", indexController.index);


module.exports = dataRouter;