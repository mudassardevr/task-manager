const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/taskmanager";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("connect to mongoBD successfully"))
    .catch((err) => console.log(err));
};


module.exports = connectToMongo