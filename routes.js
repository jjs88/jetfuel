const express = require('express');
const router = express.Router();
const Folder = require('./models/Folder');
const Link = require('./models/Link');


// //this will be the redirect route
router.get('/jetfuel:id', (req, res) => {
  const url = `/api/jetfuel${req.params.id}`;

  Link.find({shortenedUrl: url}, (err, link) => {
    const [newlink] = link;
    res.writeHead(301,{Location: newlink.linkUrl});
    res.end();
  });
});

router.post('/addFolder', async (req, res) => {
  const folder = new Folder(req.body);
  const data = await folder.save();
  res.json(data);
});

router.post('/addLink', async (req, res) => {
  //create link
  const link = new Link(req.body);
  const data = await link.save();
  //take the link ID from newly created link and then put it in the correct folder
  Folder.findById(req.body.folderId, async (err, folder) => {
    //add Link to folder
    folder.links.push(data.id);
    const result = await folder.save();
    res.json(result);    
  })
});

//retrieve the data
router.get('/folders', (req, res) => {
  Folder.find({})
    .populate('links')
    .exec()
    .then(folders => res.json(folders));
});

router.get('/folder/:id', (req, res) => {
  Folder.findById(req.params.id)
    .populate('links')
    .exec()
    .then(folder => res.json(folder));
});






module.exports = router;

