import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://localhost:3000`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  healthCheck() {
    return apiClient.get(`/health-check`);
  },
  updateUserProfile(data) {
    return apiClient.put(`/user/update-profile`, data);
  },
  getPostsByUserId(userId) {
    return apiClient.get(`/posts/user/${userId}`);
  },
  searchProfiles(searchQuery) {
    return apiClient.get(`/user/search/${searchQuery}`);
  },
  follow(data) {
    return apiClient.post(`/user/follow/`, data);
  },
  unfollow(data) {
    return apiClient.post(`/user/unfollow/`, data);
  },
  checkFollow(data) {
    return apiClient.post(`/user/check-follow/`, data);
  },
  getUserById(userId) {
    return apiClient.get(`/user/${userId}`);
  },
  addPost(data) {
    return apiClient.post(`/posts/add`, data);
  },
  fetchPosts(userId, from, to) {
    return apiClient.get(`/posts/fetch/${userId}?from=${from}&to=${to}`);
  },
  addReply(data) {
    return apiClient.post(`/posts/add-reply`, data);
  },
  fetchReplies(postId) {
    return apiClient.get(`/posts/fetch-replies/${postId}`);
  },
  share(data) {
    return apiClient.post(`/posts/share`, data);
  },
  quote(data) {
    return apiClient.post(`/posts/quote`, data);
  },
  getPostById(postId) {
    return apiClient.get(`/posts/${postId}`);
  },
};
