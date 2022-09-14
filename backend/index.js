'use strict'

                //Conectamos con mongodb

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true})
    .then(() => {

        //Crear servidor y escuchar peticiones

        app.listen(port, () => {
            console.log('Servidor corriendo en localhost:3900');
        });
    });