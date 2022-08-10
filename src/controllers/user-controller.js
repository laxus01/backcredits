const User = require("../models/user-model");

const controller = {
  async getUser (req, res) {
    await User.getUser(req, res);
  },

  async test (req, res) {
    await User.test(req, res);
  },
};

module.exports = controller;
