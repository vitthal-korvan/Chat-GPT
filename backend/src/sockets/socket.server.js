const { Server } = require("socket.io")
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
// const aiService = require("../services/ai.service");
// const messageModel = require("../models/message.model");
// const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {

    const io = new Server(httpServer, {})

    io.use(async (socket, next) => {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

      // console.log("Socket Connection Created!!!!");
      

      if (!cookies.token) {
        next(new Error("Authentication error: No token provided"));
      }

      try {
        const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        socket.user = user;

        next();
      } catch (err) {
        next(new Error("Authentication error: Invalid token"));
      }
    });   

    io.on('connection', (socket)=>{
      console.table(socket.user);
      
      console.log("New socket connection", socket.id);
      
    })
}

module.exports = initSocketServer;