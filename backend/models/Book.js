const mongoose = require('mongoose');


const BookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: String,
description: String,
genre: String,
year: Number,
copies: { type: Number, default: 1 }
});


module.exports = mongoose.model('Book', BookSchema);