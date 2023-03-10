import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout'
import { hideLoading,showLoading } from '../redux/features/alertSlice';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import DoctorList from '../components/DoctorList';
import {Row,message} from 'antd'

const HomePage = ({cookies ,removeCookies}) => {

  const [doctors,setallDoctors] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    const {token} = cookies;
    //console.log("here");
    const getDoctorData = async () => {
      try{
        //dispatch(showLoading());
        const res = await axios.get('/api/v1/user/getAllDoctor',
          {
            headers: {
              authorization : 'Bearer ' + token
            }
          }
        );
        console.log(res.data);
         dispatch(hideLoading());
        if(res.data.success) {
          message.success(res.data.message);
          console.log(res.data.doctorList);
          setallDoctors(res.data.doctorList);
          console.log(doctors);
        }else{
          message.error(res.data.message);
        }
      }catch(error) {
        console.log(error);
         dispatch(hideLoading());
        message.error('some thing went wrong ');
      }
    }
      getDoctorData();
      console.log(doctors);
      //eslint-disable-next-line

  },[cookies])

  return (
    <Layout removeCookies={removeCookies}>
    <>
      <h1 className='text-center'>Home page</h1>
       <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </>
 
    </Layout>
  )
}

export default HomePage