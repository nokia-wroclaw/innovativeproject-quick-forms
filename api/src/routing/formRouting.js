const express = require('express');
const FormSchema = require('../models/form.model');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:formId', async (req, res) => {
  try {
    const form = await Form.findById(req.params.formId);
    res.json(form);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/title/:formTitle', async (req, res) => {
  console.log(req.params.title);
  try {
    const form = await Form.find({ title: req.params.formTitle });
    console.log(typeof form);
    res.json(form);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/prototype', async (req, res) => {
  try {
    const form = new FormSchema(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});


router.post('/filled', async (req, res) => {
  try {
    const form = new FormSchema(req.body);
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (err) {
    res.status(400).json({message: err});
  }
});

router.delete('/:formId', async (req, res) => {
  try {
    const removedForm = await Form.deleteOne({ _id: req.params.formId });
    res.json(removedForm);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
