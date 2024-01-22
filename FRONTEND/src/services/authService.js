import axios from "axios";

const authClient = axios.create({
  baseURL: `http://localhost:3000/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  login(data) {
    return authClient.post("/login", data);
  },
  register(data) {
    return authClient.post("/register", data);
  },
  logout() {
    return authClient.post("/logout");
  },
  isAuthenticated() {
    return authClient.get("/is-auth");
  },
};
