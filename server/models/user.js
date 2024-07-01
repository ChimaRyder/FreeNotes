const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validate = (password) => {
    return bcrypt.compareSync(password, this.password);
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel