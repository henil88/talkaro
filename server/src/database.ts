import mongoose from "mongoose";

async function connectDB() {
  const DB_URL = process.env.DB_URL;
  if (!DB_URL) throw new Error("DB_URL is not defined!");

  try {
    await mongoose.connect(DB_URL);
    console.log("db connected");
  } catch (err) {
    console.log(`we got some err to connect db ${err}`);
    process.exit(1);
  }
}

export default connectDB;
