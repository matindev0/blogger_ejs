const JWT = require('jsonwebtoken')
const User = require("../Models/user-model")
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        // console.log("get token", token)
        const verifyToken = JWT.verify(token, process.env.TOKEN_KEY)
        const userData = await User.findOne({ email: verifyToken.email }).select({ password: 0 })
        //console.log("auth data", userData) // fetch all data of current user.
        req.user = userData;
        req.token = token;

        next();
    } catch (error) {
        return res.status(500).json({ message: "error  at middleware " })
    }
}

module.exports = auth;