import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  appointmentId: null,
  doctorId: null,
  token:null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
      
    },
    setAppointmentId: (state, action) => {
      state.appointmentId = action.payload;
    },

    setDoctorId:(state,action)=>{
      state.doctorId = action.payload.doctorId || null;
    },


   logout: (state) => {
  state.user = null;
  state.token = null;
  state.doctorId=null;
  state.appointmentId=null;
},
  },
});

export const { setCredentials, setAppointmentId,setDoctorId, logout } = authSlice.actions;
export default authSlice.reducer;