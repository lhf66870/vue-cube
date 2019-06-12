import axios from "axios";
import { userInfo } from "os";

export default {
  login(user) {
    return axios.get("/api/login", { params: user }).then(({ data }) => data);
  },
  userInfo() {
    return axios.get("/api/userinfo").then(({ data }) => data);
  }
};
