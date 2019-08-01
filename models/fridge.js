const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Fridge = new Schema({
    ref: "Family",
    // family_id: { type: String },
    // user_id: { type: String, required: true },
    items: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Fridge = mongoose.model("Fridge", Fridge);
module.exports = Fridge;
