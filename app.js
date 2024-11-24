const express=require("express")
const cors=require("cors")
const authRoute = require("./src/Route/authRoute")
const taskRoute = require("./src/Route/taskRoute")

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/api/v1",authRoute);
app.use("/api/tasks",taskRoute);

module.exports=app