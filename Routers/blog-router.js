const express = require("express")
const router = express.Router()
const { userBlog, userComment } = require("../Controllers/blog-controllers")
const upload = require("../Middleware/filestorage-middleware")
const auth = require("../Middleware/auth-middleware")



router.route("/blog").post(upload.single("coverImageURL"), auth, userBlog)
router.route("/comment/:blogId").post(auth, userComment)

module.exports = router;