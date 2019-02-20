const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Chat = require('../models/chatstate')
// Welcome Page
router.get('/', (req, res) =>{
  if (req.user) {
    res.redirect('/dashboard') // logged in
} else {
  res.render('welcome')   // not logged in
}


});

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{

  Chat.findOne({room:'room1'}).then((result,err)=> {
    if(err) result.lastFiveMessages = []
 res.render('dashboard', {
    user: req.user,
    posts: result.lastFiveMessages
  })
});
  req.app.io.emit('hello',req.user.name + ' Has Joined' )

})


module.exports = router;
