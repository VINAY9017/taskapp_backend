const server=require("./app")
require("dotenv").config()

const Host=process.env.HOST;
const Port=process.env.Port

server.listen(Port,function(){
    console.log(`Server Started at PORT http://${Host}:${Port}`);
})