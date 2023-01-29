import React,{useEffect} from 'react'
import axios from 'axios'


function HomePage() {
  const getUserData = async () => {
    try {

      const res = await axios.post('/api/v1/user/getUserData',{},{
        headers:{
          //makesure You need to put space here so that in backend we split from headers.
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      })
    }catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  },[])
  return (
    <div>HomePage</div>
  )
}

export default HomePage