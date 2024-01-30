// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const logger = require("./config/logger.config.js");
const pinoHttp = require("pino-http");
// app.use(pinoHttp({ logger, prettyPrint: true })); // HTTP request logger

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: "https://localhost:5173" }));

// security headers
const helmet = require("helmet");
// app.use(helmet()); // when helmet on photos not load (CSP)

// req, res parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookie parser
// app.use(require("cookie-parser")()); // NOT REQUIRED SINCE VERSION 1.5.0, MAY RESULT IN ERRORS

// express flash
app.use(require("express-flash")());

// init database
const initDatabase = require("./config/db.config.js");
initDatabase.configNeo4j();

// session storage setup
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const memoryStore = new MemoryStore({ checkPeriod: 60 * 1000 }); // 1 minute
const secret = process.env.SECRET_KEY || "super secret key";

const session = expressSession({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10,
  },
  store: memoryStore,
});
app.use(session);

// passport authentication
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// routes
const isAuthenticated = require("./middlewares/isAuthenticated.middleware.js");

app.get("/health-check", require("./controllers/healthCheck.controller.js"));
app.use("/auth", require("./routes/auth.route.js"));
app.use("/user", isAuthenticated, require("./routes/user.route.js"));
app.use("/posts", isAuthenticated, require("./routes/posts.route.js"));

// vue app
// const path = __dirname + "/../../FRONTEND/dist/";
// app.use(express.static(path));
// app.get("/", function (_req, res) {
//   res.sendFile(path + "index.html");
// });
// const history = require("connect-history-api-fallback");
// app.use(
//   history({
//     verbose: true,
//   })
// );
// app.use(express.static(path));

// ssl setup
const fs = require("fs");
const https = require("https");

const PWD = process.env.PWD;
const server = https.createServer(
  {
    key: fs.readFileSync(`${PWD}/src/ssl/key.pem`), // __dirname
    cert: fs.readFileSync(`${PWD}/src/ssl/cert.pem`),
  },
  app
);

// socket.io setup
const { getUserById } = require("./models/users.model.js");
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

const socketMenager = require("./socket/socketMenager.js");
socketMenager(io);

// app exports
module.exports = { server, session };
