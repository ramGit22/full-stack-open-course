import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  console.log("get");
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  deletePerson: deletePerson,
};
