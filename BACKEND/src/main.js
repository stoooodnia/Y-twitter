const app = require("./app.js");
const logger = require("./config/logger.config.js");

// run server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
