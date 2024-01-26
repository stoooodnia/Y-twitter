const logger = require("../config/logger.config.js");
const userSockets = new Map();

const socketManager = (io) => {
  io.on("connect", (socket) => {
    // const session = socket.request.session;
    // logger.info("User connected", socket.id, session.passport.user);
    // session.socketId = socket.id;
    // session.save();
    logger.fatal("User connected:", socket);
    if (socket.user && socket.user.id) {
      userSockets.set(socket.user.id.toString(), socket);
    }

    socket.on("disconnect", () => {
      userSockets.delete(socket.user.id.toString());
      logger.fatal("User disconnected", socket.id, socket.user.username);
    });
  });
};

module.exports = socketManager;
