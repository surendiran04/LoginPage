const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthModel = mongoose.model("users", ModelSchema);

module.exports = AuthModel;
