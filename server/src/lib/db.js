import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`\nMongoDB is Connect !! DB Host:${DB_NAME}/${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB is not Connect", error);
        process.exit(1);

    }
}

export default connectDB;