const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validate = function(password) {
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateAuth = function() {
    return jwt.sign({_id:this._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel