
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
    const {username, password} = req.body;
    const user = new userModel();

    user.username = username;
    user.password = user.generateHash(password);

    user.save()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    userModel.findOne({username})
        .then(user => {
            if(!user) {
                return res.json("Invalid username or password.");
            }

            if (!user.validate(password)) {
                return res.json("Invalid username or password.")
            } else {
                return res.json("Success.");
            }

        })
        .catch(err => {
            console.log(err)
            res.json(err);
        })
})

app.listen(3000, () => {
    console.log("listening to port 3000");
})