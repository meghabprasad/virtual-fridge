const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingList = new Schema({
    ref: "Family",
    items: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ShoppingList = mongoose.model("ShoppingList", ShoppingList)
module.exports = ShoppingList;