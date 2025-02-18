const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: {type: String, required: true },
    orders: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Order',
        default: []
    }],
    date: { type: Date, default: Date.now }
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

const User = model('User', userSchema);
module.exports = User;