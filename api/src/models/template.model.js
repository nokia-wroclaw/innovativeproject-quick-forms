const mongoose = require('mongoose');

let templateSchema = new mongoose.Schema({
    template : mongoose.Schema.Types.Mixed
});

module.exports = templateSchema;
