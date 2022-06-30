const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
cookieParser = require('cookie-parser');
app.use(cookieParser('secret key'));
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));


const dataRouter = require("./routes/DataRouter.js");
app.use(dataRouter);

mongoose.connect("mongodb+srv://sweettv:qwerty123@cluster0.gfdiopl.mongodb.net/sweettv", { useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(port, () => {
        console.log("Сервер ожидает подключения...");
    });
});