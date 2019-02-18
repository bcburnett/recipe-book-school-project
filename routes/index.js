const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose')
const Chat = require('../models/chatstate')
// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{

  Chat.findOne({room:'room1'}).then((result,err)=> {
    console.log(result, 'five posts')
 res.render('dashboard', {
    user: req.user,
    posts: result.lastFiveMessages
  })
});
  req.app.io.emit('hello',req.user.name + ' Has Joined' )

})

module.exports = router;
