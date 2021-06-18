import axios from "axios";
const api =  async(obj)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            console.log(obj);
            const response = await axios.post("http://localhost:3001/submit_code_and_test_cases",obj);
            console.log(response);
            resolve(response);
        }
        catch(err){
            reject(err);
        }
    })
}

export default api;