import axios from "axios";
import { appConfig } from "./config";

const createAxios = () => {
  const params = {
    baseURL: appConfig.apiURL,
  };
  return axios.create(params);
};
export const fetchProducts = async (query = "") => {
  const { data } = await createAxios().get(`/api/products?populate=*${query}`);
  return data;
};

export const fetchCategory = async (query = "") => {
  const { data } = await createAxios().get(`/api/categories?${query}`);
  return data;
};

export const createOrder = async (order) => {
  const { data } = await createAxios().post("/api/orders?populate=*", order, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

export const getOrder = async (id) => {
  const { data } = await createAxios().get(`/api/orders/`);
  console.log(getOrder);
  return data;
};

export const createAdmin = async (admin) => {
  const { data } = await createAxios().post("/api/admins", admin, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const getAdmin = async (admin) => {
  const { data } = await createAxios().get("/api/admins", admin, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};