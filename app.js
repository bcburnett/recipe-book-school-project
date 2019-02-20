const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const mysession = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(
  require("express-session")
);
const socket = require("socket.io");
var http = require("http");
var uuidv1 = require("uuid/v1");
const app = express();

const User = require("./models/user");
const Chat = require("./models/chatstate");
const Post = require("./models/posts/postModel");
const lastFiveMessages = [];

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/mysocialmedia", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// const store = new MongoDBStore({
//   uri: "mongodb://@mumblit.com",
//   databaseName: "mysocialmedia",
//   collection: "mySessions"
// });

const store = new MongoDBStore({
  uri: "mongodb://localhost",
  databaseName: "mysocialmedia",
  collection: "mySessions"
});




var session = mysession({
  secret: "This is a secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
});

// Express session
app.use(session);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use(express.static("public"));
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const port = process.env.PORT || 5000;

var server = http.createServer(app);

const io = socket(server);
var sharedsession = require("express-socket.io-session");
io.use(
  sharedsession(session, {
    autoSave: true
  })
);
app.io = io;
server.listen(port);
console.log("Port: " + port);
console.log(app.mountpath);
Chat.findOne({ room: "room1" })
  .then(res => {
    res.lastFiveMessages = [];
    res.save();
  })
  .catch(e => {
    chat = new Chat();
    chat.room = "room1";
    chat.lastFiveMessages = [];
    chat.save();
  });

io.on("connection", socket => {
  console.info(`Client connected [id=${socket.id}]`);

  // when socket disconnects, remove it from the list:
  socket.on("disconnect", () => {
    console.info(`Client gone [id=${socket.id}]`);
  });
  try {
    id = socket.handshake.session.passport.user;
    User.findById(id)
      .then(res => {
        socket.handshake.session.userinfo = res;
        socket.handshake.session.save();
        socket.emit("hello", "session updated");
      })
      .catch(e => console.log(e));
  } catch (e) {
    console.log("NO ID");
  }

  socket.on("hello", data => {
    socket.emit("hello", data);
    socket.broadcast.emit("hello", data);
    lastFiveMessages.push(data);
    if (lastFiveMessages.length > 5) {
      lastFiveMessages.splice(0, 1);
    }
    // save the message array
    Chat.findOne({ room: "room1" }).then((res, err) => {
      res.lastFiveMessages = lastFiveMessages;
      res.save().then((res, err) => console.log());
    });
  });

  socket.on("getPostForm", data => {
    app.render("postInputForm",{data:{}} ,(err, html) => {
      if (err) {
        value = err;
        socket.emit("sendPostForm", err);
        return;
      }
      socket.emit("sendPostForm", html);
    });
  });

  socket.on("newPost", data => {

      const post = {};
      post.user_id = socket.handshake.session.passport.user;
      post.post_id = uuidv1();
      post.postText = data.text;
      post.postTitle = data.title;
      post.postImage = data.image;
      post.thumbnail =data.thumbnail;
      post.userid =socket.handshake.session.passport.user;
      const mydata = new Post(post);
      mydata.save()
      post.poster ==socket.handshake.session.userinfo
      console.log(post.poster)
      app.render("post", { 'data':post }, (err, html) => {
        if (err) {
          value = err;
          socket.emit("newPost", err);
          return;
        }
        socket.emit("newPost", html);
        socket.broadcast.emit("newPost", html);
        const messg = socket.handshake.session.userinfo.name + " has Posted an article";
        socket.emit("hello", messg);
        socket.broadcast.emit("hello", messg);
    });
  });

  socket.on('editSend', data=>{
    const post = {};
      post.user_id = socket.handshake.session.passport.user;
      post.postText = data.text;
      post.postTitle = data.title;
      post.postLink = data.link;
      post.postImage = data.image;
      post.thumbnail =data.thumbnail;
      post.userid =socket.handshake.session.passport.user;
      post.post_id = data.post_id
      console.log(post)
      var query = {'post_id':data.post_id};
      Post.findOneAndUpdate(query, post, {upsert:true}, function(err, doc){
          if (err) return res.send(500, { error: err });
                  console.log(err,doc)
        socket.emit('dele')
      })
  })



  socket.on("loadPosts", e => {
    Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .sort({_id : 1})
      .then((res, error) => {
        res.map( e => {
          let data = e
          data.userid =socket.handshake.session.userinfo._id
           User.findById(e.user_id,(err,res)=>{
             data.poster=res.name

            app.render("post", { data }, (err, html) => {
            if (err) {
              value = err;
              socket.emit("newPost", err);
              return;
            }
            socket.emit("newPost", html);
          });
            })

        });
      });
  });

  socket.on('detailview',data=>{ //data is the postid
    Post.findOne({"post_id": data}).then((res,error)=>{
      let mydata = res
      mydata.userid = socket.handshake.session.passport.user

      app.render('detailview',{'data':mydata},(err,html)=>{
        socket.emit('detailview',html)
      })
    })
  })
  socket.on('dele',data=>{
    Post.findOneAndDelete({'post_id':data}).then(()=>socket.emit('dele'))
  })

  socket.on('edit',data=>{
    Post.findOne({'post_id':data}).then((res,error)=>{
      let mydata = res
      mydata.userid = socket.handshake.session.passport.user
      app.render('postInputForm',{'data':mydata},(err,html)=>{
        socket.emit('edit',html)
      })
    })

  })

});
