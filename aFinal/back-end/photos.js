const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const stands = require("./stands.js");
const Stand = stands.model;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  stand: {
    type: mongoose.Schema.ObjectId,
    ref: 'Stand',
  },
  path: String,
  title: String,
  description: String,
  bid: Number,
  bidder: Object,
  increment: Number,
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);

// upload photo
router.post("/:standID", validUser, upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const photo = new Photo({
    stand: req.params.standID,
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
    bid: req.body.bid,
    increment: req.body.increment,
    bidder: null,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my photos
router.get("/", validUser, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user,
    }).sort({
      created: -1
    }).populate('user').populate('stand');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get stand photos
router.get("/:standID", validUser, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user,
      stand: req.params.standID,
    }).sort({
      created: -1
    }).populate('user').populate('stand');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// ****REDUNDANT***** get one stand photos
router.get("/one/:standID", async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      stand: req.params.standID,
    }).sort({
      created: -1
    }).populate('user').populate('stand');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


// get all photos by stand
router.get("/all/:standID", async (req, res) => {
  try {
    let photos = await Photo.find({
        stand: req.params.standID,
  }).sort({
      created: -1
    }).populate('user').populate('stand');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get one photo
router.get("/:photoID", async (req, res) => {
  try {
    let photo = await Photo.findOne({
        _id:req.params.photoID,
    }).populate('user').populate('stand');
      if (!photo) {
          return res.send(404);
      }
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// owner edit photo item
router.put("/:photoID", async (req, res) => {
  try {
    let photo = await Photo.findOne({
        _id:req.params.photoID,
    }).populate('user').populate('stand');
      if (!photo) {
          return res.send(404);
      }
      photo.title = req.body.title;
      photo.description = req.body.description;
      photo.bid = req.body.bid;
      photo.increment = req.body.increment;
      photo.bidder = null;
      await photo.save();
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// bid on photo item
router.put("/bid/:photoID", validUser, async (req, res) => {
  try {
    let photo = await Photo.findOne({
        _id:req.params.photoID,
    }).populate('user').populate('stand');
      if (!photo) {
          return res.send(404);
      }
      photo.bid = req.body.bid;
      photo.bidder = req.user;
      await photo.save();
    return res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Delete photo item
router.delete('/:photoID', async (req, res) => {
  try {
    await Photo.deleteOne({
        _id: req.params.photoID
    });
      res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  model: Photo,
  routes: router,
}
