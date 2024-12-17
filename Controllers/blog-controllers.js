const Blog = require("../Models/blog-model")
const Comment = require("../Models/comment-model");

const userBlog = async (req, res) => {
    try {
        const { title, body } = req.body;
        const blog = await Blog.create({
            title, body,
            coverImageURL: `uploads/${req.file.filename}`,
            createdBy: req.user._id
        })
        //console.log(blog)
        return res.redirect("/homepage")
    } catch (error) {
        console.log(error)
    }
}


const userComment = async (req, res) => {
    try {
        // console.log(req.params.blogId)
        // console.log(req.body.comment)

        await Comment.create({
            comment: req.body.comment,
            blogId: req.params.blogId,
            createdBy: req.user._id,

        })
        return res.redirect("/homepage")
        // return res.redirect(`/homepage/${req.params.blogId}`)
    } catch (error) {
        console.log(error)
    }
}


module.exports = { userBlog, userComment }