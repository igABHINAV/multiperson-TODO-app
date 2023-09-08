const express = require("express");
const cors = require("cors");
const app = express();
const { authenticateToken } = require("./middlewares/Auth");

if(process.env.NODE_ENV!=='production')
require("dotenv").config({path:"./config/config.env"});


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());


//importing routes 
const user = require("./routes/User_route");
const task = require("./routes/Task_router");


//using routes
app.use("/user" , user);
app.use("" ,authenticateToken , task);


module.exports = app ;




