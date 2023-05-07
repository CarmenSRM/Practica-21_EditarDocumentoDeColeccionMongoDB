const mongoose = require ('mongoose');//Se inyectan las dependencias de mongoose.
let UserSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String
});
 
module.exports = mongoose.model('users', UserSchema); 