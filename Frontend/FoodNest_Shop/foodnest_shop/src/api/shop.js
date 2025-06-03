import axiosShop from "./axiosShop";

const shopApi = {
  create: (payload) => axiosShop.post("/gianhang", payload),
};

export default shopApi;
