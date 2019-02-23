const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
// const Mydb = require('../views/js/data');
// const DB = new Mydb();

const DB = new (require('../views/js/data'))();
// Welcome Page
router.get('/', (req, res) =>{
  if (req.user) {
    res.redirect('/dashboard'); // logged in
  } else {
    res.render('welcome'); // not logged in
  }
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) =>{
  const result = await DB.getLastFiveMessages();
  console.log(result);
  if (!result) result = [];
  res.render('dashboard', {
    user: req.user,
    posts: result,
  });
  req.app.io.emit('hello', req.user.name + ' Has Joined' );
});


module.exports = router;
