const mongoose = require('mongoose')

const confessionSchema = new mongoose.Schema({
    name_to: String,
    content: String,
})

const confessionModel = mongoose.model("Confession", confessionSchema)
module.exports = confessionModel