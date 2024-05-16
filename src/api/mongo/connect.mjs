import mongoose from "mongoose";

let connection = null;
const uri = process.env.MONGODB_CONNECTION_STRING; //eslint-disable-line

const connect = async () => {
  if (!connection) {
    console.log("Connecting to mongodb...");
    connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to mongodb!");
  } else {
    console.log("Already connected to mongodb");
  }
  return connection;
};

export default connect;
