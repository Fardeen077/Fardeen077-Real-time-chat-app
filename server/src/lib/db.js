import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\nMongoDB is Connect !! ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB is not Connect", error);
        process.exit(1);

    }
}

export default connectDB;