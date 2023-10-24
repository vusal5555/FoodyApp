import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("db connetced");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
