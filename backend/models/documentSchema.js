import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    name: String,

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