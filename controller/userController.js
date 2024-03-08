const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        if (!name || !phone || !email || !password) return res.status(400).send({ status: false, message: "All field is mandatory" })
        let isEmailExist = await userModel.findOne({ email: email })
        if (isEmailExist) return res.status(409).send({ status: false, message: "email already exist" })
        let hashPassword = bcrypt.hashSync(password, 10)
        const user = new userModel({ name, email, password: hashPassword, phone })
        user.save()
        return res.status(200).send({ status: true, message: user })
    } catch (error) {
        return res.status(500).send({ status: true, message: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const queryName = req.query.name;

        const nameRegex = queryName ? new RegExp(`^${queryName}`, "i") : new RegExp("", "i");

        const users = await userModel.find({ name: { $regex: nameRegex } }).select({ password: 0 });

        return res.status(200).send({ status: true, message: users });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};



module.exports = { createUser, getAllUsers }