import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      "authorisation":localStorage.getItem('authorisation'),
      "Access-Control-Allow-Credentials":true,
      "Access-Control-Allow-Origin": "*"
    }
})


class Service{
 post = async(endpoint,data) => {
    let res = await api.post(endpoint,data)
    return res;
 }

 get = async(endpoint) => {
    let res = await api.get(endpoint)
    return res.data;
 }

 patch = async(endpoint,data) => {
    let res = await api.patch(endpoint,data)
    return res.data;
 }

 delete = async(endpoint) => {
    let res = await api.delete(endpoint)
    return res.data;
 }
 put = async(endpoint,data) => {
   let res = await api.put(endpoint,data)
   return res;
}
}

export default Service;