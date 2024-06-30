
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
    const {query} = req.query;
    const response = await confessionModel.find({ name_to:query })
    return res.json({confessions:response})
})

app.get('/userSearch', async (req, res) => {
    const response = await userModel.find({username:req.query.query})
    const userExists = response.length > 0;
    return res.json({userExists: userExists, users:response})
})

app.post('/register', (req, res) => {
    userModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.listen(3000, () => {
    console.log("listening to port 3000");
})