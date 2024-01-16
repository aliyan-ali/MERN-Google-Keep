import mongoose from "mongoose";




const noteSchema = new mongoose.Schema({
    ownerId: {
        type: "ObjectId",
        ref: "User",
        require: true
    },
    title: {
        type: String,
        default: "",
        // require: true,
    },
    content: {
        type: String,
        default: "",
        // require: true
    },
    imageUrl: {
        type: String,
        default: "",
    },deleted: {
        type: Boolean,
        default:false
    }
},{ timestamps: true })

const Note = mongoose.model("Notes", noteSchema)
export default Note;