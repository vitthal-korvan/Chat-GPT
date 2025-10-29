const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
      email:{
            Type:String,
            required:true,
            unique:true
      }
      fullName:{
            firstName:{
                  type:String,
                  required:true
            },
            lastName:{
                  type:String,
                  required:true
            }
      },
      password:{
            type:String
      }
},
      {
            timestamps:true
      }
)

const userModel = mongoose.model('user', userSchema)

module.exports = userModel