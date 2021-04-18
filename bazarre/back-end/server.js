const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

//express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// connect to the database
mongoose.connect('mongodb://localhost:27017/bazarre', {
  useNewUrlParser: true
});

// Schema and Model for stands
const standSchema = new mongoose.Schema({
  atMarket: Boolean,
  expired: Boolean,
  title: String,
  // owner: String,
});
const Stand = mongoose.model('Stand', standSchema);

// Schema and Model for items
const itemSchema = new mongoose.Schema({
  project: {
      type: mongoose.Schema.ObjectId,
      ref: 'Stand'
  },
  title: String,
  description: String,
  path: String,
  bid: Number,
  increment: Number,
  hasBid: Boolean
});
const Item = mongoose.model('Item', itemSchema);

// new stand
app.post('/api/stands', async (req, res) => {
  const stand = new Stand({
      title: req.body.title,
      // owner: req.body.owner,
  });
  try {
    await stand.save();
    res.send(stand);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

// list stands
app.get('/api/stands', async (req, res) => {
    try {
        let stands = await Stand.find();
        res.send(stands);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

//Edit stand
app.put('/api/stands/:standID', async (req, res) => {
    try {
        let stand = await Stand.findOne({
            _id: req.params.standID
        });
        stand.title = req.body.title;
        stand.atMarket = req.body.atMarket;
        stand.expired = req.body.expired;
        await stand.save();
        res.send(stand);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

//Delete stand
app.delete('/api/stands/:standID', async (req, res) => {
  try {
    await Stand.deleteOne({
        _id: req.params.standID
    });
      res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

// new Item
app.post('/api/stands/:standID/items', async (req, res) => {
    try {
        let stand = await Stand.findOne({id: req.params.standID});
        if (!stand) {
            res.send(404);
            return;
        }
        let item = new Item({
            stand: stand,
            title: req.body.title,
            description: req.body.description,
            path: req.body.path,
            bid: req.body.bid,
            increment: req.body.bid,
            hasBid: req.body.hasBid
        });
        await item.save();
        res.send(item);
    } catch (error) {
    // console.log(error);
    res.sendStatus(500);
    }
    });

//Edit item || Update bid
app.put('/api/stands/:standID/items/:itemID', async (req, res) => {
    try {
        let item = await Item.findOne({
            _id: req.params.itemID,
            stand: req.params.standID
        });
        if (!item) {
            res.send(404);
            return;
        }
        item.title = req.body.title;
        item.description = req.body.description;
        item.bid = req.body.bid;
        item.increment = req.body.increment;
        item.hasBid = req.body.hasBid;
        await item.save();
        res.send(item);
    } catch (error) {
        // console.log(error);
        res.sendStatus(500);
    }
});

// Get a list of all of the items in the market.
app.get('/api/stands/:standID/items', async (req, res) => {
  try {
    let stand = await Stand.findOne({_id: req.params.projectID});
    if (!stand) {
        res.send(404);
        return;
    }
    let items = await Item.find({stand:stand}).populate('stand');
    res.send(items);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

//Delete item
app.delete('/api/stands/:standID/items/:itemID', async (req, res) => {
  try {
    let item = await Item.findOne({_id:req.params.itemID, stand: req.params.standID});
    if (!item) {
        res.send(404);
        return;
    }
    await item.delete();
    res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
