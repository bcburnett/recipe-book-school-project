const express = require('express');
const router = express.Router();
// Load User model
const User = require('../models/user');
const Post = require('../models/posts/postModel');
// Login Page
router.get('/createPost',require('../controllers/createpost'));





module.exports = router;
