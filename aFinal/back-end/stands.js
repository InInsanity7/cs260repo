const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const users = require("./users.js");
const User = users.model;
const validUser = users.valid;
// const photos = require("./photos.js");
// const Photo = photos.model;

// Comments schema and model
const standSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
  },
  title: String,
});
const Stand = mongoose.model('Stand', standSchema);


// post stand
router.post("/", validUser, async (req, res) => {
try {
  let stand = new Stand({
      user: req.user,
      title: req.body.title,
  })
    await stand.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all stands
router.get("/", async (req, res) => {
  try {
    let stands = await Stand.find().populate('user');
    return res.send(stands);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get user's stands
router.get("/user", validUser, async (req, res) => {
  try {
    let stands = await Stand.find({
        user: req.user,
    }).populate('user');
    return res.send(stands);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get one stand
router.get("/:standID", async (req, res) => {
  try {
    let stand = await Stand.findOne({
        _id:req.params.standID,
    }).populate('user');
      if (!stand) {
          return res.send(404);
      }
    return res.send(stand);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// edit stand
router.put("/:standID", async (req, res) => {
  try {
    let stand = await Stand.findOne({
        _id:req.params.standID,
    }).populate('user');
      if (!stand) {
          return res.send(404);
      }
      stand.title = req.body.title;
      await stand.save();
    return res.send(stand);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//Delete stand
router.delete('/:standID', async (req, res) => {
  try {
    await Stand.deleteOne({
        _id: req.params.standID
    });
      if (!stand) {
          return res.send(404);
      }
      res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  model: Stand,
  routes: router,
}

