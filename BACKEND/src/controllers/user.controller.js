const logger = require("../config/logger.config.js");
const {
  executeWriteTransaction,
  executeReadTransaction,
} = require("../config/db.config.js");

// change description of user

const changeDescription = async (req, res) => {
  logger.info("Trying to change description");
  try {
    const { userId, newDescription } = req.body;

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      logger.error("Couldn't find user");
      return res.status(404).send({ error: "Couldn't find user" });
    }

    const updateDescriptionQuery =
      "MATCH (user:User {userId: $userId}) SET user.description = $newDescription RETURN user";
    const updateResult = await executeWriteTransaction(updateDescriptionQuery, {
      userId,
      newDescription,
    });

    const updatedUser = updateResult.records[0].get("user").properties;

    logger.info("Updated user description");
    return res.status(200).json({ success: true });
  } catch (error) {
    logger.error(
      `Error while trying to change description of user: ${error.message}`
    );
    return res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  changeDescription,
};
