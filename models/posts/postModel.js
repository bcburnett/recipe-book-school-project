
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

post_id:{
  type:String,
  required: false
},
user_id:{
  type:String,
  required: false
},
postText:{
  type:String,
  required: false
},
postLink:{
  type:String,
  required: false
},
postTitle:{
  type:String,
  required: false
},
postImage:{
  type:String,
  required: false
},
thumbnail:{
  type:String,
  required: false
},
});
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

