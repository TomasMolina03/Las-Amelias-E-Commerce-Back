const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    address: {type: String, required: false }
})

model('User', userSchema)