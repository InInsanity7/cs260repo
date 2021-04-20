const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;
const photos = require("./photos.js");
const Photo = photos.model;

// Comments schema and model
const commentSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  },
  photo: {
      type: mongoose.Schema.ObjectId,
      ref: 'Photo'
  },
  message: String,
  created: {
      type: Date,
      default: Date.now,
  },
});
const Comment = mongoose.model('Comment', commentSchema);


// post comment
router.post("/:photoID", validUser, async (req, res) => {
try {
  let photo = await Photo.findOne({
     _id:req.params.photoID,
  });
  if (!photo) {
     return res.send(404);
  }
  let comment = new Comment({
      user: req.user,
      photo: photo,
      message: req.body.message,
  })
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get comments
router.get("/:photoID", async (req, res) => {
try {
  let photo = await Photo.findOne({
     _id:req.params.photoID,
  });
  if (!photo) {
     return res.send(404);
  }
  let comments = await Comment.find({
      photo: photo,
  }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}

