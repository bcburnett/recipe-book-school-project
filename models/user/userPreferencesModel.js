const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  avatar: {
    type: String,
    required: false,
    error: e => {}
  },
  cover: {
    type: String,
    required: false,
    error: e => {}
  },
  background_image: {
    type: String,
    required: false,
    error: e => {}
  },

  relationship_id: {
    type: String,
    required: false,
    error: e => {}
  },

  language: {
    type: String,
    required: false,
    error: e => {}
  },
  email_code: {
    type: String,
    required: false,
    error: e => {}
  },
  src: {
    type: String,
    required: false,
    error: e => {}
  },

  follow_privacy: {
    type: String,
    required: false,
    error: e => {}
  },
  friend_privacy: {
    type: String,
    required: false,
    error: e => {}
  },
  post_privacy: {
    type: String,
    required: false,
    error: e => {}
  },
  message_privacy: {
    type: String,
    required: false,
    error: e => {}
  },

  show_activities_privacy: {
    type: String,
    required: false,
    error: e => {}
  },
  birth_privacy: {
    type: String,
    required: false,
    error: e => {}
  },
  visit_privacy: {
    type: String,
    required: false,
    error: e => {}
  },


  showlastseen: {
    type: String,
    required: false,
    error: e => {}
  },
  emailNotification: {
    type: String,
    required: false,
    error: e => {}
  },
  e_liked: {
    type: String,
    required: false,
    error: e => {}
  },
  e_wondered: {
    type: String,
    required: false,
    error: e => {}
  },
  e_shared: {
    type: String,
    required: false,
    error: e => {}
  },
  e_followed: {
    type: String,
    required: false,
    error: e => {}
  },
  e_commented: {
    type: String,
    required: false,
    error: e => {}
  },
  e_visited: {
    type: String,
    required: false,
    error: e => {}
  },
  e_liked_page: {
    type: String,
    required: false,
    error: e => {}
  },
  e_mentioned: {
    type: String,
    required: false,
    error: e => {}
  },
  e_joined_group: {
    type: String,
    required: false,
    error: e => {}
  },
  e_accepted: {
    type: String,
    required: false,
    error: e => {}
  },
  e_profile_wall_post: {
    type: String,
    required: false,
    error: e => {}
  },
  e_sentme_msg: {
    type: String,
    required: false,
    error: e => {}
  },
  e_last_notif: {
    type: String,
    required: false,
    error: e => {}
  },
  notification_settings: {
    type: String,
    required: false,
    error: e => {}
  },
