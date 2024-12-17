const express = require("express")
const router = express.Router()
const { userRegistration, userLogin } = require("../Controllers/user-controllers")
const auth = require("../Middleware/auth-middleware")

router.route("/signup").post(userRegistration)
router.route("/signin").post(userLogin)


module.exports = router