import axios from "axios";


// define commonRequest function


export const CommonApi=async(method,url,data,header)=>{

// api request configuration


    let config={
        method,
        url,
        data,
        headers:header?header:{"content-type": "application/json"}
    }



  // api calling using axios


 return await axios(config).then((data)=>{
    return data
  }).catch((err)=>{
    return err
  })

}