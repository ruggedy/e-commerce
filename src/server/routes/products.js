var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');

var Product = require('../models/product');
var Category = require('../models/category');

var DIR = './uploads/';
var upload = multer({
                        dest: DIR,
                        rename: function (fieldname, filename, mimetype) {
                            return filename + Date.now()+ mimetype;
                        }
                      });


router.get('/', function (req, res, next) {
    Product.find()
        .populate('category', 'title')
        .exec(function (err, docs) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if (docs[0] === undefined) {
                return res.status(404).json({
                    title: 'an error occured',
                    error: 'The document is empty'
                })
            }
            res.setHeader('Content-Type', docs[0].image[0].imageType);
            fs.createReadStream(docs[0].image[0].imagePath).pipe(res);
            res.status(200).json({
                title: 'Success',
                obj: docs
            });
        });
});


router.post('/', upload.array('image[]', 10), function (req, res, next) {
    console.log(req.body);
    Category.find({'_id':{
        $in : req.body.categoryId.map(function(o){return mongoose.Types.ObjectId(o);})
    }}, function(err, docs){
        var product = new Product();
        for (i = 0; i < req.files.length; i++) {
            product.image.push({imagePath: req.files[i].path, imageFileName: req.files[i].filename, imageType: req.files[i].mimetype});
            }
            product.desc= req.body.description;
            product.price= req.body.price;
            product.stock = req.body.stock;
            product.category= docs;
            console.log(product);

        product.save(function (err, result) {
            if (err) {
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }

            for (i = 0; i < docs.length; i++){
                docs[i].products.push(result);
                docs[i].save();
            }

            res.status(201).json({
                message: 'Saved Product',
                obj: result
            });
        });
    });
});

module.exports = router;