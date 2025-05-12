const express=require("express");
const morgan =require("morgan");
const cors=require("cors");
const bodyParser=require("body-parser")
const colors=require("colors")
const connectDB=require("./config/db");



const dotenv=require("dotenv");
// const { connect } = require("mongoose");
dotenv.config();
//mongo
connectDB();


  const PORT=process.env.PORT 
//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan("dev"))
//listen
app.listen(8000,()=>{
console.log(`server is ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
})