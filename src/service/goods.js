import axios from "axios";

export default {
  getGoods() {
    return axios.get("/api/goods").then(res => {
      const { code, data: goodsInfo, slide, keys } = res.data;
      if (code) {
        return { goodsInfo, slide, keys };
      } else {
        return null;
      }
    });
  }
};
