import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
    email: {
        type: String
    },
    otp: {
        type: String
    }
})
const schema = mongoose.model("Otp", otpSchema);
export default schema;