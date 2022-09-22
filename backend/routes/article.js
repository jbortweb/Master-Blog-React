'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

var multipart = require("connect-multiparty");
var md_upload = multipart({uploadDir: "../upload/articles"});
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../upload/articles')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' 
      + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});
var uploading = multer({
  storage: storage,
  limits: {fileSize: 1000000, files:1},
}
).single('imagen');

// en las rutas agregas esto

//Rutas prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas utiles

router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id', md_upload, ArticleController.upload);
router.post('/upload-image/:id', uploading, ArticleController.upload, (req, res) => {});
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);


module.exports = router;