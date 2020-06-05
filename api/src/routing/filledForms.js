const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const filledForm = mongoose.model('filledForm', Form);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
  try {
    const forms = await filledForm.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
router.get('/single/:id', async (req, res) => {
  try {
    const forms = await filledForm.findById(req.params.id)
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
//change to fragment-key
router.get('/key/:id', async (req, res) => {
  console.log('hello')
  const keyLength = 4
  if (req.params.id.length !== keyLength){
    res.sendStatus(422);
  }
  try{
    const forms = await filledForm.findOne({filledFormNumberID :  { "$regex": `${req.params.id}$` },
      function (err, docs) {}})
    if (forms !== null)
      res.status(200).json(forms);
    else res.sendStatus(404)
  } catch (err) {
    res.status(404).json({ message: err });
  }
})

router.get('/whole-key/:id', async (req, res) => {
  try{
    const forms = await filledForm.findOne({filledFormNumberID :  req.params.id })
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const forms = await filledForm.find({ templateID: req.params.id });
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post('/', async (req, res) => {
  try {
    const form = new filledForm(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const form = await filledForm.remove({ templateID: req.params.id });
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete('/single/:id', async (req, res) => {
  try {
    const form = await filledForm.findByIdAndDelete(req.params.id);
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
