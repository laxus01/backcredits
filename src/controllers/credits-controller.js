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

  async deletePaid(req, res) {
    await credits.deletePaid(req, res);
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

  async activateCredit(req, res) {
    await credits.activateCredit(req, res);
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

  async getPaidsByDay(req, res) {
    await credits.getPaidsByDay(req, res);
  },

  async getCreditsByDay(req, res) {
    await credits.getCreditsByDay(req, res);
  },

  async updatePaid(req, res) {
    await credits.updatePaid(req, res);
  },

  async updateCredit(req, res) {
    await credits.updateCredit(req, res);
  },

  async getActualState(req, res) {
    await credits.getActualState(req, res);
  },

  async dailyBalance(req, res) {
    await credits.dailyBalance(req, res);
  },
};

module.exports = controller;