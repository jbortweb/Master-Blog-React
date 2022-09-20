'use strict'

var validator = require('validator');
var Article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {

                                            // Metodos prueba

    datosCurso: (req, res) => {

        return res.status(200).send({
            curso: 'Master en Frameworks Js',
            autor: 'jbortweb',
            url: 'tuwebentrelineas.es'
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message:'Soy la accion test de mi controlador de articulos'
        });
    },

                                            // Metodos utiles

        // Matodo para guardar datos en la bd

    save: (req,res) => {
        
        // Recoger parametros por post

        var params = req.body;

        // Validar datos (validator)

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_title && validate_content) {
            
            //Crear el objeto a guardar

            var article = new Article();

            //Asignar valores

            article.title = params.title;
            article.content = params.content;

            if(params.image){
                article.image = params.image;
            }else{
                article.image = null;
            }
    
            //Guardar el articulo

            article.save((err, articleStored) => {

                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });    
                }
                
            //Devolver una respuesta
                
                    return res.status(200).send({
                        status : 'success',
                        article: articleStored
                    });
            });

                }else{
                return res.status(200).send({
                    status: 'error',
                    message: 'Los datos no son válidos'
                });
        }
    },

                                        // Metodo que devuelve todos los articulos

    getArticles: (req, res) => {

        var query = Article.find({});
        var last = req.params.last;
        
        if(last || last != undefined) {
            query.limit(5);
        }

        //Find para sacar los datos de la base de datos y sort para listarlos desde el mas reciente al último

        query.sort('-_id').exec((err, articles) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los artículos'
            });
            }
            if (!articles) {
                return res.status(400).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }

            return res.status(200).send({
                    status : 'success',
                    articles
                });
        });
    },

                                    //Metodo para mostrar un solo articulo

    getArticle: (req, res) => {

        // Recoger id de la url

        var articleId = req.params.id;

        //Comprobar que existe

        if(!articleId || articleId == null) {
            return res.status(400).send({
                status: 'error',
                message: 'No existe el artículo'
            });
        }

        //Buscar el articulo

        Article.findById(articleId, (err, article) => {

            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo'
                });
            }
            
            // Devolverlo

            return res.status(200).send({
                status: 'success',
                article
            });
        });        
    },

                                        //Metodo actualizar datos

    update: (req,res) => {

        // Reacoger la id del artículo por la URL

        var articleId = req.params.id;

        // Recoger los datos que llegan por PUT

        var params = req.body;

        //Validar datos

        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content){

            // Find and update
            Article.findByIdAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                if(err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article : articleUpdated
                });
            });
        }else {

            //Devolver respuesta
            
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        };
    },

                                        //Eliminar articulos
    
    delete: (req, res) => {

        //Recoger la id de la url

        var articleId = req.params.id;

        // Find and delete

        Article.findByIdAndDelete({_id: articleId}, (err, articleRemoved) =>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el artículo, posiblemente no exista'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },
                                        // Subir archivos

    upload: (req, res) => {

        // Configurar modulo connect multiparty router/article.js


        // Recoger el fichero de la petición

        var file_name = 'Imagen no subida';

        if(!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir nombre y extensión del archivo

        var file_path = req.files.file0.path;
        var file_split = file_path.split('/');

        var file_name = file_split[2];
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extensión, solo imagenes, si no es valido, borrar el fichero

        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {

            // Borrar archivo

            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                });
            })

        }else {
            
                    // Si todo es valido, sacamos la id de la url

                    var articleId = req.params.id;
            
                    // Buscar el artículo, asignarle el nombre de la imagen y actualizar

                if(articleId) {
                
                    Article.findOneAndUpdate({_id:articleId}, {image: file_name}, {new: true}, (err, articleUpdated) => {

                        if(err || !articleUpdated) {
                            return res.status(200).send({
                                status: 'error',
                                message: 'Error al guardar el archivo'
                            });
                        }

                        return res.status(200).send({
                            status: 'success',
                            article: articleUpdated
                        }); 
                    });
                }else {
                    return res.status(200).send({
                        status:'success',
                        image: file_name
                    });
                }                    
        };

    },  //End upload files

                                        // Metodo para mostrar imagen

    getImage :(req,res) => {
        var file= req.params.image;
        var path_file = '../upload/articles/' + file;

        if (fs.existsSync(path_file,)) {
            return res.sendFile(path.resolve(path_file));
        }else {
            return res.status(404).send({
                status: 'error',
                message: 'Ninguna imagen con ese nombre'
            });
        };
    },

                                        // Metodo para buscar articulos

    search : (req,res) => {

        // Sacar el string a buscar

        var searchString = req.params.search;

        // Find or, busca las coincidencias del string con el titulo y el contenido

        Article.find({ "$or": [
            { 'title': {"$regex": searchString, "$options": "i"}},
            { 'content': {"$regex": searchString, "$options": "i"}}
        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición'
                });
            }

            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })

    }

};           //End controller

module.exports = controller;