const app = require("./app.js");
const logger = require("./config/logger.config.js");

// init database
const initDatabase = require("./config/db.config.js");
initDatabase.configNeo4j();

// run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
