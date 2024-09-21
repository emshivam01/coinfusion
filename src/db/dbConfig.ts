
import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('error', () => {
            console.log("Database connection error")
            process.exit(1)
        })


    } catch (error) {
        console.log("Something went wrong with the databse ");
        console.log("Error: " + error);
    }
}