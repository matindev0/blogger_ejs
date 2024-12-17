const { MdOutlineEmail } = require("react-icons/md")
const User = require("../Models/user-model")
// user registration logic

const userRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const isExist = await User.findOne({ email: email })
        if (isExist) {
            return res.status(400).json({ message: "email id already exist" })
        }
        const newUser = await User.create({ name, email, password })
        const token = await newUser.generateToken();
        return res.redirect("/signin")

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

// user login logic

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmailExist = await User.findOne({ email })
        if (!isEmailExist) {
            return res.status(400).json({ message: "invalid credentials" })
        }
        const passwordVerified = await isEmailExist.comparePassword(password)

        if (passwordVerified) {
            const token = await isEmailExist.generateToken();
            res.cookie("jwt", token)
            //console.log(token)
            return res.redirect("/homepage")

        } else {
            res.status(400).json({ message: "invalid credentials" })
        }


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

module.exports = { userRegistration, userLogin };