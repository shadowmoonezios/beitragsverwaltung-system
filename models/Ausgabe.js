const mongoose = require('mongoose');

const ausgabeSchema = new mongoose.Schema({
  betrag: { type: Number, required: true },
  kategorie: { type: String, required: true },
  datum: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ausgabe', ausgabeSchema);