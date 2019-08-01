const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Item = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Item = mongoose.model("Item", Item)
module.exports = Item;