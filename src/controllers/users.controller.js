const usersController = {};

const User = require('../models/User');

usersController.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

usersController.getUser = async (req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
}

usersController.createUsers = async (req, res) => {
    const { email, password, name, surname, mobileNumber, address } = req.body;
    const newUser = new User({
        email,
        password,
        name,
        surname,
        mobileNumber,
        address
    })
    await newUser.save();
    res.json({message: 'User saved'});
}

usersController.updateUsers = async (req, res) => {
    const { email, password, name, surname, mobileNumber, address } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        email,
        password,
        name,
        surname,
        mobileNumber,
        address
    })
    res.json({message: 'User updated'});
}

usersController.deleteUsers = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User deleted'});
}

module.exports = usersController;