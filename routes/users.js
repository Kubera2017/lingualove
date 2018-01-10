var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

var Users = require('../models/users');
var Words = require('../models/words');

var usersRouter = express.Router();

usersRouter.route('/')
// List all users
    .get(function (req, res, next) {
        Users.find({}, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        })
    })
// Add new user
    .post(function (req, res, next) {
        Users.create(req.body, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    });


usersRouter.route('/:id')
// Get user's details
    .get(function (req, res, next) {
        Users.findById(req.params.id)
        .populate('words')
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
// Update user
    .put(function (req, res, next) {
        Users.findByIdAndUpdate(req.params.id,
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
// Delete user
    .delete(function (req, res, next) {
        Users.findByIdAndRemove(req.params.id, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            console.log(result);
            res.json(result);
        });
    })
// Add word
    .post(function (req, res, next) {
        Words.create(req.body, function (err, result) {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            let word_id = result._id;
            Users.findByIdAndUpdate(req.params.id,
                {$push: {'words': word_id}},
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
    });
 
usersRouter.route('/:id/words/:word_id')
    .delete(function (req, res, next) {
        Words.findByIdAndRemove(req.params.word_id)
        .exec((err, result) => {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            Users.findByIdAndUpdate(req.params.id,
                {$pull: {'words': word_id}},
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
        })
    });

usersRouter.route('/:id/test')
    .get(function (req, res, next) {
        Users.findById(req.params.id)
        .populate('words')
        .exec((err, result) => {
            if(err){
                console.log(err);
                err.status = 500;
                return next(err);
            }
            const set = 15;
            const lastAddedSet = 5;
            const worseRemSet = 10;

            if (result.words.length < set) {
                console.log(result.words);
                res.json(result.words);
            } else {
                let wordSet = [];
                let lastAdded = _.orderBy(result.words, 'createdAt', 'asc');
                for (let i = 0; i < lastAddedSet; i++) {
                    wordSet.push(lastAdded[i]);
                }

                result.words.forEach(element => {
                    let success = 0;
                    for (let i = 0; i < element.lessons.length; i++) {
                      if (element.lessons[i].result === true) {
                        success++;
                      }
                    }
                    if (element.lessons.length === 0) {
                      element.memorized = 0;
                    } else {
                      element.memorized = Math.round((success / element.lessons.length) * 100);
                    }
                });
                let worseRem = _.orderBy(result.words, 'memorized', 'asc');
                let count = 0;
                for (let i = 0; i < worseRem.length; i++) {
                    if (count >= worseRemSet) {
                        break;
                    } else {
                        let existed = false;
                        for (let j = 0; j < wordSet.length; j++){
                            if (worseRem[i]._id === wordSet[j]._id) {
                                existed = true;
                            }
                        }
                        if (existed === false) {
                            delete worseRem[i].memorized;
                            wordSet.push(worseRem[i]);
                            count++;
                        } else {
                            continue;
                        }
                    }
                }
                wordSet = _.shuffle(wordSet);
                console.log(wordSet);
                res.json(wordSet);
            }
        }
        );
    });


module.exports = usersRouter;