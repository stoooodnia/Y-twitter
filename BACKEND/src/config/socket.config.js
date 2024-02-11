const { getUserById } = require("../models/users.model.js");
const logger = require("./logger.config.js");

const initSockets = (passport, server, session) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "https://0.0.0.0:3000",
      credentials: true,
    },
  });

  const wrapper = (middleware) => (socket, next) => {
    middleware(socket.request, {}, next);
  };
  io.use(wrapper(session));
  io.use(wrapper(passport.initialize()));
  io.use(wrapper(passport.session()));

  io.use((socket, next) => {
    if (socket.request.user) {
      logger.warn("socket authorized");
      next();
    } else {
      logger.warn("socket unauthorized");
      next(new Error("unauthorized"));
    }
  });

  return io;
};

module.exports = initSockets;
