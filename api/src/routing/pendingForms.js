const express = require('express');
const mongoose = require('mongoose');
const Form = require('../models/filledForm.model');

const pendingForm = mongoose.model('pendingforms', Form);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
mongoose.set('useFindAndModify', false);

router.get('/', async (req, res) => {
  try {
    const forms = await pendingForm.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const forms = await pendingForm.find({ templateID: req.params.id });
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get('/single/:id', async (req, res) => {
  try {
    const forms = await pendingForm.findById(req.params.id);
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});
//change to fragment-key
router.get('/key/:id', async (req, res) => {

  const keyLength = 4
  if (req.params.id.length !== keyLength){
    res.sendStatus(422);
  }
  try{
    const forms = await pendingForm.findOne({filledFormNumberID :  { "$regex": `${req.params.id}$` },
      function (err, docs) {}})
    if (forms !== null)
      res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
})

router.get('/whole-key/:id', async (req, res) => {
  try{
    const forms = await pendingForm.findOne({filledFormNumberID :  req.params.id })
    if (forms !== null)
      res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
})

router.post('/', async (req, res, next) => {
  try {
    const form = new pendingForm(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm._id);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const form = await pendingForm.findByIdAndRemove(req.params.id);
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
