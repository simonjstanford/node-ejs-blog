const mongoose = require("mongoose");
const url = process.env.DB_CONNECTION;

var Schema = mongoose.Schema;

const postSchema = Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);

exports.createPost = function(title, content) {
  return new Post({title: title, content: content});
};

exports.addPost = function (post, callback) {
  openConnection();
  if (post) {
    post.save((err) => {
        if (err) {
            console.log(err)
        }
        mongoose.connection.close(() => callback());
    });
  }
};

exports.getPosts = function (callback) {
    openConnection();
    Post.find().lean().exec(function(err, posts) {
        if (err) {
        console.log(err)
        }
        mongoose.connection.close(() => callback(posts));
    });
};

exports.getPost = function (postId, callback) {
    openConnection();
    Post.findById(postId, function(err, post) {
        if (err) {
        console.log(err)
        }
        mongoose.connection.close(() => callback(post));
    });
};

function openConnection() {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
}
