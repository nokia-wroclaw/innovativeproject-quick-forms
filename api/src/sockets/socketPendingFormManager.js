let socketDictionary = {};
const connections = [];
const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.post('/', async (req, res) => {
    let filledFormNumberID;
    try {
        filledFormNumberID = Object.keys(req.body)[0];

        res.status(200);
    } catch (err) {
        res.status(400).json({message: err});
    }
});

module.exports = {
    start: (io) => {

    }
}
