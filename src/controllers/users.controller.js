const bcrypt = require('bcrypt');
const usersController = {};

const User = require('../models/User');

usersController.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Error fetching users', error: error.message});
    }
}

usersController.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) return res.status(404).json({message: 'User not found.'});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Error fetching user', error: error.message});
    }
}

usersController.createUsers = async (req, res) => {
    try {
        const { email, password, name, surname, mobileNumber, address } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({message: 'Email already exists.'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
        email,
        password: hashedPassword,
        name,
        surname,
        mobileNumber,
        address
    });
    await newUser.save();
    res.status(201).json({message: 'User saved'});
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message});
    }
}

usersController.updateUsers = async (req, res) => {
    try {
        const { email, password, name, surname, mobileNumber, address } = req.body;
        let updatedFields = { email, name, surname, mobileNumber, address };
        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, updatedFields, {new: true}
        );
        if(!updatedUser) return res.status(404).json({message: 'User not found.'});
        res.status(200).json({message: 'User updated ', user: updatedUser});
    } catch (error) {
        res.status(500).json({message: 'Error updating user', error: error.message});
    }
}

usersController.deleteUsers = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message: 'User not found.'});
        res.status(200).json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting user', error: error.message});
    }
}

module.exports = usersController;