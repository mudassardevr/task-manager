require("dotenv").config();   /// This is very important for later (JWT, Mongo URI, PORT).
const connectToMongo = require('./config/db');   /// Imports your MongoDB connection function from db
const express = require('express');  // backend framework
const cors = require('cors');   /// allows frontend to talk to backend


const app = express();     ///App instance created
const port =  process.env.PORT || 5000;

connectToMongo();   ///Calls your DB function || DB connects when server starts || correct position


app.use(cors({
  origin: [
    "http://localhost:5173",           // Local Dev 💻
    "https://mudassardevr.github.io"   // Production 🌍
  ]
}));

// // middleware
// app.use(cors({
//     origin: "https://mudassardevr.github.io"
// }));    /// allow requests from frontend

app.use(express.json());    //read JSON body from requests



//test route Thunderclinet   //Simple test endpoint  Confirms server is alive
app.get("/",(req,res)=>{    
    res.send("backend is running")
});


//Availble Routes
app.use('/api/auth',require('./routes/auth'));
app.use("/api/tasks", require("./routes/tasks"));


//start server   Server starts listening
app.listen(port, ()=>{  
    console.log(`http://localhost:${port}`)
})




