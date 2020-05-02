const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');
const pendingForm = mongoose.model('pendingforms', Form);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res) => {
  try {
    const forms = await pendingForm.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const forms = await pendingForm.find({templateID: req.params.id});
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});
router.get('/single/:id', async (req, res) => {
  try {
    const forms = await pendingForm.findById(req.params.id);
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});
router.post('/', async (req, res, next) => {
  try {
    const form = new pendingForm(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await pendingForm.findByIdAndRemove(req.params.id);
    res.status(200);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

module.exports = router;
