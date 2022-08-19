const reports = require("../models/reports-model");

const controller = {
  async getCreditsExpired(req, res) {
    await reports.getCreditsExpired(req, res);
  },
};

module.exports = controller;