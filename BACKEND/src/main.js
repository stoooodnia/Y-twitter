const { app, session } = require("./app.js");
const logger = require("./config/logger.config.js");
const passport = require("passport");

// ssl setup
const fs = require("fs");
const https = require("https");

const PWD = process.env.PWD;
const server = https.createServer(
  {
    key: fs.readFileSync(`${PWD}/src/ssl/key.pem`),
    cert: fs.readFileSync(`${PWD}/src/ssl/cert.pem`),
  },
  app
);

// socket.io setup
const { Server } = require("socket.io");
const { getUserById } = require("./models/users.model.js");
const io = new Server(server, {
  cors: {
    origin: "https://localhost:5173",
    credentials: true,
  },
});

const wrapper = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrapper(session));
io.use(wrapper(passport.initialize()));
io.use(wrapper(passport.session()));

io.use(async (socket, next) => {
  logger.warn("ssss", socket.request);
  const session = socket.request.session;
  if (session && session.passport && session.passport.user) {
    const userId = session.passport.user;
    const user = await getUserById(userId);
    if (user) {
      socket.user = user;
      next();
    } else {
      next(new Error("User not found"));
    }
  } else {
    next(new Error("Unauthorized"));
  }
});

const socketMenager = require("./socket/socketMenager.js");
socketMenager(io);

// run server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
