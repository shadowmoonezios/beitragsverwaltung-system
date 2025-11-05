const express = require('express');
const router = express.Router();
const Ausgabe = require('../models/Ausgabe');

// Ausgabe anlegen
router.post('/', async (req, res) => {
  const { betrag, kategorie } = req.body;
  const neueAusgabe = new Ausgabe({ betrag, kategorie });
  try {
    await neueAusgabe.save();
    res.status(201).send(neueAusgabe);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ausgaben abrufen
router.get('/', async (req, res) => {
  try {
    const ausgaben = await Ausgabe.find();
    res.status(200).send(ausgaben);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;