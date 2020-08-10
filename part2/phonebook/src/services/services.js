import axios from 'axios'
const baseUrl = 'https://glacial-badlands-14911.herokuapp.com/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl + '?name=' + newObject.name + '&number=' + newObject.number)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  del: del
}