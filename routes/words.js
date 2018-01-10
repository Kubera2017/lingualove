var express = require('express');
var mongoose = require('mongoose');

var Words = require('../models/words');

var wordsRouter = express.Router();

wordsRouter.route('/')
// List all words
    .get(function (req, res, next) {
        Words.find({}, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        })
    })
// Add new word
    .post(function (req, res, next) {
        Words.create(req.body, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    });


wordsRouter.route('/:id')
// Get word's details
    .get(function (req, res, next) {
        Words.findById(req.params.id)
        .exec(function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    })
// Update word
    .put(function (req, res, next) {
        Words.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        .exec(function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    })
// Delete
    .delete(function (req, res, next) {
        Words.findByIdAndRemove(req.params.id, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    })
// Write lesson's result
    .post(function (req, res, next) {
        Words.findByIdAndUpdate(req.params.id,
            {$push: {'lessons': req.body}},
            {'new': true},
            function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    });    

module.exports = wordsRouter;