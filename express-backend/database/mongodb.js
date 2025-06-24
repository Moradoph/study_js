import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(`mongodb://root:example@localhost:9093/`);
        console.log(`[MONGOOSE] MongoDB connected, integrated with express on http://localhost:9094`);
    } catch (err) {
        console.log(`[MONGOOSE] FAILED: Connection with MongoDB failed succesfully!`);
        process.exit(1);
    }
}

export default connectDB;