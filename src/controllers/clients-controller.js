const clients = require("../models/clients-model");

const controller = {
  async saveClient(req, res) {
    await clients.saveClient(req, res);
  },

  async getClients(req, res) {
    await clients.getClients(req, res);
  },
};

module.exports = controller;