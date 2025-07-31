import mongoose from "mongoose"

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    site: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    encryptedPassword: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export default mongoose.model('Password', passwordSchema)