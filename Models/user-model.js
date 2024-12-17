const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: "/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { Timestamps: true })

// password hashing 
userSchema.pre("save", async function (next) {
    try {
        const salt = 10;

        if (!this.isModified("password")) return
        const hashPassword = await bcrypt.hash(this.password, salt)
        this.password = hashPassword
        next()
    } catch (error) {

        console.log(error)
    }
})

// compare hashPassword 

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generate token 
userSchema.methods.generateToken = async function () {
    try {
        const token = JWT.sign({
            _id: this._id,
            name: this.name,
            email: this.email
        }, process.env.TOKEN_KEY)
        //console.log(token)
        return token

    } catch (error) {
        console.log(error)
    }
}


const User = new mongoose.model("user", userSchema)


module.exports = User;