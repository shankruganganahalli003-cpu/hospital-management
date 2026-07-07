import React from 'react';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const PatientCreate = () => {

    const navigate = useNavigate();
    const [form, setform] = useState({
        name:"", age:"", gender:"", phone:"", address:"", bloodGroup:""
    });

    const handleChange = (e)=>{
        setform({...form,[e.target.name]:e.target.value});
    }

    const handleSubmit = async (e)=>{
        try {
            
            const {data} = await api.post("/patient/create",form);

            if(data.success){
                console.log(data);
                toast.success(data.message);
            }


        } catch (err) {
            console.log(err.message);
        }
    }

  return (
 <>
 
    
 
 
 
 
 
 
 
 
 </>
  );
}

export default PatientCreate;
