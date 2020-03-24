
const express = require('express');
const Form = require('../models/form.model');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/prototypes', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get('/filled-forms', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get('/prototypes/:id', async (req, res) => {
  try {
    const forms = await Form.findById(req.params.id);
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({
      message: `id: ${req.params.id} not found`,
      status: err});
  }
});

router.get('/filled-forms/:id', async (req, res) => {
  try {
    const forms = await Form.findById(req.params.id);
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({
      message: `id: ${req.params.id} not found`,
      status: err
       });
  }
});

router.post('/prototypes', async (req, res) => {
  try {
    const form = new Form(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post('/filled-forms', async (req, res) => {
  try {
    const form = new Form(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete('/filled-forms/:id', async(req, res) => {
  try{
      const removedForm = await Form.findByIdAndDelete(req.params.id);
      res.status(200).json(removedForm);
  } catch (err){
    res.status(404).json({message: err});
  }
});

router.delete('/prototypes/:id', async(req, res) => {
  try{
    const removedForm = await Form.findByIdAndDelete(req.params.id);
    res.status(200).json(removedForm);
  } catch (err){
    res.status(404).json({message: err});
  }
});

module.exports = router;
