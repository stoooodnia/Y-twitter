const logger = require("../config/logger.config.js");
const userSockets = new Map();

const socketManager = (io) => {
  io.on("connect", (socket) => {
    logger.info("User connected");

    socket.on("disconnect", () => {
      logger.info("User disconnected");
    });

    socket.on("post", (data) => {
      io.emit("post", data);
    });
  });
};

module.exports = socketManager;
