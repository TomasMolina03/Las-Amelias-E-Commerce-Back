const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
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

        const newUser = new User({
        email,
        password,
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

        const newToken = jwt.sign(
            {   
                id: updatedFields._id,
                email: updatedFields.email, 
                role: updatedFields.role,
                name: updatedFields.name,
                surname: updatedFields.surname,
                address: updatedFields.address,
                mobileNumber: updatedFields.mobileNumber
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.status(200).json({
            message: 'User updated ', 
            user: updatedUser,
            newToken: newToken
        });
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

usersController.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({message: 'Email and password are required.'});
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({message: 'User not found.'});
        }

        const isMatch = await bcrypt.compare(password, user.password || '');
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid credentials.'});
        }

        if(!jwtSecret) {
            return res.status(500).json({message: 'JWT secret is missing in environment variables.'})
        }

        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email, 
                role: user.role,
                name: user.name,
                surname: user.surname,
                address: user.address,
                mobileNumber: user.mobileNumber
            },
            jwtSecret,
            {expiresIn: '1h'}
        );
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
}

module.exports = usersController;