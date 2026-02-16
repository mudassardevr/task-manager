const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/taskmanager";

const connectToMongo = async() => {

  try {
    await mongoose.connect(process.env.MONGO_URI);
    
  } catch (error) {
    console.log("MongoDB connection Failed" , error);
    process.exit(1);
  }

};


module.exports = connectToMongo