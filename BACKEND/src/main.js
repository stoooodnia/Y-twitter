const app = require("./app.js");
const logger = require("./config/logger.config.js");

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

// run server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
