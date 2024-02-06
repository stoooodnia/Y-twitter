const logger = require("../config/logger.config.js");
const {
  getFollowersOfUserByUserId,
  getUserById,
} = require("../models/users.model.js");

const activeSessions = new Map();

const socketRouter = (io) => {
  io.on("connect", (socket) => {
    socket.on("whoami", (cb) => {
      cb(socket.request.user ? socket.request.user.username : "");
    });
    activeSessions.set(socket.request.user.username, socket.id);
    logger.info(`socket connected: ${socket.id}`);

    socket.on("disconnect", () => {
      activeSessions.delete(socket.request.user.username);
      logger.info(`socket disconnected: ${socket.id}`);
    });

    socket.on("post", async (data) => {
      const followers = await getFollowersOfUserByUserId(
        socket.request.user.userId
      );
      // console.log(followers);
      followers.forEach((follower) => {
        const followerSocketId = activeSessions.get(follower.username);
        if (followerSocketId) {
          io.to(followerSocketId).emit("post", {
            username: socket.request.user.username,
            content: data.content,
          });
        }
      });
    });

    socket.on("follow", async (data) => {
      const follower = await getUserById(data.followerId);
      const followed = await getUserById(data.followingId);
      const followedSocketId = activeSessions.get(followed.username);
      if (followedSocketId) {
        io.to(followedSocketId).emit("follow", {
          follower: follower,
          followed: followed,
          createdAt: data.createdAt,
        });
      }
    });
  });
};

module.exports = socketRouter;
