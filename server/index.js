
const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/user.js')
const confessionModel = require('./models/confession.js')
const cors = require('cors')
const {response} = require("express");

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

app.get('/search', async (req, res) => {
    const response = await confessionModel.find()
    return res.json({confessions:response})
})

app.listen(3000, () => {
    console.log("listening to port 3000");
})