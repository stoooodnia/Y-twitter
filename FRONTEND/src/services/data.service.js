import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  login(data) {
    return apiClient.post("/login", data);
  },
  getPerson(id) {
    return apiClient.get("/persons/" + id);
  },
  addPerson(person) {
    return apiClient.post("/persons/", person);
  },
  editPerson(id, person) {
    return apiClient.put("/persons/" + id, person);
  },
};
