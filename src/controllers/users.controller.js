const usersController = {};

usersController.getUsers = (req, res) => res.json({message: "GET Users"})

usersController.getUser = (req, res) => res.json({message: "GET User"})

usersController.createUsers = (req, res) => res.json({message: "User saved"})

usersController.updateUsers = (req, res) => res.json({message: "User updated"})

usersController.deleteUsers = (req, res) => res.json({message: "User deleted"})

module.exports = usersController