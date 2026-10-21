const mongoose = require('mongoose');

const connnectDB = async() =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);

        console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    process.exit(1);
    }
}

module.exports = connnectDB;