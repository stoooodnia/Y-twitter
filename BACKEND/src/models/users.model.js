"use strict";

const bcrypt = require("bcrypt");
const {
  executeReadTransaction,
  executeWriteTransaction,
} = require("../config/db.config");
const { v4: uuidv4 } = require("uuid");
const MyError = require("../utils/MyError.js");

/**
 * Register a new user in the Neo4j database.
 * @param {Object} userData - User data including username, email, and password.
 * @returns {Object} - The created user.
 * @throws Will throw an error if the user with the provided email or username already exists,
 * or if there is an issue during the registration process.
 */
async function register(userData) {
  try {
    const checkExistingUserQuery = `
        MATCH (user:User)
        WHERE user.email = $email OR user.username = $username
        RETURN user
      `;

    const existingUserParams = {
      email: userData.email,
      username: userData.username,
    };

    const existingUserResult = await executeReadTransaction(
      checkExistingUserQuery,
      existingUserParams
    );

    if (existingUserResult.records.length > 0) {
      throw new MyError(
        "User with the provided email or username already exists",
        409
      );
    }

    const createUserQuery = `
        CREATE (user:User { userId: $userId, username: $username, email: $email, password: $password })
        RETURN user
      `;

    const passwordHash = await bcrypt.hash(userData.password, 10);
    const id = uuidv4();
    const params = {
      userId: id,
      username: userData.username,
      email: userData.email,
      password: passwordHash,
      description: "",
    };

    const result = await executeWriteTransaction(createUserQuery, params);

    // Check if the user was created successfully
    if (result.records.length > 0) {
      const createdUser = result.records[0].get("user").properties;
      return createdUser;
    } else {
      throw new MyError("Failed to create user", 500);
    }
  } catch (error) {
    throw new MyError(
      `Error during user registration: ${error.message}`,
      error.status
    );
  }
}

module.exports = {
  register,
};
