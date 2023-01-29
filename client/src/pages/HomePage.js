import React,{useEffect} from 'react'


function HomePage() {
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/user/getUserData',{},{
        headers:{
          Authorization : "Bearer" + localStorage.getItem('token')
        }
      })
    }catch(error) {
      console.log(error);
    }
  }
  return (
    <div>HomePage</div>
  )
}

export default HomePage