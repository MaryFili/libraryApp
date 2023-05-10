import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, "Please add a filename"],
        trim: true,
        maxlength: [20, "Filename cannot be more than 50 characters"],
    },
    file: {
        type: String,
        required: [true, "Please add a file"],
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.model("Document", documentSchema);