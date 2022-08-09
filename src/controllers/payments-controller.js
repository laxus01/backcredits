const payments = require("../models/payments-model");

const controller = {
  async savePayment(req, res) {
    await payments.savePayment(req, res);
  },

  async getPayment(req, res) {
    await payments.getPayments(req, res);
  },

  async deletePayment(req, res) {
    await payments.deletePayment(req, res);
  },

  async updatePayment(req, res) {
    await payments.updatePayment(req, res);
  },
};

module.exports = controller;