const mongoose = require("mongoose");

module.exports = class db{

  constructor(){
    const User = require("../../models/user");
    const Chat = require("../../models/chatstate");
    const Post = require("../../models/posts/postModel");
  }

  saveMessages(arry){
    Chat.findOne({ room: "room1" }).then((res, err) => {
      res.lastFiveMessages = arry;
      res.save().then((res, err) => console.log());
    });
  }

  saveArticle(){

  }

}
