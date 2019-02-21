var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/3DArtistsForum', { useNewUrlParser: true});
var ObjectId = mongoose.Types.ObjectId;

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var multiparty = require('multiparty');
var fs = require('fs');

var verbose = 0;
var setup = false;

var models = require('../models');

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const resize = require('../resize');
const resizeImage = require('../resize-image');

router.get('/resize', async (req, res, next) => {
    var width = 100;
    var height = 100;
    const format = 'png';

    resizeImage('3aKcWWrSWVkjiCEmnCILY2tN', format, width, height, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
});

if (setup) {

    /*
    var forums = [];

    //create forums collections and documents
    forums.push(new models.forums({ name: 'Artwork', date: new Date() }));              // 0
    forums.push(new models.forums({ name: 'Support', date: new Date() }));              // 1
    forums.push(new models.forums({ name: 'Coding', date: new Date() }));               // 2
    forums.push(new models.forums({ name: 'Contests', date: new Date() }));             // 3
    forums.push(new models.forums({ name: 'Jobs', date: new Date() }));                 // 4
    forums.push(new models.forums({ name: 'General Forums', date: new Date() }));       // 5


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
    */
    
    /*
    var subforums = [[],[],[],[],[],[]]; // first dimension length must match number of forum categories (length of forums document array)
    var subforumIndex = 0;

    subforums[0].push(new models.subforums({ name: 'Forum Gallery', date: new Date(), description: "Your best artworks", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[0].push(new models.subforums({ name: 'Finished Projects', date: new Date(), description: "All your finished projects", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[0].push(new models.subforums({ name: 'Focused Critiques', date: new Date(), description: "Where you can get focused critiques", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[0].push(new models.subforums({ name: 'Sketchbooks', date: new Date(), description: "A place to put your personal sketchbooks", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[0].push(new models.subforums({ name: 'Animations', date: new Date(), description: "All your animation projects", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0})); // should change ObjectId to point to parent
    subforumIndex++;
    subforums[0].push(new models.subforums({ name: 'Blender Tests', date: new Date(), description: "All your experiments and tests", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[0].push(new models.subforums({ name: 'Traditional', date: new Date(), description: "Traditional mediums such as pencil and paper", parentID: new ObjectId(), forumIndex: 0, subforumIndex: subforumIndex, numPosts: 0}));

    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Tutorials, Tips and Tricks', date: new Date(), description: "Tutorials, tips and tricks", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Basics and Interface', date: new Date(), description: "Q&A for newbies", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Modeling', date: new Date(), description: "Q&A about modeling", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Materials and Textures', date: new Date(), description: "Q&A about materials and texturing", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Particles and Physics Simulations', date: new Date(), description: "Q&A about particles and physics simulations", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Lighting and Rendering', date: new Date(), description: "Q&A about lighting and rendering", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Animation and Rigging', date: new Date(), description: "Q&A about animation and rigging", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: 'Compositing and Post Processing', date: new Date(), description: "Q&A about compositing and post processing", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    // some sort of problem with this one where it was not showing
    subforums[1].push(new models.subforums({ name: 'Technical Support', date: new Date(), description: "Q&A related to hardware, drivers, and your favorite 3D program", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));
    subforumIndex++;
    subforums[1].push(new models.subforums({ name: '3D Artists Forum Support', date: new Date(), description: "Q&A related to this forum", parentID: new ObjectId(), forumIndex: 1, subforumIndex: subforumIndex, numPosts: 0}));

    subforumIndex++;
    subforums[2].push(new models.subforums({ name: 'Released Scripts and Themes', date: new Date(), description: "Scripts, addons, & themes", parentID: new ObjectId(), forumIndex: 2, subforumIndex: subforumIndex, numPosts: 0}));


    // save subforum documents
    var index = 0;
    var index2 = 0;

    for (index = 0; index < 3; index++) {
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

    console.log('setup completed!');

} else {
    console.log('setup skipped');
}

// setup local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    models.getUserByUsername(username, function(err, user) {
        if (err) throw err;
        if (!user) {
            return done(null, false, {message: 'Unknown user'});
        }

        models.comparePassword(password, user.password, function(err, isMatch){
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid password'});
            }
        });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  models.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/login', async (req, res, next) => {
    try {
        res.render('login', {title: 'Login'});
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', passport.authenticate('local', {successReturnToOrRedirect: '/', failureRedirect: '/login', failureFlash: true}),
 async (req, res, next) => {
    try {
        req.flash('success_msg', 'You are now logged in');

    } catch (err) {
        console.log(err);
    }
});

router.get('/logout', ensureAuthenticated, function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/login');
})

router.get('/register', async (req, res, next) => {
    try {
        res.render('register', {title: 'Register'});
    } catch (err) {
        console.log(err);
    }
});

router.post('/register', async function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    console.log(name, email, username, password, passwordConfirm);

    //Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('passwordConfirm', 'Passwords do not match').equals(req.body.password);

    let users = await models.users.find({}).lean();
    var i;
    for (i = 0; i < users.length; i++) {
        req.checkBody('username', 'Username already taken!').not().equals(users[i].username);
    }

    var errors = req.validationErrors();

    if(errors) {
        res.render('register', {title: "Register", errors: errors});
    } else {
        var numPosts = await getNumPosts();

        if (verbose >= 2) {
            console.log('numPosts: ');
            console.log(numPosts);
        }

        var newUser = new models.users({
            name: name,
            email: email,
            username: username,
            password: password,
            numPosts: numPosts,
            joined: new Date()
        });

        models.createUser(newUser, function(err, user) {
            if (err) throw err;
            console.log(user);
        });

        req.flash('success_msg', 'You are registered and can now log in');

        res.redirect('/login');
    }
});

var getNumPosts = async function () {

    return new Promise(async function(resolve, reject) {
        let subforums = await models.subforums.find({}).lean();

        if (verbose >= 1) console.log('getNumPosts() called');

        var numPosts = [];
        var i;
        for (i = 0; i < subforums.length; i++) {
            numPosts.push(subforums[i].numPosts);
            if (verbose >= 1) console.log('i++ ' + i);
        }

        if (verbose >= 1) console.log(numPosts);

        resolve(numPosts);
    });
}

router.post('/update-user', ensureAuthenticated, async (req, res, next) => {
    try {
        var username = req.user.username;

        var options = {
            maxFilesSize: 30 * 1024 * 1024,
            uploadDir: 'C:\\node.js_forum\\project\\nodejs_forum_2\\public\\images', // you have to always use '\\'
            autoFiles: true
        }

        var form = new multiparty.Form(options);


        form.on('error', function (err) {
            console.log('error parsing form: ' + err.stack);
        });

        form.on('close', function() {
            console.log('Upload completed!');
        });
        

        form.parse(req, async (err, fields, files) => {

            var bioText = fields.bioText[0];
            var url = fields.url[0];
            var name = fields.name[0];
            var email = fields.email[0];
            var birthdate = fields.birthdate[0];

            var tmpPath = files.profilePicture[0].path;
            var extIndex = tmpPath.lastIndexOf('\\');
            var filename = (extIndex < 0) ? '' : tmpPath.substr(extIndex+1);
            
            models.users.findOneAndUpdate({username: username}, {bio: bioText, websiteURL: url, name: name, email: email, birthdate: birthdate, profilePicture: filename}, {}, function() {
                console.log('updated user');
            });

            res.redirect('/profile/' + username);
            res.status(200).end();
        });

    } catch (err) {
        // res.render('error', {title: 'Internal Server Error 500'});
        res.send('Internal Server Error 500');
        res.status(500).end();
        return console.log(err);
    }
});

router.get('/update-user', ensureAuthenticated, async (req, res, next) => {
    try {

        res.render('update-user', {title: "Update profile", updateProfile: true});
    } catch (err) {
        res.send('Internal Server Error 500');
        res.status(500).end();
        return console.log(err);
    }
});

router.post('/update-count/:threadID', async (req, res, next) => {
    try {
        // get subforum index
        var threadID = req.params.threadID;
        let thread = await models.threads.findOne({_id: threadID}).lean();
        var subforumID = thread.parentID;
        let subforum = await models.subforums.findOne({_id: subforumID}).lean();
        var index = subforum.subforumIndex;

        // console.log(subforumID);

        // update user numPosts array
        let user = await models.users.findOne({username: req.user.username}).lean();
        if (verbose >= 1) console.log('user: ');
        if (verbose >= 1) console.log(user);
        var newNumPosts = user.numPosts;

        var numPosts = await getNumPosts();

        newNumPosts[index] = numPosts[index]; // set number of posts

        // update new number of posts
        models.users.findOneAndUpdate({username: req.user.username}, {numPosts: newNumPosts}, {}, function() {
            console.log('updated successfully');
        });

        res.send('update received');
        res.status(200).end();

    } catch (err) {
        res.send('Internal Server Error 500');
        res.status(500).end();
        return console.log(err);
    }
});

router.get('/get-count', async (req, res, next) => {
    try {

        var numNewPosts = await getNumNewPosts(req);

        // respond with count array
        res.send(numNewPosts);
        res.status(200).end();
    } catch (err) {
        res.send('Could not load new posts count');
        res.status(500).end();
        return console.log(err);
    }
});

var getNumNewPosts = async function(req) {

    // console.log(req.user);

    return new Promise(async function (resolve, reject) {
        if (req.user) {
            // if logged in, use req.user.username to find numPosts
            let user = await models.users.findOne({username: req.user.username}).lean();

            if (verbose >= 2) {
                console.log('user: ');
                console.log(user);
            }

            var userNumPosts = user.numPosts;   // have to create schema and new user

            if (verbose >= 2) {
                console.log('userNumPosts: ');
                console.log(userNumPosts);
            }

            let subforums = await models.subforums.find({}).lean();

            var currentNumPosts = [];
            var i;
            for (i = 0; i < subforums.length; i++) {
                currentNumPosts.push(subforums[i].numPosts);
            }

            if (verbose >= 2) {
                console.log('currentNumPosts: ');
                console.log(currentNumPosts);
            }

            var numNewPosts = [];
            for (i = 0; i < currentNumPosts.length; i++) {
                numNewPosts.push(currentNumPosts[i] - userNumPosts[i]);
            }

            if (verbose >= 2) {
                console.log('numNewPosts: ');
                console.log(numNewPosts);
            }

            /* document structure:
                { Artwork: subforums, Support: subforums, Coding: subforums }
                { Users: users }
            */

            resolve(numNewPosts);
        } else {
            console.log('no req.user');
            reject('user not logged in!');
        }
    });
}

router.post('/delete-thread/:threadID', async (req, res, next) => {
    try {
        var threadID = req.params.threadID;

        models.threads.findOneAndDelete({_id: threadID}, {}, function(doc) {
            console.log('deleted thread!');
        });
        models.posts.deleteMany({parentID: threadID}, {}, function(doc) {
            console.log('deleted posts!');
        });

        req.flash('success_msg', 'Thread deleted!');
        res.redirect('/');
    } catch (err) {
        return console.log(err);
    }
});

router.get('/', async (req, res, next) => {
    try{
        let doc = await models.forums.find({}).lean();
        let firstDoc = await models.subforums.find({parentID: doc[0]._id }).lean();
        let secondDoc = await models.subforums.find({parentID: doc[1]._id }).lean();
        let thirdDoc = await models.subforums.find({parentID: doc[2]._id }).lean();
        var docArray = {  Artwork: firstDoc, Support: secondDoc, Coding: thirdDoc };

        let posts = await models.threads.find({}).lean();

        var n;
        for (n = 0; n < 15; n++) {

        }

        var end = posts.length - 10;
        var latestPosts = [];
        var i;
        if (posts.length > 10) {
            for (i = posts.length; i > end; i--) {
                let subforum = await models.subforums.findOne({_id: posts[(i-1)].parentID}).lean();
                latestPosts.push({
                    post: posts[(i-1)],
                    subforum: subforum.name
                });
            }
        } else if (posts.length <= 10) {
            for (i = posts.length; i > 0; i--) {
                let subforum = await models.subforums.findOne({_id: posts[(i-1)].parentID}).lean();
                latestPosts.push({
                    post: posts[(i-1)],
                    subforum: subforum.name
                });
            }
        }

        if (verbose >= 2) {
            console.log('docArray: \n');
            console.log(docArray);
        }

        res.render('index', { title: '3D Artist Forum', forums: docArray, latestPosts: latestPosts});

    }catch(err){
        return console.log(err)
    }
});

router.get('/subforum/:subforumID', async (req, res, next) => {
    try {
        var subforumIDString = req.params.subforumID;       // this can be the suforumID
        var subforumID = new ObjectId(subforumIDString);    // probably don't need this line

        let subforum = await models.subforums.findOne({_id: subforumID}).lean();
        if (subforum == null) console.log('subforum is null!');
        let forum = await models.forums.findOne({_id: subforum.parentID}).lean();

        var forumName = forum.name;
        var subforumName = subforum.name;

        let threads = await models.threads.find({parentID: subforumID}).sort({date: -1}).lean();

        if (verbose >= 1) {
            console.log("forumName: " + forumName);
            console.log("subforumName: " + subforumName);
        }

        res.render('subforum', {title: subforumName, subforumID: subforumID, threads: threads});

    } catch (err) {
        return console.log(err);
    }
});

router.get('/new-thread/:subforumID', ensureLoggedIn('/login'), ensureAuthenticated, async (req, res, next) => {
    try {
        var subforumID = req.params.subforumID;

        let subforum = await models.subforums.findOne({_id: subforumID}).lean();
        let forum = await models.forums.findOne({_id: subforum.parentID}).lean();

        var forumName = forum.name;
        var subforumName = subforum.name;

        if (verbose >= 1) {
            console.log("forumName: " + forumName);
            console.log("subforumName: " + subforumName);
        }

        res.render('new-thread', {title: 'New Thread', forumName: forumName, subforumName: subforumName, subforumID: subforumID});

    } catch (err) {
        console.log(err);
    }
});

//change this route next!
router.post('/create-thread/:subforumID', ensureLoggedIn('/login'), ensureAuthenticated, async (req, res, next) => {
    try {
        // note: thumbnails should be automatically added to first post

        var options = {
            maxFilesSize: 30 * 1024 * 1024,
            uploadDir: 'C:\\node.js_forum\\project\\nodejs_forum_2\\public\\images', // you have to always use '\\'
            autoFiles: true
        }

        var form = new multiparty.Form(options);


        form.on('error', function (err) {
            console.log('error parsing form: ' + err.stack);
        });

        form.on('close', function() {
            console.log('Upload completed!');
        });
        

        form.parse(req, async (err, fields, files) => {

            if (verbose >= 1) {
                console.log('fields: ', fields);
                console.log('files: ', files);
                console.log('Recieved ' + files.images.length + ' images!');
            }

            var subforumIDString = req.params.subforumID;
            var subforumID = new ObjectId(subforumIDString);

            var username = req.user.username;
            console.log('username: ' + username);
            var threadTitle = fields.title[0];
            var threadContent = fields.content[0];
            // var thumbnail_url = files.thumbnail[0].path; // don't need this line now

            //cycle through images and extract filenames
            var imageFilenames = [];
            var tmpPath;
            var extIndex;
            var i = 0;
            for (i = 0; i < files.images.length; i++) {
                tmpPath = files.images[i].path;
                extIndex = tmpPath.lastIndexOf('\\');
                console.log('extIndex: ' + extIndex.toString());
                imageFilenames.push((extIndex < 0) ? '' : tmpPath.substr(extIndex+1));
            }

            if (verbose >= 1) {
                console.log(imageFilenames[0]);
            }
            var format = 'png';
            resizeImage(imageFilenames[0], format, 100, 100, function(err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
                }
            });
            var index = imageFilenames[0].lastIndexOf('.');
            var filename_no_suffix = imageFilenames[0].substring(0, index);
            var thumbnail = filename_no_suffix + '_thumbnail.' + format;

            // get count from subforum
            let subforum = await models.subforums.findOne({_id: subforumID}).lean();

            var numPosts = subforum.numPosts + 1;

            //update count in subforum
            models.subforums.findOneAndUpdate({_id: subforumID}, {numPosts: numPosts}, function() {
                console.log('numPosts for ' + subforum.name + ' updated to: ' + numPosts);
            });

            
            if (verbose >= 1) {
                console.log('subforumID: ' + subforumID);
                console.log('username: ' + username);
                console.log('threadTitle: ' + threadTitle);
                console.log('threadContent: ' + threadContent);
            }
            

            //set threadID
            var threadID = new ObjectId();

            // save thread
            let thread = new models.threads({title: threadTitle, date: new Date(), username: username, parentID: subforumID, _id: threadID, thumbnail: thumbnail});
            thread.save(function (err, doc) {
                if (err) {
                    console.log('thread not saved!');
                    console.log(err);
                } else {
                    console.log('thread saved');
                    console.log(doc);
                }
            });

            // save first post
            let post = new models.posts({content: threadContent, date: new Date(), username: username, parentID: threadID, images: imageFilenames});
            post.save(function (err, doc) {
                if (err) {
                    console.log("post not saved!");
                    console.log(err);
                } else {
                    console.log('post saved');
                    console.log(doc);
                }
            })

            //redirect to thread
            res.redirect(`/thread/${threadID}`);
        });

    } catch (err) {
        console.log(err);
    }
});

router.get('/thread/:threadID', async (req, res, next) => {
    try {
        var threadIDString = req.params.threadID;

        var threadID = new ObjectId(threadIDString);

        let thread = await models.threads.findOne({_id: threadID}).lean();
        let posts = await models.posts.find({parentID: threadID}).lean();
        var subforumID = thread.parentID;

        if (verbose >= 2) {
            console.log('thread: \n');
            console.log(thread);
            console.log('posts: \n');
            console.log(posts);
        }
        if (verbose >= 1) {
            console.log('thumbnail: ' + thread.thumbnail);
        }

        var canDelete = false;

        if (req.user) {
            if (req.user.username == thread.username) {
                console.log('usernames match!');
                canDelete = true;
            }
        }

        res.render('thread', {title: thread.title, date: thread.date, username: thread.username, posts: posts, threadID: threadID, subforumID: subforumID, thumbnail: thread.thumbnail, canDelete: canDelete});

    } catch (err) {
        console.log(err);
    }
});

router.post('/create-post/:threadID', ensureLoggedIn('/login'), ensureAuthenticated, async (req, res, next) => {
    try {

        // note: thumbnails should be automatically added to first post

        var options = {
            maxFilesSize: 30 * 1024 * 1024,
            uploadDir: 'C:\\node.js_forum\\project\\nodejs_forum_2\\public\\images', // you have to always use '\\'
            autoFiles: true
        }

        var form = new multiparty.Form(options);


        form.on('error', function (err) {
            console.log('error parsing form: ' + err.stack);
        });

        form.on('close', function() {
            console.log('Upload completed!');
        });
        
        form.parse(req, async (err, fields, files) => {

            if (verbose >= 1) {
                console.log('fields: ', fields);
                console.log('files: ', files);
                console.log('Recieved ' + files.images.length + ' images!');
            }

            var username = req.user.username;
            console.log('username: ' + username);
            var threadContent = fields.content[0];

            var threadIDString = req.params.threadID;
            var threadID = new ObjectId(threadIDString);

            // get subforumID - get rid of this later
            let thread = await models.threads.find({_id: threadID}).lean();
            var subforumIDString = thread.parentID;
            var subforumID = new ObjectId(subforumIDString);

            //cycle through images and extract filenames
            var imageFilenames = [];
            var tmpPath;
            var extIndex;
            var i = 0;
            for (i = 0; i < files.images.length; i++) {
                tmpPath = files.images[i].path;
                extIndex = tmpPath.lastIndexOf('\\');
                // console.log('extIndex: ' + extIndex.toString());
                imageFilenames.push((extIndex < 0) ? '' : tmpPath.substr(extIndex+1));
            }

            
            if (verbose >= 1) {
                console.log('subforumID: ' + subforumID);
                console.log('threadID: ' + threadID);
                console.log('username: ' + username);
                console.log('threadTitle: ' + threadTitle);
                console.log('threadContent: ' + threadContent);
            }

            let post = new models.posts({content: threadContent, date: new Date(), username: username, parentID: threadID, images: imageFilenames });
            post.save(function (err, doc) {
                if (err) {
                    console.log("post not saved!");
                    console.log(err);
                } else {
                    console.log('post saved');
                    console.log(doc);
                }
            });

            //redirect to thread
            res.redirect(`/thread/${threadID}`);
        });

    } catch (err) {
        console.log(err);
    }
});

router.get('/profile/:username', async (req, res, next) => {
    try {
        var username = req.params.username;

        let userData = await models.users.find({username: username}).lean();

        if (verbose >= 2) console.log(userData);

        res.render('profile', {title: 'Profile', userData: userData[0], isProfile: true});
    } catch (err) {
        return console.log(err);
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/login');
    }
}

module.exports = router;