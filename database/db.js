import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async() => {
  const DB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-u310ugl-shard-00-00.ha9vbk4.mongodb.net:27017,ac-u310ugl-shard-00-01.ha9vbk4.mongodb.net:27017,ac-u310ugl-shard-00-02.ha9vbk4.mongodb.net:27017/?ssl=true&replicaSet=atlas-4k9ytq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=bulkemail`;
  try {
    let timeout = 25;
		while (mongoose.connection.readyState === 0) {
      if (timeout === 0) {
        console.log("timeout");
        throw new Error("timeout occured with mongoose connection");
      }
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      timeout--;
    }
    mongoose.set("strictQuery", false);
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error.message);
  }
};

export default Connection;
