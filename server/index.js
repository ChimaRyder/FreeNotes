
const express = require('express')
const connectDB = require('./db.js')
const userModel = require('./models/user.js')
const confessionModel = require('./models/confession.js')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const mongostore = require('connect-mongo');

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN,
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 100000,
        httpOnly: false,
        sameSite: "None",
        secure: true,
    },
    saveUninitialized: false,
    store: mongostore.create({
        mongoUrl: process.env.URI,
    })
}))
app.use(cookieparser())

connectDB()

app.get('/search', async (req, res) => {
    const {query} = req.query;
    const response = await confessionModel.find({ name_to: {$regex: new RegExp("^" + query, "i")}})
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
                return res.status(401).send("Invalid username or password.");
            }

            if (!user.validatePassword(password)) {
                return res.status(401).send("Invalid username or password.")
            } else {
                req.session.SESSION_TOKEN = user.generateAuth();

                return res.status(200).json(req.body);
            }

        })
        .catch(err => {
            console.log(err)
            res.json(err);
        })
})

app.get('/auth/token', (req, res) => {
    try {
        const token = req.session.SESSION_TOKEN;
        const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        userModel.findById(_id)
            .then(user => {
                req.user = user;
                return res.status(200).json(req.user);
            })
            .catch(() => {
                req.session.destroy();
                return res.status(401).send('User no longer not exist.');
            })
    } catch {
        req.session.destroy();
        return res.status(401).send('Token does not exist or has expired');
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).send("Successful Logout.");
})

app.post('/submitNote', (req, res) => {
    const token = req.session.SESSION_TOKEN;
    const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const {color, name_to, content} = req.body;
    const confession = new confessionModel();

    confession.user_id = _id;
    confession.color = color;
    confession.name_to = name_to;
    confession.content = content;

    confession.save()
        .then(conf => res.json(conf))
        .catch(err => res.json(err))
})

app.get('/getCreatedNotes', async (req, res) => {
    const token = req.session.SESSION_TOKEN;
    const _id = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const response = await confessionModel.find({
        user_id: _id,
    })

    return res.json({created_notes : response})
})

app.listen(3000, () => {
    console.log("listening to port 3000");
})