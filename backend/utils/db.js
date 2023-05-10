import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log(err.message)
    }
}