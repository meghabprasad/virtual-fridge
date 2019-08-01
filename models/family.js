const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Family = new Schema({
    ref: "User",
    ref: "Fridge"
        // user_id: { type: String },
        // family_name: { type: String }
})
const Family = mongoose.model("Family", Family);
module.exports = Family;
