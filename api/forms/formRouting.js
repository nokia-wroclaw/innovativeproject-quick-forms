const express = require('express');
const router = express.Router();
const form = require('../src/User.model')

router.get('/', (req, res) => {
   res.json(form);
});

// router.get('/:id', (req, res) =>{
//    const found = form.some(form => form.id === parseInt(req.params.id));
//
//     if(found){
//         res.json(members.filter(form => form.id === parseInt(req.params.id)));
//     }
//     else {
//         res.status(400).json({msg: `Form ${req.params.id} not found`});
//     }
//
// });

module.exports = router;
