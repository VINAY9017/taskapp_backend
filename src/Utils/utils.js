const bcrypt=require("bcrypt")

exports.passwordEncoded=(password)=>{
    const salt=bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}

exports.comparePassword=(oldPass,newPass)=>{
    return bcrypt.compareSync(oldPass,newPass)
}

exports.expireTokenTime=()=>{
    return ({expiresIn:"5d"})
}