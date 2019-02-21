var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/3DArtistsForum');
var ObjectId = mongoose.Types.ObjectId;

var verbose = 2;
var setup = false;

var models = require('../models');


if (setup) {

	/*
	var forums = [];

	//create forums collections and documents
	forums.push(new models.forums({ name: 'Artwork', date: new Date() }));				// 0
	forums.push(new models.forums({ name: 'Support', date: new Date() }));				// 1
	forums.push(new models.forums({ name: 'Coding', date: new Date() }));				// 2
	forums.push(new models.forums({ name: 'Contests', date: new Date() }));				// 3
	forums.push(new models.forums({ name: 'Jobs', date: new Date() }));					// 4
	forums.push(new models.forums({ name: 'General Forums', date: new Date() }));		// 5


	// populate forums collection
	var i = 0;

	for (i = 0; i < forums.length; i++) {
		forums[i].save(function(err, doc) {
			if (err) {
				console.log('forum not saved!', err);
			} else {
				console.log('forum saved!');
			}
		});
	}



	var subforums = [[],[],[],[],[],[]]; // first dimension length must match number of forum categories (length of forums document array)

	subforums[0].push(new models.subforums({ name: 'Forum Gallery', date: new Date(), description: "Your best artworks", parentID: new ObjectId(), forumIndex: 0}));
	subforums[0].push(new models.subforums({ name: 'Finished Projects', date: new Date(), description: "All your finished projects", parentID: new ObjectId(), forumIndex: 0}));
	subforums[0].push(new models.subforums({ name: 'Focused Critiques', date: new Date(), description: "Where you can get focused critiques", parentID: new ObjectId(), forumIndex: 0}));
	subforums[0].push(new models.subforums({ name: 'Sketchbooks', date: new Date(), description: "A place to put your personal sketchbooks", parentID: new ObjectId(), forumIndex: 0}));
	subforums[0].push(new models.subforums({ name: 'Animations', date: new Date(), description: "All your animation projects", parentID: new ObjectId(), forumIndex: 0})); // should change ObjectId to point to parent
	subforums[0].push(new models.subforums({ name: 'Blender Tests', date: new Date(), description: "All your experiments and tests", parentID: new ObjectId(), forumIndex: 0}));
	subforums[0].push(new models.subforums({ name: 'Traditional', date: new Date(), description: "Traditional mediums such as pencil and paper", parentID: new ObjectId(), forumIndex: 0}));

	subforums[1].push(new models.subforums({ name: 'Tutorials, Tips and Tricks', date: new Date(), description: "Tutorials, tips and tricks", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Basics and Interface', date: new Date(), description: "Q&A for newbies", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Modeling', date: new Date(), description: "Q&A about modeling", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Materials and Textures', date: new Date(), description: "Q&A about materials and texturing", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Particles and Physics Simulations', date: new Date(), description: "Q&A about particles and physics simulations", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Lighting and Rendering', date: new Date(), description: "Q&A about lighting and rendering", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Animation and Rigging', date: new Date(), description: "Q&A about animation and rigging", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Compositing and Post Processing', date: new Date(), description: "Q&A about compositing and post processing", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: 'Technical Support', date: new Date(), description: "Q&A related to hardware, drivers, and your favorite 3D program", parentID: new ObjectId(), forumIndex: 1}));
	subforums[1].push(new models.subforums({ name: '3D Artists Forum Support', date: new Date(), description: "Q&A related to this forum", parentID: new ObjectId(), forumIndex: 1}));

	subforums[2].push(new models.subforums({ name: 'Released Scripts and Themes', date: new Date(), description: "Scripts, addons, & themes", parentID: new ObjectId(), forumIndex: 2}));


	// save subforum documents
	var index = 0;
	var index2 = 0;

	for (index = 0; index < forums.length; index++) {
		console.log('echo: ' + index);
		for (index2 = 0; index2 < subforums[index].length; index2++) {
			subforums[index][index2].save(function (err, doc) {
				if (err) {
					console.log('subforum not saved!');
				} else {
					console.log('subforum saved!');
					console.log(doc);
				}
			});
		}
	}
	*/

	/*
	// this section has to be done as a second step
	models.forums.find({}).then( function (doc) {

		// get objectID and update subforums[n] parentID ...
		var i = 0;

		for (i = 0; i < doc.length; i++) {

			var id = doc[i]._id;

			if (verbose >= 1) console.log(id);

			// update parentID
			models.subforums.updateMany({forumIndex: i}, {parentID: id}, function(err, statusDoc) {
				if (err) {
					console.log(err);
				} else {
					console.log('subforum updated!' + i);
					console.log(statusDoc);
				}
			});
		}
	});
	*/

} else {
	console.log('setup skipped');
}



/* GET home page. */
router.get('/', function(req, res, next) {

	models.forums.find({}, function (err, doc) {

		return new Promise(function(resolve, reject) {
			resolve(doc);
			if (err) reject(err);
		});

	}).then( function(doc) {

		id = doc[0]._id;
		id_2 = doc[1]._id;
		id_3 = doc[2]._id;

		models.subforums.find({parentID: id}, function(err, firstDoc) {

			if (err) {
				console.log(err);
			} else {
				// console.log(firstDoc);
				return new Promise( function (resolve, reject) {
					resolve(firstDoc);
					if (err) reject(err);
				});
			}
		}).then( firstDoc => {

			models.subforums.find({parentID: id_2}, function(err, secondDoc) {

				if (err) {
					console.log(err);
				} else {

					var docArray = {
						Artwork: firstDoc,
						Support: secondDoc
					}
					if (verbose >= 2) {
						console.log('before passing: \n');
						console.log(docArray);
					}

					return new Promise( function (resolve, reject) {
						resolve(docArray);
					})
				}
			})
		}).then( (docArray) => {

			models.subforums.find({parentID: id_3}, function(err, thirdDoc) {

				return new Promise( function (resolve, reject) {
					if (err) {
						reject(err);
					} else {
						if (verbose >= 2) {
							console.log('after passsing: \n');
							console.log(docArray);
						}

						var subforumsDoc = {
							Artwork: docArray,
							Support: docArray,
							Coding: thirdDoc
						}

						if (verbose >= 2) {
							console.log('\nsubforumDoc: \n');
							console.log(subforumsDoc);
						} 

						res.render('index', { title: '3D Artist Forum', forums: subforumsDoc});

						resolve('done');
					}
				});
			});
		});
	}).catch(err => {
		console.log('could not load forums collection', err);
	});
});

router.get('/subforum/:forumIndex/:subforumIndex', function (req, res, next) {
	var forumIndex = req.params.forumIndex;
	var subforumIndex = req.params.subforumIndex;

	models.forums.find({}).then( function (forumDoc) {

		return forumDoc;
	}).then( forumDoc => {

		models.subforums.find({}).then( function (subforumDoc) {

			var forumName = forumDoc[forumIndex].name;
			var subforumName = subforumDoc[subforumIndex].name;

			if (verbose >= 1) {
				console.log("forumName: " + forumName);
				console.log("subforumName: " + subforumName);
			}

			res.render('subforum', {title: subforumName});
		});
	})
})

module.exports = router;
