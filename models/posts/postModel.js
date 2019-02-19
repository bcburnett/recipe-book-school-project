
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

id:{
  type:String,
  required: false
},
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
postContent:{
  type:String,
  required: false
},
});
const User = mongoose.model("User", UserSchema);

module.exports = User;

