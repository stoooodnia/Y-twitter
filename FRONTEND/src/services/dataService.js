import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  updateUserProfile(data) {
    return apiClient.put(`/user/update-profile`, data);
  },
  getPostsByUserId(userId) {
    return apiClient.get(`/posts/user/${userId}`);
  },
};
