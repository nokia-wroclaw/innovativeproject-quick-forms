const express = require('express');
const Form = require('./form.model');
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res) => {
   try{
      const forms = await Form.find();
      res.json(forms);
   }catch(err){
      res.json({message:err})
   }
});

router.get('/:formId', async (req, res) => {
   try{
      const form = await Form.findById(req.params.formId);
      res.json (form)
   } catch (err){
      res.json({message:err})
   }
});

router.post('/', async (req, res) => {
   const form = new Form ({
      title: req.body.title,
      name: req.body.name,
      surname: req.body.surname
   });

   try{
      const savedForm = await form.save();
      res.json(savedForm);
   } catch(err){
      res.json({message: err});
   }
});



module.exports = router;
