var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/3DArtistsForum');
var ObjectId = mongoose.Types.ObjectId;

var verbose = 2;
var setup = false;

var models = require('../models');

router.get('/', async (req, res, next) => {
    try{
            let doc = await models.forums.find({}).lean();
            let firstDoc = await models.subforums.find({parentID: doc[0]._id }).lean();
            let secondDoc = await models.subforums.find({parentID: doc[1]._id }).lean();
            let thirdDoc = await models.subforums.find({parentID: doc[2]._id }).lean();
            var docArray = {  Artwork: firstDoc, Support: secondDoc, Coding: thirdDoc }

            if (verbose >= 2) {
                console.log('docArray: \n');
                console.log(docArray);
            }

            res.render('index', { title: '3D Artist Forum', forums: docArray});

    }catch(err){
        return console.log(err)
    }
});

module.exports = router;