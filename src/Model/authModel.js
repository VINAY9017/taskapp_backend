const mongoose=require("mongoose")
const collection = require("../Config/Collection")
require("../Config/DB")
const { passwordEncoded } = require("../Utils/utils")

const authSchema=new mongoose.Schema({
    user_id:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{
    timestamps:true
})

authSchema.pre("save",function(){
    this.password=passwordEncoded(this.password)
})

const authModel=mongoose.model(collection.account,authSchema)

module.exports=authModel