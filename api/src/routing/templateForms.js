const express = require('express');
const mongoose = require('mongoose');
const templateFormSchema = require('../models/template.model');
const templateForm = mongoose.model("templateForm", templateFormSchema);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/', async (req, res) => {
    try {
        const forms = await templateForm.find();
        res.status(200).json(forms);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    try {
        console.log("hello there");
        const forms = await templateForm.findById(req.params.id);
        res.status(200).json(forms);
    } catch (err) {
        res.status(404).json({
            message: `id: ${req.params.id} not found`,
            status: err});
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const form = new templateForm(req.body);
        console.log(form);
        const savedForm = await form.save();
        console.log(savedForm);
        res.status(201).json(savedForm);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const removedForm = await templateForm.findByIdAndDelete(req.params.id);
        res.status(200).json(removedForm);
    } catch (err){
        res.status(404).json({message: err});
    }
});

module.exports = router;