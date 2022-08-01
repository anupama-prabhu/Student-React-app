import axios from "axios";

const baseUrl="http://localhost:2020/"

axios.interceptors.request.use(
  (req)=>{
        req.headers.authorization=sessionStorage.token;
        return req;
  },
  ()=>{

  }
)

axios.interceptors.response.use(
  (res)=>{
    return res;
  },
  ()=>{

  }
)

class ServerCall{
   static fnGet(url){
    return axios.get(baseUrl+url)
   }

   static fnPost(url,data){
    return axios.post(baseUrl+url,data)
   }

   static fnPut(url,data){
     return  axios.put(baseUrl+url,data)
   }

   static fnDelete(url,data){
     return axios.delete(baseUrl+url,data)
   }
}

export default ServerCall