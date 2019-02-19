const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: false,
    error: e => {}
  },
  last_name: {
    type: String,
    required: false,
    error: e => {}
  },

  address: {
    address1: {
      type: String,
      required: false,
      error: e => {}
    },
    address2: {
      type: String,
      required: false,
      error: e => {}
    },
    city: {
      type: String,
      required: false,
      error: e => {}
    },
    state: {
      type: String,
      required: false,
      error: e => {}
    },
    zip: {
      type: String,
      required: false,
      error: e => {}
    },
    country: {
      type: String,
      required: false,
      error: e => {}
    }
  },
});
const User = mongoose.model("User", UserSchema);

module.exports = User;

