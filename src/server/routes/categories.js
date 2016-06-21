var express = require('express');
var router = express.Router();

var Category = require('../models/category');

router.get('/', function (req, res, next) {
    Category.find()
            .exec(function (err, result) {
                if (err) {
                    return res.status(404).json({
                        title: 'An error occured',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Succesful',
                    obj: result
              });
        });
});

router.post('/', function (req, res, next) {
    var category = new Category({
        title: req.body.name
    });

    category.save(function (err, result) {
        if (err) {
            return res.status(404).json({
                title: 'An error occured',
                error: err
            })
        }

        res.status(201).json({
            message: 'Succesfully Created',
            obj: result
        })
    })
});


module.exports = router;