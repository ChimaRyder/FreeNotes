const mongoose = require('mongoose')

const confessionSchema = new mongoose.Schema({
    user_id: String,
    color: String,
    name_to: String,
    content: String,
})

const confessionModel = mongoose.model("Confession", confessionSchema)
module.exports = confessionModel