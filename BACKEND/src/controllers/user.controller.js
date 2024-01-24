const logger = require("../config/logger.config.js");
const {
  executeWriteTransaction,
  executeReadTransaction,
} = require("../config/db.config.js");

// change description of user

const changeProfile = async (req, res) => {
  logger.info("Trying to change description");
  try {
    const { userId, newDescription, newProfilePicture, newBgPicture } =
      req.body;

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      logger.error("Couldn't find user");
      return res.status(404).send({ error: "Couldn't find user" });
    }

    const updateProfileQuery = `
      MATCH (user:User {userId: $userId})
      SET user.description = $newDescription,
          user.profilePicture = $newProfilePicture,
          user.bgPicture = $newBgPicture
      RETURN user
    `;

    const updateResult = await executeWriteTransaction(updateProfileQuery, {
      userId,
      newDescription,
      newProfilePicture,
      newBgPicture,
    });

    const updatedUser = updateResult.records[0].get("user").properties;

    logger.info("Updated user profile data");
    return res.status(200).send({ success: true, user: updatedUser });
  } catch (error) {
    logger.error(
      `Error while trying to change profile data of user: ${error.message}`
    );
    return res.status(500).send({ error: "Internal server error" });
  }
};

const followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    // Sprawdź, czy oba użytkownicy istnieją w ramach transakcji do odczytu
    const usersExistQuery =
      "MATCH (follower:User {userId: $followerId}), (following:User {userId: $followingId}) RETURN follower, following";
    const usersExistResult = await executeReadTransaction(usersExistQuery, {
      followerId,
      followingId,
    });

    if (!usersExistResult.records[0]) {
      logger.error("One of the users doesnt exist");
      return res.status(404).send({ error: "One of the users doesnt exist" });
    }

    const relationshipExistsQuery =
      "MATCH (follower:User {userId: $followerId})-[r:IS_FOLLOWING]->(following:User {userId: $followingId}) RETURN r";
    const relationshipExistsResult = await executeReadTransaction(
      relationshipExistsQuery,
      { followerId, followingId }
    );

    if (relationshipExistsResult.records[0]) {
      return res.status(400).send({ error: "Relationship already exists." });
    }

    const createRelationshipQuery =
      "MATCH (follower:User {userId: $followerId}), (following:User {userId: $followingId}) CREATE (follower)-[:IS_FOLLOWING]->(following) RETURN follower, following";
    const createRelationshipResult = await executeWriteTransaction(
      createRelationshipQuery,
      { followerId, followingId }
    );

    const follower =
      createRelationshipResult.records[0].get("follower").properties;
    const following =
      createRelationshipResult.records[0].get("following").properties;

    logger.info("Created relationship IS_FOLLOWING.");
    return res.status(200).send({ success: true, follower, following });
  } catch (error) {
    logger.error(`Couldnt execute "followUser": ${error.message}`);
    return res.status(500).send({ error: "Internal server error." });
  }
};

const searchProfiles = async (req, res) => {
  try {
    const { searchQuery } = req.params;

    const searchQueryRegex = `(?i).*${searchQuery}.*`;

    let searchProfilesQuery;
    if (searchQuery === "undefined") {
      searchProfilesQuery = `
      MATCH (user:User)
      RETURN user
      LIMIT 4
    `;
    } else {
      searchProfilesQuery = `
      MATCH (user:User)
      WHERE user.username =~ $searchQueryRegex
      RETURN user
      LIMIT 4
    `;
    }

    const searchProfilesResult = await executeReadTransaction(
      searchProfilesQuery,
      { searchQueryRegex }
    );

    const profiles = searchProfilesResult.records.map(
      (record) => record.get("user").properties
    );

    logger.info("Found profiles.");
    return res.status(200).send({ success: true, profiles });
  } catch (error) {
    logger.error(`Couldnt execute "searchProfiles": ${error.message}`);
    return res.status(500).send({ error: "Internal server error." });
  }
};

module.exports = {
  changeProfile,
  followUser,
  searchProfiles,
};
