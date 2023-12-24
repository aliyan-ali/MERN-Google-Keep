import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        default: "",
        require: true
    },
    role: {
        type: "string",
        enum: ['admin', 'customer'],
        default: "customer"
    },
    email: {
        type: "string",
        default: "",
        require: true,
        unique: true
    },
    password: {
        type: "string",
        default: "",
        require: true
    }
})

const user = mongoose.model("User", userSchema)
export default user;