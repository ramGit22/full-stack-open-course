import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

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

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  deletePerson: deletePerson,
  update: update,
};
