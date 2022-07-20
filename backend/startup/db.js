const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connector = await mongoose.connect(
      "mongodb+srv://microfocusinc:incfocusmicro@access-key-manager.bbxzh.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(`MongoDB Connected: ${connector.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
