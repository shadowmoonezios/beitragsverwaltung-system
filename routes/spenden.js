const express = require('express');
const router = express.Router();
const Spende = require('../models/Spende');

// Spenden anlegen
router.post('/', async (req, res) => {
  const { betrag, spender } = req.body;
  const neueSpende = new Spende({ betrag, spender });
  try {
    await neueSpende.save();
    res.status(201).send(neueSpende);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Spenden abrufen
router.get('/', async (req, res) => {
  try {
    const spenden = await Spende.find();
    res.status(200).send(spenden);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;