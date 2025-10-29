const mongoose = require('mongoose')

async function connectDB(){
      try {
           await mongoose.connect(process.env.MONGODB_URI);
           console.log("Connected To MongoDB");
            
      } catch (error) {
            console.error('Error Connecting MongoDB: ', error);
      }
      
}

module.exports = connectDB