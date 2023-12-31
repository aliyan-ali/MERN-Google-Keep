import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    ownerId: {
        type: "string",
        default: "",
        require: true
    },
    title: {
        type: "string",
        default: "",
        // require: true,
    },
    content: {
        type: "string",
        default: "",
        // require: true
    },
    imageUrl: {
        type: "string",
        default: "",
    },deleted: {
        type: "boolean",
        default:false
    }
},{ timestamps: true })

const Note = mongoose.model("Notes", noteSchema)
export default Note;