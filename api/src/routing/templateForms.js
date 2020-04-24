const express = require('express');
const mongoose = require('mongoose');
const templateFormSchema = require('../models/template.model');
const authenticateToken = require('../authentication/authenticateToken');

const templateForm = mongoose.model('templateForm', templateFormSchema);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/user/:id', authenticateToken, async (req, res) => {
  try {
    const forms = await templateForm.find({userID: req.params.id});
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const forms = await templateForm.findById(req.params.id);
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({message: err});
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const form = new templateForm(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const removedForm = await templateForm.findByIdAndDelete(req.params.id);
    res.status(200).json(removedForm);
  } catch (err) {
    res.status(404).json({message: err});
  }
});

module.exports = router;
