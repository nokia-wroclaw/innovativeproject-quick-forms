const express = require('express');
const FormSchema = require('../models/form.model');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
  try {
    const forms = await FormSchema.find();
    res.json(forms);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:formId', async (req, res) => {
  try {
    const form = await FormSchema.findById(req.params.formId);
    res.json(form);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/title/:formTitle', async (req, res) => {
  console.log(req.params.title);
  try {
    const form = await FormSchema.find({ title: req.params.formTitle });
    console.log(typeof form);
    res.json(form);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/create', async (req, res) => {
  try {
    const form = new FormSchema(req.body);
    const savedForm = await form.save();
    res.json(savedForm);
  } catch (err) {
    res.json({ message: err });
  }
});


module.exports = router;
