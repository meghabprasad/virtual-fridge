const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
    ref: "Family",
    name: {
        type: String,
        required: true
    },
    // family_id: { type: String },
    image: {
        type: String
    },
    // fridge_id: { type: String },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", User);
module.exports = User;