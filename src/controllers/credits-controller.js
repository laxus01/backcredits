const credits = require("../models/credits-model");

const controller = {
  async saveCredit(req, res) {
    await credits.saveCredit(req, res);
  },

  async getCredits(req, res) {
    await credits.getCredits(req, res);
  },

  async deleteCredit(req, res) {
    await credits.deleteCredit(req, res);
  },

  async creditInitial(req, res) {
    await credits.creditInitial(req, res);
  },

  async currentCredit(req, res) {
    await credits.currentCredit(req, res);
  },

  async finalCredit(req, res) {
    await credits.finalCredit(req, res);
  },

  async updatePrevious(req, res) {
    await credits.updatePrevious(req, res);
  },

  async updateNext(req, res) {
    await credits.updateNext(req, res);
  },

  async inactivateCredit(req, res) {
    await credits.inactivateCredit(req, res);
  },

  async savePaid(req, res) {
    await credits.savePaid(req, res);
  },

  async totalCredits(req, res) {
    await credits.totalCredits(req, res);
  },

  async totalPaids(req, res) {
    await credits.totalPaids(req, res);
  },

  async saveDailyBalance(req, res) {
    await credits.saveDailyBalance(req, res);
  },
};

module.exports = controller;