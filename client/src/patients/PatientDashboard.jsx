import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const PatientDashboard = () => {


    const navigate = useNavigate();
    const [doctor, setdoctor] = useState([]);

    const fetchDoctors = async () => {
        const {data} = await api.get("/doctor/getall");

        console.log(data);
        



    }



    useEffect(()=>{
        fetchDoctors();
    },[])








  return (
   <>
   
   
   
   
   

   
   
   
   
   </>
  );
}

export default PatientDashboard;
