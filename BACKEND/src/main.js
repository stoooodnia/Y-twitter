const { server } = require("./app.js");
const logger = require("./config/logger.config.js");

// run server
const PORT = process.env.PORT;
server.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server running on port ${PORT}`);
});
