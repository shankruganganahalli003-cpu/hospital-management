import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { data, useLocation, useNavigate } from 'react-router-dom'; 
import { logout } from '../redux/authSlice';

const Navbar = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {user} = useSelector((state)=>state.auth)

    if(location.pathname==="/login" || location.pathname==="/register") return null;

    const handleLogout = async ()=>{
            dispatch(logout());
            toast.success("user Logged Out");
           console.log(user)
            navigate("/login");
        };
    


  return (
    <>
    
    
          {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign Up
        </button>
      )}
    
    </>
  );
}

export default Navbar;
