import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  changeDescription(userId, description) {
    return apiClient.patch(`/user/change-description`, {
      userId: userId,
      newDescription: description,
    });
  },
  getPostsByUserId(userId) {
    return apiClient.get(`/posts/user/${userId}`);
  },
};
