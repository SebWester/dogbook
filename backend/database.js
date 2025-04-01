import mongoose from "mongoose";

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/dogbook");
    console.log("Connected to database");
  } catch (err) {
    console.log("Could not connect to database:", err);
  }
};

export default mongoDB;
