const mongoose = require("mongoose");

const connectDB = async () => {
  let url = `mongodb+srv://microfocusinc:incfocusmicro@access-key-manager.bbxzh.mongodb.net/?retryWrites=true&w=majority`;

  try {
    const connector = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${connector.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
