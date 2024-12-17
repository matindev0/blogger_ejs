require('dotenv').config()
const express = require("express")
const app = express();
const path = require("path")
const staticRouter = require("./Routers/static-router")
const userRouter = require("./Routers/user-router")
const blogRouter = require("./Routers/blog-router")
const cookieParser = require("cookie-parser")

const PORT = process.env.PORT;
const staticPath = path.join(__dirname, "./public")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_STRING).then(() => console.log("MongoDB is connected..."))


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(staticPath))

app.use(cookieParser())


app.use("/user", userRouter)
app.use("/api", blogRouter)
app.use("/", staticRouter)

app.listen(PORT, () => {
    console.log(`server is listening at PORT no ${PORT}`)
})