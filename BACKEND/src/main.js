const { app, session } = require("./app.js");
const logger = require("./config/logger.config.js");
const passport = require("passport");

// ssl setup
const fs = require("fs");
const https = require("https");

const PWD = process.env.PWD;
// const server = https.createServer(
//   {
//     key: fs.readFileSync(`${PWD}/src/ssl/key.pem`),
//     cert: fs.readFileSync(`${PWD}/src/ssl/cert.pem`),
//   },
//   app
// );

const http = require("http");
const server = http.createServer(app);
// // socket.io setup
const { getUserById } = require("./models/users.model.js");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
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

const socketMenager = require("./socket/socketMenager.js");
socketMenager(io);

// run server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
