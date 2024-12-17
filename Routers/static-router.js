const express = require('express')
const router = express.Router()
const Blog = require("../Models/blog-model")
const auth = require("../Middleware/auth-middleware")
const Comment = require("../Models/comment-model")

router.get("/", (req, res) => {
    return res.render("homepage")
})

router.get("/homepage", auth, async (req, res) => {

    try {
        const allBlogs = await Blog.find({})  // taking all blogs for rending on home page .
        return res.render("home", { user: req.user, blogs: allBlogs })
    } catch (error) {
        return res.json({ message: "error at homepage" })
    }

})


router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.get("/signin", (req, res) => {
    try {
        return res.render("signin")
    } catch (error) {
        res.send(error)
    }

})

router.get("/blog", auth, (req, res) => {

    return res.render("blog")
})
router.get("/logout", (req, res) => {
    //  const token = req.token
    return res.clearCookie("jwt").redirect("/signin")
})

//getting blog body dynamically
router.get("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const blog = await Blog.find({ _id: id }).populate("createdBy")
        const commentContent = await Comment.find({ blogId: id }).populate("createdBy")
        // console.log(commentContent) to fetch all the details of user through created by  
        return res.render("blogbody", { user: req.user, blog, commentContent })

    } catch (error) {
        res.send(error)
    }

})




module.exports = router;