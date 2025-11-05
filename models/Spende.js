const mongoose = require('mongoose');

const spendeSchema = new mongoose.Schema({
  betrag: { type: Number, required: true },
  spender: { type: String, required: true },
  datum: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Spende', spendeSchema);