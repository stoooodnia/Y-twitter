const { getUserById } = require("../models/users.model.js");

const initSockets = (passport, server, session) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "https://localhost:5173",
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
      next();
    } else {
      next(new Error("unauthorized"));
    }
  });

  return io;
};

module.exports = initSockets;
