import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  console.log("get");
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

export default {
  getAll: getAll,
  create: create,
};
