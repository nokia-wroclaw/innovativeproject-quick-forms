const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    properties: {
        firstName: {
            type: String,
            title: String,
            default: String
        },
        lastName: {
            type: String,
            title: String,
            default: String
        },
        age: {
            type: Number,
            title: String,
            default: String
        },
        bio: {
            type: String,
            title: String,
            default: String
        },
        password: {
            type: String,
            title: String,
            default: String
        },
        telephone: {
            type: String,
            title: String,
            default: String
        }
    }
});

module.exports = templateSchema;
