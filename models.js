var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var ObjectId = mongoose.Schema.Types.ObjectId;

var basicForumSchema = new mongoose.Schema({
	name: String,
	date: Date
});

var basicSubforumSchema = new mongoose.Schema({
	name: String,
	date: Date,
	description: String,
	parentID: ObjectId,
	forumIndex: Number,
	numPosts: Number,
	subforumIndex: Number,
});

var basicThreadSchema = new mongoose.Schema({
	title: String,
	date: Date,
	username: String,
	thumbnail: String,
	parentID: ObjectId
});

var basicPostSchema = new mongoose.Schema({
	content: String,
	date: Date,
	username: String,
	images: [String],
	parentID: ObjectId
});

var basicUserSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	name: String,
	numPosts: [Number],
	bio: String,
	websiteURL: String,
	birthdate: Date,
	profilePicture: String,
	joined: Date
})

var forums = mongoose.model('forum', basicForumSchema);
var subforums = mongoose.model('subforum', basicSubforumSchema);
var threads = mongoose.model('thread', basicThreadSchema);
var posts = mongoose.model('post', basicPostSchema);
var users = mongoose.model('user', basicUserSchema);

module.exports = {
	forums: forums,
	subforums: subforums,
	threads: threads,
	posts: posts,
	users: users
};

module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	users.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if (err) throw err;
    	callback(null, isMatch);
	});
}

module.exports.getUserById = function(id, callback) {
	users.findById(id, callback);
}